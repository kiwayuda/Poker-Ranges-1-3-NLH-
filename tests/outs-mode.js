const {chromium}=require('playwright'); const http=require('http'),fs=require('fs');
(async()=>{const html=fs.readFileSync(process.argv[2]);const OUT=process.argv[3]||'.';const srv=http.createServer((q,r)=>{r.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});r.end(html)});await new Promise(r=>srv.listen(0,'127.0.0.1',r));
const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:720},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const res=[];const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m);
await p.goto('http://127.0.0.1:'+srv.address().port+'/');await p.waitForTimeout(400);
await p.click('#tab-postflop');await p.waitForTimeout(200);
// mode bar fits on a phone
ok(await p.evaluate(()=>document.documentElement.scrollWidth<=390),'phone width fits with five mode buttons');
ok(await p.evaluate(()=>document.querySelector('.oopbar').getBoundingClientRect().height<60),'mode bar stays on one row');
await p.click('#oopm-outs');await p.waitForTimeout(300);
ok((await p.textContent('#oop-qs')).includes('How many outs'),'outs mode asks how many outs');
const fit=await p.evaluate(()=>{window.scrollTo(0,0);const bs=[...document.querySelectorAll('#oop-qs .oq.cur .btn')];return {n:bs.length,last:Math.round(Math.max(...bs.map(x=>x.getBoundingClientRect().bottom))),H:innerHeight};});
ok(fit.n===4&&fit.last<=fit.H,'four answers fit on one screen: '+JSON.stringify(fit));
const sp=await p.evaluate(()=>{const s=__dp.oopGet().spot;return {tot:s.outs.total,turn:s.turnDrill,n:s.board.length};});
ok(sp.tot>=3&&sp.tot<=21&&sp.n===(sp.turn?4:3),'spot has 3-21 outs and the right board size: '+JSON.stringify(sp));
// wrong answer for q1 (pick an option that is not the right one)
const opts=await p.evaluate(()=>__dp.oopGet().qs[0].opts.map(o=>o.v));
ok(new Set(opts).size===4&&opts.includes(sp.tot),'four distinct choices including the right count: '+opts);
const wi=opts.findIndex(v=>v!==sp.tot); await p.keyboard.press(String(wi+1)); await p.waitForTimeout(150);
ok((await p.textContent('#oop-qs')).includes('Chance to hit'),'then asks the chance to hit');
const popts=await p.evaluate(()=>__dp.oopGet().qs[1].opts.map(o=>o.v)); ok(new Set(popts).size===4,'four distinct percent choices: '+popts);
const exp=await p.evaluate(()=>__dp.oopGet().qs[1].ans); await p.keyboard.press(String(popts.indexOf(exp)+1)); await p.waitForTimeout(250);
const t=await p.textContent('#oop-qs');
ok(t.includes('Total:')&&t.includes('outs'),'feedback walks through the outs and total');
ok(/Quick rule/.test(t),'feedback gives the rule-of-2/4 and the exact chance');
ok((await p.$$('#oop-qs .hd-row')).length>=1,'feedback shows the out cards grouped');
ok(await p.isVisible('#oop-next'),'next button');
await p.screenshot({path:OUT+'/outs-feedback.png',fullPage:true});
await p.keyboard.press('Space'); await p.waitForTimeout(250);
ok((await p.textContent('#oop-qs')).includes('How many outs'),'space deals the next one');
// many spots: invariants
const inv=await p.evaluate(()=>{ let bad=0,n=0,both=0; for(let i=0;i<300;i++){ const s=__dp.oop.outsSpot(__dp.oopEnv,(Math.random()*2**31)|0,{turn:i%3===0,overlap:i%4===0}); if(!s) continue; n++; const o=s.outs; if(o.total!==o.cards.length) bad++; if(new Set(o.cards.map(x=>x.c)).size!==o.cards.length) bad++; if(o.both) both++;
   const qs=__dp.oopBuildQs?__dp.oopBuildQs(s):null; if(qs){ if(!qs[0].opts.some(x=>x.v===qs[0].ans)||!qs[1].opts.some(x=>x.v===qs[1].ans)) bad++; if(new Set(qs[0].opts.map(x=>x.v)).size<4||new Set(qs[1].opts.map(x=>x.v)).size<4) bad++; } } return {n,bad,both}; });
ok(inv.n>250&&inv.bad===0&&inv.both>20,'300 spots: no duplicates, right answer always offered, overlap spots appear: '+JSON.stringify(inv));
await p.click('#tab-stats');await p.waitForTimeout(200);
ok((await p.textContent('#t-oop')).includes('outs drill')&&(await p.textContent('#t-oop')).includes('Outs: how many'),'stats list the outs drill');
console.log(res.join('\n'));console.log('ERRORS',errs.length?errs:'none');await b.close();srv.close();})();
