// Usage: node tests/chart-sets.js /absolute/path/to/index.html
// The charts are the original PokerCoaching charts; players make named sets (fish table, shark table...) that persist per browser.
const {chromium}=require('playwright'); const http=require('http'),fs=require('fs');
(async()=>{const html=fs.readFileSync(process.argv[2]);const srv=http.createServer((q,r)=>{r.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});r.end(html)});await new Promise(r=>srv.listen(0,'127.0.0.1',r));
const URL='http://127.0.0.1:'+srv.address().port+'/';
const b=await chromium.launch();const res=[];const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m);const errs=[];
const open=async(seed)=>{ const ctx=await b.newContext({viewport:{width:390,height:800}}); const p=await ctx.newPage(); p.on('pageerror',e=>errs.push(e.message));
  if(seed) await p.addInitScript(seed); await p.goto(URL); await p.waitForTimeout(400); return {ctx,p}; };
const cell=(p,h)=>p.locator(`#editGrid .c:text-is("${h}")`);
const code=async(p,h)=>(await cell(p,h).getAttribute('class')).split(' ').find(c=>'RBGFDX'.includes(c)&&c.length===1);

// ---------- 1. original charts, even if an older version saved the no-ante / live-read settings
let {ctx,p}=await open(()=>{ if(!localStorage.getItem('dp3:profiles')){ localStorage.setItem('dp3:profiles',JSON.stringify([{id:'p1',name:'Player 1',pin:null,created:1}])); localStorage.setItem('dp3:current','"p1"');
  localStorage.setItem('dp3:p1:settings',JSON.stringify({baseline:'noante',live:true,nobluff3:true,sit:{},pos:[]}));
  localStorage.setItem('dp3:p1:custom',JSON.stringify({'RFI:BTN':'R'.repeat(169)})); } });
ok(await p.evaluate(()=>__dp.sets.isOriginal()),'starts on the Original set');
ok(await p.evaluate(()=>{ const bad=[]; for(const k of __dp.CHART_KEYS){ if(__dp.chart(k)!==__dp.base()[k]) bad.push(k); } return bad.length===0; }),'Original: every chart is exactly the baseline');
const orig=await p.evaluate(()=>({utg:__dp.base()['RFI:UTG'],vs:__dp.base()['VS:CO vs UTG+2']}));
ok(orig.utg.startsWith('RRRRRRFFFRFFFRRRRRFFFFFFFFRFRRR')&&!/[^RBGFDX]/.test(orig.utg),'RFI:UTG is the PDF chart');
ok(await p.evaluate(()=>{ for(let i=0;i<80;i++){ const sc=__dp.newSc(['raise','vs3bet','sblimp','rfi'][i%4],['CO','HJ','SB','BTN'][i%4]); if(!sc) continue; if(__dp.eff(sc)!==__dp.base()[sc.key]) return false; } return true; }),'grading ignores the old no-ante / live-read / skip-bluff settings');
ok(await p.evaluate(()=>__dp.base()['VS:CO vs UTG+2'].includes('B')),'3-bet bluffs from the PDF are still in the original');
ok(await p.evaluate(()=>!document.getElementById('opt-live')&&!document.getElementById('opt-noante')&&!document.getElementById('opt-nobluff3')),'no ante / live-read / bluff options on the settings screen');
ok((await p.evaluate(()=>__dp.sets.list().map(s=>s.name))).join()==='My edits (imported)','old single-chart edits were kept as their own set');
ok(await p.evaluate(()=>__dp.sets.isOriginal()),'and the Original is still the active set');
await ctx.close();

