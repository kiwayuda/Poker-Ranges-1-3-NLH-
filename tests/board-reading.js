// Usage: node tests/board-reading.js /absolute/path/to/index.html
// Static vs dynamic: "do the nuts change on the turn?" Paired boards used to read 100% dynamic because the quads' kicker was compared.
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const o=__dp.oop, D=bd=>o.dynamism(bd.map(o.card)).dynamic?'dynamic':'static', W=bd=>o.wetness(bd.map(o.card)).wet?'wet':'dry';
 return {
  'K-7-2 rainbow is static':[D(['Ks','7h','2d']),'static'],
  'A-7-5 rainbow is dynamic':[D(['As','7h','5d']),'dynamic'],
  '7-3-2 rainbow is dynamic':[D(['7s','3h','2d']),'dynamic'],
  '9-2-9 (quads are the nuts) is static':[D(['9c','2s','9h']),'static'],
  'Q-Q-5 is static':[D(['Qs','Qh','5d']),'static'],
  '8-8-8 is static':[D(['8s','8h','8d']),'static'],
  'A-7-5 rainbow is dry':[W(['As','7h','5d']),'dry'],
  'J-T-2 one suit... two-tone is wet':[W(['Js','Th','2s']),'wet']
 };});
let bad=0; for(const k in r){ if(r[k][0]!==r[k][1]){ bad++; console.log('FAIL',k,'got',r[k][0]); } }
const why=await p.evaluate(()=>__dp.oop.dynamism(['As','7h','5d'].map(__dp.oop.card)).why);
if(!/\(.*\)/.test(why)){ bad++; console.log('FAIL explanation should list the cards that change the nuts:',why); }
console.log(bad?'FAILED':'board reading OK', errs.length?errs:'');
await b.close(); process.exit(bad||errs.length?1:0);})();
