const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
const r=await p.evaluate(()=>{ const o=__dp.oop, T=(h,bd)=>{ const x=o.outsOf(h.map(o.card),bd.map(o.card)); return {t:x.total,f:x.flushN,s:x.straightN,both:x.both}; };
 return {
  flushOesd:T(['Jh','Th'],['9h','8c','2h']),          // 15
  overcards:T(['Ah','Kc'],['9h','5c','2d']),          // 6
  pocketSet:T(['7c','7d'],['Ks','9h','2c']),          // 2
  gutshot:T(['Jd','9d'],['Kh','Td','2s']),            // 4
  oesd:T(['Jd','Td'],['Qc','9h','4s']),               // 8
  fd:T(['Ah','5h'],['Kh','9h','2c']),                 // 9
  topPairKQ:T(['Kd','Qc'],['Ks','9h','4c']),          // 5 (Q x3, K x2)
  turnFd:T(['Ah','5h'],['Kh','9h','2c','7d']),        // 9
  madeStraight:T(['9c','8c'],['7h','6d','5s']),       // already a straight: no straight outs; flush? none
 }; });
console.log(JSON.stringify(r));
const exp={flushOesd:21,overcards:6,pocketSet:2,gutshot:4,oesd:8,fd:12,topPairKQ:5,turnFd:12};
let bad=0; for(const k in exp){ if(r[k].t!==exp[k]){ bad++; console.log('MISMATCH',k,r[k].t,'expected',exp[k]); } }
console.log(bad?'FAILED':'all known outs counts match', errs);
await b.close();})();