// ---------- 2. sets: create, edit, switch, persist
({ctx,p}=await open());
await p.click('#tab-ranges'); await p.waitForTimeout(150);
ok(await p.evaluate(()=>document.getElementById('view-ranges').classList.contains('locked')),'Original is locked in the editor');
await p.click('#edGroups [data-g="RFI"]'); await p.click('#edHeroes [data-h="UTG"]');
const before=await code(p,'72o'); await cell(p,'72o').click({force:true}); ok((await code(p,'72o'))===before,'tapping a hand on the Original changes nothing');
await p.click('#setNewBtn'); await p.fill('#newSetName','Fish table'); await p.click('#newSetGo'); await p.waitForTimeout(200);
ok(await p.evaluate(()=>__dp.sets.list().length===1&&__dp.sets.list()[0].name==='Fish table'&&!__dp.sets.isOriginal()),'created "Fish table" and made it active');
ok(!(await p.evaluate(()=>document.getElementById('view-ranges').classList.contains('locked'))),'editor unlocks for your own set');
await p.click('#edGroups [data-g="RFI"]'); await p.click('#edHeroes [data-h="UTG"]');
await p.keyboard.press('1'); await cell(p,'72o').click(); ok((await code(p,'72o'))==='R','Fish table: 72o painted as a raise from UTG');
ok(await p.evaluate(()=>{ const s=__dp.sets.list()[0]; return !s.edits['RFI:UTG']; }),'before Save the edit is only a draft');
await p.click('#edSave');
ok(await p.evaluate(()=>{ const s=__dp.sets.list()[0]; return !!s.edits['RFI:UTG']; }),'the edit is stored in that set');
ok(await p.evaluate(()=>__dp.base()['RFI:UTG'][__dp.idxOf('72o')]==='F'),'the original is untouched');
// grading follows the active set
ok(await p.evaluate(()=>{ const sc=__dp.newSc('rfi','UTG'); return __dp.eff(sc)[__dp.idxOf('72o')]==='R'; }),'grading uses the Fish table chart');
// second set, tighter
await p.click('#setNewBtn'); await p.fill('#newSetName','Shark table'); await p.selectOption('#newSetFrom','original'); await p.click('#newSetGo'); await p.waitForTimeout(200);
await p.click('#edGroups [data-g="RFI"]'); await p.click('#edHeroes [data-h="UTG"]');
ok((await code(p,'72o'))==='F','Shark table starts from the Original, not from Fish table');
await p.keyboard.press('4'); await cell(p,'AQs').click(); ok(['F','D'].includes(await code(p,'AQs')),'Shark table: AQs folded from UTG');
await p.click('#edSave');
// switch back and forth with the pills
await p.click('#setPills [data-set]:nth-child(2)'); await p.waitForTimeout(150);
ok((await code(p,'72o'))==='R'&&(await code(p,'AQs'))==='R','switching to Fish table shows its chart (72o raise, AQs untouched)');
// Play quick switch
await p.click('#tab-play'); await p.selectOption('#playSet',{label:'Shark table'}); await p.waitForTimeout(200);
ok(await p.evaluate(()=>{ const sc=__dp.newSc('rfi','UTG'); return ['F','D'].includes(__dp.eff(sc)[__dp.idxOf('AQs')]); }),'the Play tab switch changes what is graded');
// persist
await p.reload(); await p.waitForTimeout(400);
ok(await p.evaluate(()=>__dp.sets.list().map(s=>s.name).join()==='Fish table,Shark table'),'both sets survive a reload');
ok(await p.evaluate(()=>__dp.sets.list().find(s=>s.id===__dp.sets.active()).name==='Shark table'),'the active set survives a reload');
// snapshot + save event (the seam for cloud sync)
const ev=await p.evaluate(()=>new Promise(r=>{ window.addEventListener('fishing:saved',e=>r(e.detail),{once:true}); __dp.sets.rename(__dp.sets.list()[0].id,'Fish table'); }));
ok(ev==='sets','a "fishing:saved" event fires when sets change: '+ev);
const snap=await p.evaluate(()=>__dp.sets.snapshot());
ok(snap.v===4&&Array.isArray(snap.sets)&&snap.activeSet&&snap.stats&&snap.settings,'one snapshot holds sets, active set, stats and settings');
// rename / duplicate / delete
await p.click('#tab-ranges'); await p.click('#setRenameBtn'); await p.fill('#newSetName','Shark table 2'); await p.click('#newSetGo');
ok(await p.evaluate(()=>__dp.sets.list().some(s=>s.name==='Shark table 2')),'rename works');
await p.click('#setNewBtn'); await p.fill('#newSetName','fish TABLE'); await p.click('#newSetGo'); await p.waitForTimeout(150);
ok(await p.evaluate(()=>__dp.sets.list().some(s=>s.name==='fish TABLE 2')),'duplicate names get a number');
await p.click('#setDupBtn'); await p.click('#newSetGo'); await p.waitForTimeout(150);
ok(await p.evaluate(()=>__dp.sets.list().length===4),'duplicate makes a copy');
await p.click('#setDelBtn'); await p.click('#setDelBtn'); await p.waitForTimeout(200);
ok(await p.evaluate(()=>__dp.sets.list().length===3&&__dp.sets.isOriginal()),'delete removes the set and returns to the Original');
// backup text round trip
await p.click('#exportBtn'); const txt=await p.inputValue('#io'); ok(JSON.parse(txt).sets.length===3,'backup text holds every set');
await p.fill('#io',txt); await p.click('#importBtn'); await p.waitForTimeout(200);
ok(await p.evaluate(()=>__dp.sets.list().length===6),'loading a backup adds its sets (never overwrites)');
// the other half of the sync seam: apply a snapshot (what a signed-in cloud document would hold) on a fresh browser
const snap2=await p.evaluate(()=>JSON.parse(JSON.stringify(__dp.sets.snapshot())));
await ctx.close();
({ctx,p}=await open());
ok(await p.evaluate(()=>__dp.sets.list().length===0&&__dp.sets.isOriginal()),'a fresh browser starts with only the Original');
await p.evaluate(s=>__dp.sets.apply(s),snap2); await p.waitForTimeout(200);
ok(await p.evaluate(n=>__dp.sets.list().length===n,snap2.sets.length)&&await p.evaluate(a=>__dp.sets.active()===a,snap2.activeSet),'applying a snapshot restores every set and the active set');
await p.reload(); await p.waitForTimeout(300);
ok(await p.evaluate(n=>__dp.sets.list().length===n,snap2.sets.length),'and it is saved on this device');
await ctx.close();

console.log(res.join('\n'));console.log('ERRORS',errs.length?errs:'none');await b.close();srv.close();process.exit(res.some(r=>r.startsWith('FAIL'))||errs.length?1:0);})();
