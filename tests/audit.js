const {chromium}=require('playwright');
const FILE='file://'+process.argv[2];
(async()=>{
 const b=await chromium.launch(); const errs=[];
 const ctx=await b.newContext(); const p=await ctx.newPage(); p.on('pageerror',e=>errs.push('pageerror '+e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push('console '+m.text()); });
 await p.goto(FILE); await p.waitForTimeout(400);

 // ---------- A + B: every chart, hand, choice and variant ----------
 const A=await p.evaluate(()=>{
  const D=window.__dp, out={mono:{},issues:[],counts:{}};
  for(const [base,live] of [['pdf',false],['noante',false],['noante',true]]){
   D.setBaseline(base); D.setLive(live); const tag=base+(live?'+live':''); out.mono[tag]=[]; const B=D.BASES[base];
   for(const k of D.CHART_KEYS){
    const g=B[k], fold=(k.startsWith('3B:')||k.startsWith('SBL:'))?'D':'F';
    if(k!=='LIMP:BB') for(let i=0;i<169;i++){ const c=g[i]; if(c!=='R'&&c!=='G') continue; for(const d of D.betterThan(D.ALL_HANDS[i])) if(g[D.idxOf(d)]===fold) out.mono[tag].push(`${k}: ${D.ALL_HANDS[i]}=${c} but ${d} folds`); }
    const vill=(k.startsWith('VS:')||k.startsWith('3B:')||k.startsWith('SQZ:'))?k.split(' vs ')[1].split('/'):[null];
    const variants=k.startsWith('VS:')?[15,25]:k.startsWith('3B:')?[35,45,60]:k.startsWith('SQZ:')?[1,2]:[undefined];
    for(const v of vill) for(const va of variants) for(let i=0;i<169;i++){
     if(g[i]==='X') continue; const h=D.ALL_HANDS[i]; const sc=D.makeSc(k,h,v,va); if(!sc) continue;
     const o=D.options(sc); const choices=[]; if(o.fold) choices.push({k:'F'}); if(o.call) choices.push({k:'G'}); o.sizes.forEach(s=>choices.push({k:'R',size:s}));
     const goods=o.sizes.filter(s=>s.good).length; if(o.sizes.length&&goods!==(sc.type==='rfi'?2:1)) out.issues.push(`${tag} ${k} ${h}: ${goods} good sizes`);
     for(const ch of choices){
      const ex=D.explain(sc,ch); const txt=ex.paras.map(x=>x.html).join(' '); const tags=ex.paras.map(x=>x.tag);
      out.counts[tag]=(out.counts[tag]||0)+1; const bad=[];
      if(/undefined|NaN|null|\[object/.test(txt)) bad.push('bad token');
      (txt.match(/dominated by ([^.]*)/g)||[]).forEach(s0=>s0.replace('dominated by ','').replace(/ and more/,'').split(/, | and /).forEach(x=>{ if(x.trim().replace(/[so]$/,'')===h.replace(/[so]$/,'')) bad.push('self-domination'); }));
      if(ex.want==='R'&&!ex.goodSize) bad.push('no good size');
      if(ex.want==='F'&&!o.fold) bad.push('answer is fold but no fold button');
      if(ex.want==='G'&&!o.call) bad.push('answer is call but no call button');
      if(ex.want==='R'&&!o.sizes.length) bad.push('answer is raise but no raise button');
      if(ex.actionOk===tags.includes('The leak')) bad.push('leak/verdict mismatch');
      const why=ex.paras[0].html;
      const said=/<strong>(fold|check)<\/strong>/.test(why)?'F':/<strong>(call|limp|overlimp|complete|overcall)<\/strong>/.test(why)?'G':/<strong>[^<]*(3-bet|4-bet|raise|isolation|squeeze|jam)[^<]*<\/strong>/i.test(why)?'R':'?';
      const wn=(k==='LIMP:BB'&&ex.want==='G')?'F':ex.want;
      if(said!=='?'&&said!==wn&&!(k.startsWith('RFI:')&&k!=='RFI:SB')) bad.push(`why says ${said}, answer ${ex.want}`);
      if(bad.length) out.issues.push(`${tag} ${k}${v?' ('+v+')':''}${va!==undefined?' ['+va+']':''} ${h} ${ch.k}: ${bad.join('; ')}`);
     }
    }
   }
  }
  D.setBaseline('noante'); D.setLive(true); return out; });
 console.log('A. explanations generated:',JSON.stringify(A.counts));
 for(const t in A.mono) console.log(`B. range holes ${t}: ${A.mono[t].length}`, A.mono[t].slice(0,5).join(' | '));
 const uniq=[...new Set(A.issues.map(x=>x.replace(/ [FGR]: /,': ')))];
 console.log(`A. text/logic issues: ${A.issues.length} (unique ${uniq.length})`); uniq.slice(0,25).forEach(x=>console.log('   '+x));

 // ---------- C: custom ranges are always graded correct ----------
 const C=await p.evaluate(()=>{
  const D=window.__dp, fails=[]; let n=0; D.setBaseline('noante'); D.setLive(true);
  const rnd=a=>a[Math.floor(Math.random()*a.length)];
  for(const k of D.CHART_KEYS){
   const L=D.legendFor(k); const codes=Object.keys(L).filter(c=>c!=='X');
   const vill=(k.startsWith('VS:')||k.startsWith('3B:')||k.startsWith('SQZ:'))?k.split(' vs ')[1].split('/'):[null];
   const variants=k.startsWith('VS:')?[25]:k.startsWith('3B:')?[60,45]:k.startsWith('SQZ:')?[1]:[undefined];
   for(let t=0;t<8;t++){ const h=rnd(D.ALL_HANDS); if(D.base()[k][D.idxOf(h)]==='X') continue;
    for(const code of codes){
     if(code===D.base()[k][D.idxOf(h)]) continue;   // painting a cell with the value it already has is not an edit
     D.clearCustom(); D.setCustomCell(k,h,code);
     for(const v of vill) for(const va of variants){ const sc=D.makeSc(k,h,v,va); if(!sc) continue; n++;
      const want=(code==='R'||code==='B')?'R':code==='G'?'G':(k==='LIMP:BB'?'G':'F');
      const w=D.wantOf(sc); if(w.want!==want) fails.push(`${k} ${h} set ${code}: graded ${w.want} expected ${want}`);
      const o=D.options(sc); const ch= want==='R'?{k:'R',size:o.sizes.find(s=>s.good)}:{k:want};
      if(want==='F'&&!o.fold) { if(k!=='LIMP:BB') fails.push(`${k} ${h}: no fold button`); continue; }
      if(want==='G'&&!o.call){ fails.push(`${k} ${h}: no call button`); continue; }
      const ex=D.explain(sc,ch);
      if(!ex.actionOk) fails.push(`${k} ${h} set ${code}: graded wrong`);
      const customCell=D.isCustomCell(k,D.idxOf(h));
      if(customCell && ex.paras[0].tag!=='Your range says') fails.push(`${k} ${h}: custom note missing`);
      if(customCell && ex.paras.some(x=>x.tag==='Live 1/3 read')) fails.push(`${k} ${h}: live read overrode custom`);
     } } } }
  D.clearCustom(); return {n,fails}; });
 console.log(`C. custom-range grading checks: ${C.n}, failures: ${C.fails.length}`); C.fails.slice(0,15).forEach(x=>console.log('   '+x));

 // ---------- D: profiles, PIN, isolation, persistence, backup/restore ----------
 const D=[]; const ok=(c,m)=>D.push((c?'PASS ':'FAIL ')+m);
 const ctx2=await b.newContext();
 await ctx2.addInitScript(()=>{ if(!localStorage.getItem('dp3:profiles')&&!sessionStorage.getItem('seeded')){ sessionStorage.setItem('seeded','1');
   localStorage.setItem('dp2_stats',JSON.stringify({hands:7,correct:5,sizeN:0,sizeOk:0,streak:0,best:2,bySit:{},byPos:{},leaks:{},miss:[]}));
   localStorage.setItem('dp_custom',JSON.stringify({'RFI:UTG':'R'.repeat(169)})); } });
 const q=await ctx2.newPage(); q.on('pageerror',e=>errs.push('pageerror(profile) '+e.message));
 await q.goto(FILE); await q.waitForTimeout(400);
 ok((await q.textContent('#s-hands'))==='7','old single-user stats migrate into Player 1');
 ok(await q.evaluate(()=>window.__dp.chart('RFI:UTG')==='R'.repeat(169)),'old custom ranges migrate into Player 1');
 await q.click('#profileBtn'); await q.fill('#newName','Alice'); await q.fill('#newPin','1234'); await q.click('#createBtn'); await q.waitForTimeout(200);
 ok((await q.textContent('#profName'))==='Alice','create profile switches to it');
 ok((await q.textContent('#s-hands'))==='0','new profile starts with empty stats');
 ok(await q.evaluate(()=>window.__dp.chart('RFI:UTG')!=='R'.repeat(169)),'new profile does not inherit custom ranges');
 for(let i=0;i<3;i++){ await q.keyboard.press('f'); await q.waitForTimeout(30); await q.keyboard.press('Space'); }
 ok((await q.textContent('#s-hands'))==='3','stats count in the new profile');
 // paint 72o as a raise in UTG via the real editor
 await q.click('#tab-ranges'); await q.selectOption('#chartSel','RFI:UTG'); await q.click('#brushes [data-b="R"]');
 await q.click(`#editGrid .c[data-i="${await q.evaluate(()=>window.__dp.idxOf('72o'))}"]`);
 ok(await q.evaluate(()=>{ const D=window.__dp; const sc=D.makeSc('RFI:UTG','72o'); const o=D.options(sc); return D.explain(sc,{k:'R',size:o.sizes.find(s=>s.good)}).actionOk; }),'painted cell (72o raise UTG) is graded correct');
 ok(await q.evaluate(()=>{ const D=window.__dp; const sc=D.makeSc('RFI:UTG','72o'); return !D.explain(sc,{k:'F'}).actionOk; }),'folding the painted hand is graded wrong');
 // switch back to Player 1 (no PIN)
 await q.click('#tab-play'); if(await q.isHidden('#profilePanel')) await q.click('#profileBtn');
 const p1=await q.evaluate(()=>JSON.parse(localStorage.getItem('dp3:profiles')).find(x=>x.name==='Player 1').id);
 await q.click(`#plist [data-switch="${p1}"]`); await q.waitForTimeout(200);
 ok((await q.textContent('#profName'))==='Player 1' && (await q.textContent('#s-hands'))==='7','switching back restores Player 1 stats');
 ok(await q.evaluate(()=>window.__dp.chart('RFI:UTG')==='R'.repeat(169)),"Player 1 keeps its own custom chart, not Alice's");
 // a new tab (new session) on Alice requires the PIN
 const aliceId=await q.evaluate(()=>JSON.parse(localStorage.getItem('dp3:profiles')).find(x=>x.name==='Alice').id);
 await q.click(`#plist [data-switch="${aliceId}"]`); await q.waitForTimeout(200);
 const q2=await ctx2.newPage(); q2.on('pageerror',e=>errs.push('pageerror(profile2) '+e.message)); await q2.goto(FILE); await q2.waitForTimeout(400);
 ok(await q2.isVisible('#lock'),'reopening on a PIN profile shows the login screen');
 await q2.fill('#lockPin','9999'); await q2.click('#lockGo'); await q2.waitForTimeout(200);
 ok(await q2.isVisible('#lock') && /match/.test(await q2.textContent('#lockStatus')),'wrong PIN is rejected');
 await q2.fill('#lockPin','1234'); await q2.click('#lockGo'); await q2.waitForTimeout(300);
 ok(!(await q2.isVisible('#lock')) && (await q2.textContent('#s-hands'))==='3','right PIN unlocks and loads Alice');
 ok(await q2.evaluate(()=>{ const D=window.__dp; const sc=D.makeSc('RFI:UTG','72o'); const o=D.options(sc); return D.explain(sc,{k:'R',size:o.sizes.find(s=>s.good)}).actionOk; }),"Alice's custom chart persists after reload");
 // keyboard is blocked while locked
 if(await q2.isHidden('#profilePanel')) await q2.click('#profileBtn'); await q2.click('#logoutBtn'); await q2.waitForTimeout(150);
 const before=await q2.textContent('#s-hands'); await q2.keyboard.press('f'); await q2.waitForTimeout(100);
 ok(await q2.isVisible('#lock') && (await q2.textContent('#s-hands'))===before,'locking hides the app and ignores keys');
 await q2.fill('#lockPin','1234'); await q2.click('#lockGo'); await q2.waitForTimeout(200);
 // backup -> delete -> restore
 if(await q2.isHidden('#profilePanel')) await q2.click('#profileBtn'); await q2.evaluate(()=>{ navigator.clipboard.writeText=()=>Promise.resolve(); }); await q2.click('#backupBtn'); await q2.waitForTimeout(100);
 const backup=await q2.inputValue('#backupIo'); ok(/disciplined-preflop/.test(backup) && JSON.parse(backup).profiles.length===2,'backup contains both profiles');
 await q2.click('#delProfile'); await q2.click('#delProfile'); await q2.waitForTimeout(200);
 ok(await q2.evaluate(()=>JSON.parse(localStorage.getItem('dp3:profiles')).length===1),'delete removes the profile');
 if(await q2.isHidden('#profilePanel')) await q2.click('#profileBtn');
 await q2.fill('#backupIo',backup); await q2.click('#restoreBtn'); await q2.click('#restoreBtn'); await q2.waitForTimeout(300);
 ok(await q2.evaluate(()=>JSON.parse(localStorage.getItem('dp3:profiles')).length===2),'restore brings both profiles back');
 ok(await q2.isVisible('#lock'),'restored PIN profile asks for its PIN again');
 await q2.fill('#lockPin','1234'); await q2.click('#lockGo'); await q2.waitForTimeout(200);
 if(await q2.isHidden('#profilePanel')) await q2.click('#profileBtn');
 ok(await q2.evaluate(()=>{ const id=JSON.parse(localStorage.getItem('dp3:profiles')).find(x=>x.name==='Alice').id; return JSON.parse(localStorage.getItem('dp3:'+id+':stats')).hands===3; }),"restored profile keeps its stats");
 await q2.fill('#backupIo','{"nope":1}'); await q2.click('#restoreBtn'); ok(/isn't a Disciplined Preflop backup/.test(await q2.textContent('#profStatus')),'bad backup is rejected with a message');


 // ---------- G: spots follow YOUR ranges ----------
 const G=await p.evaluate(()=>{ const D=window.__dp, res=[]; D.setBaseline('noante'); D.setLive(true); D.clearCustom();
   // add 72o to the UTG open: it must be dealt into UTG 3-bet spots and graded as a fold there
   D.setCustomCell('RFI:UTG','72o','R');
   let seen72=false; for(let i=0;i<4000&&!seen72;i++){ const sc=window.__dp.newSc&&window.__dp.newSc('vs3bet','UTG'); if(sc&&sc.hand==='72o') seen72=sc; }
   res.push([!!seen72,'custom UTG open (72o) is dealt into UTG 3-bet spots']);
   if(seen72){ const ex=D.explain(seen72,{k:'F'}); res.push([ex.actionOk && /no plan for it/.test(ex.paras[0].html),'it is graded as a fold with a "paint it" note']); }
   // remove AA from the UTG open: it must never be dealt into UTG 3-bet spots
   D.clearCustom(); D.setCustomCell('RFI:UTG','AA','F'); let aa=false; for(let i=0;i<3000;i++){ const sc=D.newSc('vs3bet','UTG'); if(sc&&sc.hand==='AA'){ aa=true; break; } }
   res.push([!aa,'a hand removed from your open is never dealt into 3-bet spots']);
   // SB limp spot follows the SB limp range
   D.clearCustom(); D.setCustomCell('RFI:SB','32o','G'); let l32=false; for(let i=0;i<6000&&!l32;i++){ const sc=D.newSc('sblimp','SB'); if(sc&&sc.hand==='32o') l32=true; }
   res.push([l32,'custom SB limp (32o) is dealt into SB-limp spots']);
   // 4-bet spots follow your 3-bet range
   D.clearCustom(); const vk='VS:BTN vs CO'; D.setCustomCell(vk,'72o','R'); let s72=false; for(let i=0;i<6000&&!s72;i++){ const sc=D.newSc('vs4bet','BTN'); if(sc&&sc.vsKey===vk&&sc.hand==='72o') s72=true; }
   res.push([s72,'custom 3-bet (72o BTN vs CO) is dealt into 4-bet spots']);
   D.clearCustom(); return res; });
 G.forEach(([c,m])=>ok(c,m));
 // ---------- E: review -> Edit this chart ----------
 const r=await ctx.newPage(); r.on('pageerror',e=>errs.push('pageerror(review) '+e.message)); await r.goto(FILE); await r.waitForTimeout(300);
 await r.evaluate(()=>{ try{ const s=JSON.parse(localStorage.getItem('dp3:profiles')); }catch(e){} });
 await r.keyboard.press('f'); await r.waitForTimeout(100);
 const reviewChart=await r.textContent('.chartname b'); await r.click('#editChartBtn'); await r.waitForTimeout(150);
 const selLabel=await r.evaluate(()=>{ const s=document.getElementById('chartSel'); return s.options[s.selectedIndex].textContent; });
 ok(!(await r.isHidden('#view-ranges')) && selLabel===reviewChart && (await r.$$('#editGrid .c.me')).length===1,`"Edit this chart" opens "${reviewChart}" with the hand outlined`);

 // ---------- F: every spot type renders and answers in the UI ----------
 const seen={}; for(let i=0;i<500&&Object.keys(seen).length<7;i++){ await r.click('#tab-play').catch(()=>{}); const eb=(await r.textContent('#sit-eyebrow')).split(' · ')[0]; seen[eb]=(seen[eb]||0)+1; await r.keyboard.press('c'); await r.keyboard.press('Space'); }
 ok(Object.keys(seen).length===7,'all 7 spot types dealt: '+Object.keys(seen).join(', '));
 for(const [w,h,n] of [[1300,900,'desktop'],[390,844,'phone']]){ const m=await ctx.newPage({viewport:{width:w,height:h}}); await m.setViewportSize({width:w,height:h}); await m.goto(FILE); await m.waitForTimeout(300);
   const sw=await m.evaluate(()=>document.documentElement.scrollWidth); ok(sw<=w,`${n}: no horizontal scroll (${sw}px)`); await m.click('#profileBtn'); const sw2=await m.evaluate(()=>document.documentElement.scrollWidth); ok(sw2<=w,`${n}: profile panel fits (${sw2}px)`); }
 console.log('\nD/E/F. UI flows:'); D.forEach(x=>console.log('   '+x));
 console.log('\nERRORS:',errs.length?errs:'none'); await b.close();
})();
