// Usage: node tests/tap-again.js /absolute/path/to/index.html
// After you answer on the Postflop tab, the answer buttons stay put. Tapping (or pressing the number of) the right answer again deals the next hand.
const {chromium}=require('playwright'); const http=require('http'),fs=require('fs');
(async()=>{const html=fs.readFileSync(process.argv[2]);const srv=http.createServer((q,r)=>{r.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});r.end(html)});await new Promise(r=>srv.listen(0,'127.0.0.1',r));
const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const res=[];const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m);
await p.goto('http://127.0.0.1:'+srv.address().port+'/');await p.waitForTimeout(400);
await p.click('#tab-postflop');await p.waitForTimeout(200);
const state=()=>p.evaluate(()=>{const g=__dp.oopGet();return {done:g.done,idx:g.idx,n:g.qs.length,ans:g.qs.map(q=>q.opts.findIndex(o=>o.v===q.ans)),key:JSON.stringify(g.spot&&g.spot.hole)+JSON.stringify(g.spot&&g.spot.board)};});
for(const m of ['flop','stab','turn','hand','outs']){
  await p.click('#oopm-'+m);await p.waitForTimeout(250);
  let st=await state();
  // answer every question wrongly where possible, except the last which we get right or wrong depending on the mode
  let lastBtnY=null, guard=0;
  while(!st.done&&guard++<8){
    const cur=await p.$('#oop-qs .oq.cur .btn'); const y=await p.evaluate(()=>{const bs=[...document.querySelectorAll('#oop-qs .oq.cur .btn')];return Math.round(bs[0].getBoundingClientRect().top);});
    if(st.idx===st.n-1) lastBtnY=y;
    const right=st.ans[st.idx]; await p.keyboard.press(String(right+1)); await p.waitForTimeout(120); st=await state();
  }
  ok(st.done,`${m}: finished the hand`);
  const again=await p.$$('#oop-qs .btn.again'); ok(again.length===1,`${m}: exactly one tap-again button is shown`);
  const y2=await p.evaluate(()=>Math.round(document.querySelector('#oop-qs .oq.fin .btn').getBoundingClientRect().top));
  ok(lastBtnY!==null&&Math.abs(y2-lastBtnY)<=2,`${m}: answer buttons stay where you tapped (${lastBtnY}px -> ${y2}px), so no scrolling`);
  // pressing a wrong number does nothing
  const before=st.key;
  async function await0(pg){ return pg.evaluate(()=>__dp.oopGet().qs[__dp.oopGet().qs.length-1].opts.length); }
  const nopts=await await0(p); const wi=[...Array(nopts).keys()].find(i=>i!==st.ans[st.n-1]);
  await p.keyboard.press(String(wi+1)); await p.waitForTimeout(150);
  let st2=await state(); ok(st2.done&&st2.key===before,`${m}: a wrong key does not move on`);
  // clicking the disabled wrong button does nothing either
  const wbtn=await p.$(`#oop-qs .oq.fin .btn[data-oq="${wi}"]`); ok(!!wbtn&&await wbtn.isDisabled(),`${m}: other answers are disabled`);
  // the right answer again goes to the next hand (tap)
  await p.click('#oop-qs .btn.again'); await p.waitForTimeout(250);
  st2=await state(); ok(!st2.done&&st2.key!==before,`${m}: tapping the right answer again deals the next hand`);
  // and by key
  const st3=await state(); for(let g=0;g<8&&!(await state()).done;g++){ const s=await state(); await p.keyboard.press(String(s.ans[s.idx]+1)); await p.waitForTimeout(100); }
  const s4=await state(); const k4=s4.key; await p.keyboard.press(String(s4.ans[s4.n-1]+1)); await p.waitForTimeout(250);
  const s5=await state(); ok(!s5.done&&s5.key!==k4,`${m}: pressing the right answer's number again deals the next hand`);
}
console.log(res.join('\n'));console.log('ERRORS',errs.length?errs:'none');await b.close();srv.close();})();
