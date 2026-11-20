// Usage: node tests/dealer-button.js /absolute/path/to/index.html
// The dealer button must never cover the board cards, your cards, the pot, chips or another seat, on the preflop table and the postflop table.
// "Cover" means more than 2px of real overlap (sub-pixel rounding is not visible).
const {chromium}=require('playwright'); const http=require('http'),fs=require('fs');
(async()=>{const html=fs.readFileSync(process.argv[2]);const srv=http.createServer((q,r)=>{r.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});r.end(html)});await new Promise(r=>srv.listen(0,'127.0.0.1',r));
const b=await chromium.launch(); const errs=[]; const res=[]; const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m);
const URL='http://127.0.0.1:'+srv.address().port+'/';
const hitFn=`(a,c)=>Math.min(a.r,c.r)-Math.max(a.l,c.l)>2&&Math.min(a.b,c.b)-Math.max(a.t,c.t)>2`;
for(const w of [390,360,1280]){
  const p=await b.newPage({viewport:{width:w,height:900}}); p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL); await p.waitForTimeout(300);

  // ---- postflop table
  await p.click('#tab-postflop'); await p.waitForTimeout(200);
  let overlaps=[], n=0, seats=new Set();
  for(const mode of ['flop','turn','hand','outs']){
    await p.click('#oopm-'+mode); await p.waitForTimeout(150);
    for(let i=0;i<50;i++){
      const r=await p.evaluate(h=>{ const hit=eval(h); const D=document.querySelector('.mtable .mdealer'); if(!D) return {none:true};
        const box=e=>{const x=e.getBoundingClientRect(); return {l:x.left,t:x.top,r:x.right,b:x.bottom}}; const d=box(D);
        const things=[...document.querySelectorAll('.mtable .mboard .card, .mtable .mhero .card, .mtable .mpot, .mtable .mchip')].map(e=>[e.className.split(' ')[0],box(e)]);
        const others=[...document.querySelectorAll('.mtable .ms')].filter(e=>!e.contains(D)).map(e=>['seat '+e.querySelector('b').textContent,box(e)]);
        const bad=[...things,...others].filter(([nm,x])=>hit(d,x)).map(([nm])=>nm);
        const tb=box(document.querySelector('.mtable')); const inside=d.l>=tb.l-3&&d.r<=tb.r+3&&d.t>=tb.t-3&&d.b<=tb.b+3;
        return {bad,inside,seat:D.parentElement.querySelector('b').textContent}; },hitFn);
      n++; if(r.none) overlaps.push('no dealer button'); else { seats.add(r.seat); if(r.bad.length) overlaps.push(r.bad.join('+')); if(!r.inside) overlaps.push('outside table'); }
      await p.evaluate(()=>__dp.oopNew()); await p.waitForTimeout(40);
    }
  }
  ok(n>=150&&overlaps.length===0,`${w}px postflop: dealer button clear of cards, pot and other seats in ${n} tables`+(overlaps.length?' ('+[...new Set(overlaps)].join(', ')+')':''));
  ok(seats.size===1&&[...seats][0]==='BTN','postflop: the button always sits on the BTN seat');

  // ---- preflop table
  await p.click('#tab-play'); await p.waitForTimeout(200); /* the app starts on Intro, so this also proves the button is placed when Play is shown */
  const bad=new Set(); let m=0;
  for(let i=0;i<120;i++){
    const r=await p.evaluate(h=>{ const hit=eval(h); const D=document.querySelector('#felt .dealer'); if(!D) return {none:true}; const box=e=>{const x=e.getBoundingClientRect(); return {l:x.left,t:x.top,r:x.right,b:x.bottom}}; const d=box(D);
      const things=[...document.querySelectorAll('#felt .center, #felt .herocards, #felt .seat, #felt .chips, #felt .card')].filter(e=>!D.contains(e)&&e.dataset.pos!=='BTN').map(e=>[e.className.split(' ')[0],box(e)]);
      const inside=d.l>=0&&d.r<=document.documentElement.clientWidth; /* seats sit on the rim, so the button may sit beside them, but never off the screen */
      return {bad:things.filter(([nm,x])=>hit(d,x)).map(([nm])=>nm),inside}; },hitFn);
    m++; if(r.none) bad.add('no dealer button'); else { r.bad.forEach(x=>bad.add(x)); if(!r.inside) bad.add('outside table'); }
    await p.keyboard.press('Space'); await p.evaluate(()=>{ const a=document.querySelector('#actions .btn:not([disabled])'); if(a) a.click(); }); await p.keyboard.press('Space'); await p.waitForTimeout(30);
  }
  ok(bad.size===0,`${w}px preflop: dealer button clear of other seats, chips, the table centre and your cards in ${m} tables`+(bad.size?' ('+[...bad].join(', ')+')':''));
  await p.close();
}
console.log(res.join('\n')); console.log('ERRORS',errs.length?errs:'none'); await b.close(); srv.close(); process.exit(res.some(r=>r.startsWith('FAIL'))||errs.length?1:0);})();
