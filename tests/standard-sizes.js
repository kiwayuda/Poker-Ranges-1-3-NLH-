// Usage: node tests/standard-sizes.js /absolute/path/to/index.html
// Every preflop spot uses the same live $1/$3 sizes: open $15, 3-bet $45 (the blinds 3-bet to $60), 4-bet about 2.4x the 3-bet.
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
const out=await p.evaluate(()=>{ const D=__dp, seen={open:new Set(),three:new Set(),four:new Set(),bb:new Set()}; const bad=[]; let n=0;
  const types=[['raise',['UTG+1','LJ','HJ','CO','BTN','SB','BB']],['squeeze',['HJ','CO','BTN','SB','BB']],['vs3bet',['UTG','HJ','CO','BTN','SB']],['vs4bet',['LJ','CO','BTN','SB','BB']],['sblimp',['SB']]];
  for(const [t,heroes] of types) for(const h of heroes) for(let i=0;i<25;i++){ const sc=D.newSc(t,h); if(!sc) continue; n++;
    if(sc.open!==undefined) seen.open.add(sc.open); if(sc.threebet!==undefined){ seen.three.add(sc.threebet); if(t==='vs3bet'){ const blind=sc.villain==='SB'||sc.villain==='BB'; if(sc.threebet!==(blind?60:45)) bad.push('3-bet '+sc.threebet+' from '+sc.villain); } }
    if(sc.fourbet!==undefined) seen.four.add(sc.fourbet); if(sc.bbRaise!==undefined) seen.bb.add(sc.bbRaise); }
  // the hero's own open: only $15 is the standard size
  const rfi=D.newSc('rfi','CO'); const good=D.options(rfi).sizes.filter(s=>s.good).map(s=>s.to);
  // the sizes offered for 3-bets and 4-bets are built from the standard facing sizes
  const r=D.newSc('raise','BTN'); const good3=D.options(r).sizes.filter(s=>s.good).map(s=>s.to);
  const r2=D.newSc('raise','BB'); const good3b=D.options(r2).sizes.filter(s=>s.good).map(s=>s.to);
  return {n,open:[...seen.open],three:[...seen.three].sort(),four:[...seen.four].sort(),bb:[...seen.bb],bad,good,good3,good3b}; });
const res=[]; const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m);
ok(out.n>400,'checked '+out.n+' dealt spots');
ok(out.open.length===1&&out.open[0]===15,'every open is $15: '+JSON.stringify(out.open));
ok(out.three.every(x=>x===45||x===60)&&out.three.length>=1,'3-bets are only $45 (or $60 from the blinds): '+JSON.stringify(out.three));
ok(out.bad.length===0,'a 3-bet from the blinds is $60 and from anywhere else $45'+(out.bad.length?': '+out.bad.join(', '):''));
ok(out.four.every(x=>x===110||x===145),'4-bets are $110 over $45 and $145 over $60: '+JSON.stringify(out.four));
ok(out.bb.length===1&&out.bb[0]===15,'the big blind raises to $15 over an SB limp: '+JSON.stringify(out.bb));
ok(out.good.length===1&&out.good[0]===15,'the only correct open size is $15: '+JSON.stringify(out.good));
ok(out.good3.length===1&&out.good3[0]===45&&out.good3b.length===1&&out.good3b[0]===60,'correct 3-bet sizes are $45 in position and $60 out of position: '+JSON.stringify([out.good3,out.good3b]));
console.log(res.join('\n')); console.log('ERRORS',errs.length?errs:'none'); await b.close(); process.exit(res.some(r=>r.startsWith('FAIL'))||errs.length?1:0);})();
