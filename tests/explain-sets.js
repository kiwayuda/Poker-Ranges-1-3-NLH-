// Usage: node tests/explain-sets.js /absolute/path/to/index.html
// Preflop explanations follow the active chart set, for correct and wrong answers alike.
const {chromium}=require('playwright'); const http=require('http'),fs=require('fs');
(async()=>{const html=fs.readFileSync(process.argv[2]);const srv=http.createServer((q,r)=>{r.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});r.end(html)});await new Promise(r=>srv.listen(0,'127.0.0.1',r));
const b=await chromium.launch(); const ctx=await b.newContext(); const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:'+srv.address().port+'/'); await p.waitForTimeout(400);
const res=[]; const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m);

const out=await p.evaluate(()=>{
  const D=__dp, bad=[]; let n=0;
  const strip=h=>h.replace(/<[^>]+>/g,'');
  const goodChoice=(sc,want)=> want==='R' ? {k:'R',size:D.options(sc).sizes.find(s=>s.good)} : {k:want,size:null};
  const wrongChoice=(sc,want)=>{ const o=D.options(sc); const opts=[]; if(o.fold) opts.push({k:'F',size:null}); if(o.call) opts.push({k:'G',size:null}); if(o.sizes.length) opts.push({k:'R',size:o.sizes.find(s=>s.good)||o.sizes[0]}); return opts.find(c=>c.k!==want); };
  const types=[['rfi','UTG'],['rfi','BTN'],['rfi','SB'],['limp','CO'],['limp','BB'],['raise','BTN'],['raise','SB'],['raise','BB'],['squeeze','BTN'],['vs3bet','CO'],['vs3bet','SB'],['vs4bet','BTN'],['sblimp','SB']];
  // Original: no set language at all
  for(const [t,h] of types){ for(let i=0;i<4;i++){ const sc=D.newSc(t,h); if(!sc) continue; const {want}=D.wantOf(sc); const ex=D.explain(sc,goodChoice(sc,want)); n++;
    if(ex.paras.some(x=>/Your set|Original plays/.test(x.tag+x.html))) bad.push('original shows set text: '+t+' '+h); } }
  // make a set and change charts
  const set=D.sets.create('Fish table');
  for(const [t,h] of types){ for(let i=0;i<6;i++){
    const sc=D.newSc(t,h); if(!sc) continue; const k=sc.key, hand=sc.hand, idx=D.idxOf(hand);
    const L=D.legendFor(k); const orig=D.base()[k][idx];
    const codes=Object.keys(L).filter(c=>c!==orig&&c!=='X'&&c!=='F'&&(c!=='D'||orig!=='D'));
    // a different cell of the same chart is changed first, so the chart is customized but THIS hand is not
    D.clearCustom();
    // 1. chart customized elsewhere, this hand untouched
    const other=(idx+5)%169; const arr0=D.chart(k).split(''); arr0[other]= arr0[other]==='R'?'F':'R'; set.edits[k]=arr0.join('');
    const sc0=D.newSc(t,h);
    // keep the same spot: rebuild explanation for the original scenario object with the customized chart
    let {want:w0}=D.wantOf(sc); let ex0=D.explain(sc,goodChoice(sc,w0)); n++;
    const tags0=ex0.paras.map(x=>x.tag);
    if(!tags0.includes('Your set vs the Original')) bad.push('no spot summary: '+t+' '+h);
    if(tags0.includes('Your set says')) bad.push('untouched hand got the custom-cell text: '+t+' '+h);
    // 2. this hand painted to a different action
    if(!codes.length){ delete set.edits[k]; continue; }
    const code=codes[(i)%codes.length]; const arr=D.chart(k).split(''); arr[idx]=code; set.edits[k]=arr.join('');
    for(const mode of ['correct','wrong']){
      const {want,code:c2}=D.wantOf(sc); n++;
      if(c2!==code) bad.push('grading did not follow the set: '+t+' '+h);
      const choice= mode==='correct'? goodChoice(sc,want) : wrongChoice(sc,want); if(!choice) continue;
      const ex=D.explain(sc,choice); const tags=ex.paras.map(x=>x.tag); const text=ex.paras.map(x=>strip(x.html)).join(' | ');
      if(mode==='correct'&&!ex.actionOk) bad.push('right answer marked wrong: '+t+' '+h);
      if(mode==='wrong'&&ex.actionOk) bad.push('wrong answer marked right: '+t+' '+h);
      if(!tags.includes('Your set says')) bad.push(mode+': missing "Your set says": '+t+' '+h);
      if(!tags.includes('Your set vs the Original')) bad.push(mode+': missing set summary: '+t+' '+h);
      if(!tags.includes('The standard view of the hand')) bad.push(mode+': standard view not labelled: '+t+' '+h);
      if(tags.includes('About the hand')) bad.push(mode+': stock "About the hand" still shown: '+t+' '+h);
      const says=ex.paras.find(x=>x.tag==='Your set says'); if(!says||!strip(says.html).includes('Fish table')||!strip(says.html).includes(L[code])||!strip(says.html).includes(L[orig]||orig)) bad.push(mode+': "Your set says" lacks set name or actions: '+t+' '+h+' | '+(says&&strip(says.html)));
      const sum=ex.paras.find(x=>x.tag==='Your set vs the Original'); const ga=D.chart(k);
      for(const cc of Object.keys(L)){ if(cc==='F'||cc==='X'||(k==='LIMP:BB'&&cc==='G')) continue; const v=D.pct(ga,[cc]); if(v>0&&!strip(sum.html).includes(v.toFixed(1)+'%')) bad.push(mode+': summary missing '+L[cc]+' '+v.toFixed(1)+': '+t+' '+h); }
      if(mode==='wrong'&&!tags.includes('The leak')) bad.push('wrong answer has no leak note: '+t+' '+h);
      if(mode==='correct'&&tags.includes('The leak')) bad.push('correct answer shows a leak note: '+t+' '+h);
    }
    delete set.edits[k];
  } }
  // squeeze fold wording follows the facing-a-raise chart
  let sq=null; for(let i=0;i<400&&!sq;i++){ const sc=D.newSc('squeeze','BTN'); if(!sc) continue; const idx=D.idxOf(sc.hand); const vk='VS:BTN vs '+sc.opener; const vkey=D.CHART_KEYS.find(k=>k.startsWith('VS:BTN vs ')&&k.slice(10).split('/').includes(sc.opener));
    if(D.chart(sc.key)[idx]==='F'&&(sc.hand.length===2||sc.hand[2]==='s')&&D.chart(vkey)[idx]==='F') sq={sc,idx,vkey}; }
  let squeeze=null;
  if(sq){ const exA=D.explain(sq.sc,{k:'F',size:null}); const a=strip(exA.paras[0].html);
    const arr=D.chart(sq.vkey).split(''); arr[sq.idx]='G'; set.edits[sq.vkey]=arr.join('');
    const exB=D.explain(sq.sc,{k:'F',size:null}); const bb=strip(exB.paras[0].html); delete set.edits[sq.vkey];
    squeeze={before:/already folds it/.test(a), after:/already folds it/.test(bb), plays:/plays it against a lone/.test(bb)}; }
  return {n,bad,squeeze};
});
ok(out.n>150,'checked '+out.n+' explanations across all seven preflop spot types (correct and wrong answers)');
ok(out.bad.length===0,'every explanation follows the active set'+(out.bad.length?': '+out.bad.slice(0,6).join(' || '):''));
ok(out.squeeze&&out.squeeze.before&&!out.squeeze.after&&out.squeeze.plays,'squeeze fold text only claims "your facing-a-raise chart already folds it" when it does: '+JSON.stringify(out.squeeze));
console.log(res.join('\n')); console.log('ERRORS',errs.length?errs:'none'); await b.close(); srv.close(); process.exit(res.some(r=>r.startsWith('FAIL'))||errs.length?1:0);})();
