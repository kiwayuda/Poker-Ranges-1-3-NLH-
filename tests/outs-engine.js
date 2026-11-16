// Usage: node tests/outs-engine.js /absolute/path/to/index.html
// Outs are draw outs only (flush and straight cards). Checks known textbook counts and the hand-type rules around them.
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
const r=await p.evaluate(()=>{ const o=__dp.oop, T=(h,bd)=>o.outsOf(h.map(o.card),bd.map(o.card)).total, C=(h,bd)=>o.classify(h.map(o.card),bd.map(o.card)).cat;
 return {
  outs:{
   flushPlusOpenEnded:[T(['Jh','Th'],['9h','8c','2h']),15],
   overcardsOnly:[T(['Ah','Kc'],['9h','5c','2d']),0],
   pocketPairSet:[T(['7c','7d'],['Ks','9h','2c']),0],
   gutshot:[T(['Jd','9d'],['Kh','Td','2s']),4],
   broadwayGutshot:[T(['Ad','Jh'],['Kc','8d','Qh']),4],
   openEnded:[T(['Jd','Td'],['Qc','9h','4s']),8],
   flushDraw:[T(['Ah','5h'],['Kh','9h','2c']),9],
   turnFlushDraw:[T(['Ah','5h'],['Kh','9h','2c','7d']),9],
   topPairNoDraw:[T(['Kd','Qc'],['Ks','9h','4c']),0],
   alreadyStraight:[T(['9c','8c'],['7h','6d','5s']),0]},
  types:{
   broadwayGutshotIsLowEquity:[C(['Ad','Jh'],['Kc','8d','Qh']),'le'],
   aceHighNoDrill:[C(['Ad','9h'],['Kc','7d','3h']),'sdv'],
   gutshotIsLowEquity:[C(['Jd','9d'],['Kh','Td','2s']),'le'],
   flushDrawIsHighEquity:[C(['Ah','5h'],['Kh','9h','2c']),'he'],
   openEndedIsHighEquity:[C(['Jd','Td'],['Qc','9h','4s']),'he'],
   airIsAir:[C(['8d','3c'],['Kc','Jd','5h']),'air']}
 }; });
let bad=0; for(const g of ['outs','types']) for(const k in r[g]){ const [got,exp]=r[g][k]; if(got!==exp){ bad++; console.log('MISMATCH',g,k,'got',got,'expected',exp); } }
console.log(bad?'FAILED':'all outs counts and hand types match', errs.length?errs:'');
await b.close(); process.exit(bad||errs.length?1:0);})();
