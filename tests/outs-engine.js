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
   pocketPairSet:[T(['7c','7d'],['Ks','9h','2c']),2],                           // two cards left make a set
   gutshot:[T(['Jd','9d'],['Kh','Td','2s']),4],
   broadwayGutshot:[T(['Ad','Jh'],['Kc','8d','Qh']),4],
   openEnded:[T(['Jd','Td'],['Qc','9h','4s']),8],
   flushDraw:[T(['Ah','5h'],['Kh','9h','2c']),9],
   turnFlushDraw:[T(['Ah','5h'],['Kh','9h','2c','7d']),9],
   topPairNoDraw:[T(['Kd','Qc'],['Ks','9h','4c']),2],                           // the two other kings make trips; pairing the Q or overcards is not an out
   alreadyStraight:[T(['9c','8c'],['7h','6d','5s']),0],
   straightPlusTrips_T9_on_QTJ:[T(['Ts','9s'],['Qd','Tc','Jd']),10],         // 8 straight cards + 2 tens
   pairPlusFlushDraw:[T(['Th','9h'],['Td','5h','2h']),11],                     // 9 hearts + 2 tens
   twoPairToFullHouse:[T(['As','Kd'],['Ac','Kh','7d']),4],                     // 2 aces + 2 kings
   setToFullHouseOrQuads:[T(['7c','7d'],['7s','Kh','2c']),7],                  // 3 kings + 3 deuces + the last seven
   boardPairNoHolePair:[T(['Ah','Kc'],['9h','9c','4d']),0],
   wheelPlusSeven_34_on_A75:[T(['3d','4c'],['As','7h','5d']),8],
   threeFourOnAce65Jack_isBackdoorOnly:[T(['3d','4c'],['As','6h','Jd']),0]},
  types:{
   broadwayGutshotIsLowEquity:[C(['Ad','Jh'],['Kc','8d','Qh']),'le'],
   aceHighNoDrill:[C(['Ad','9h'],['Kc','7d','3h']),'sdv'],
   gutshotIsLowEquity:[C(['Jd','9d'],['Kh','Td','2s']),'le'],
   flushDrawIsHighEquity:[C(['Ah','5h'],['Kh','9h','2c']),'he'],
   openEndedIsHighEquity:[C(['Jd','Td'],['Qc','9h','4s']),'he'],
   airIsAir:[C(['8d','3c'],['Kc','Jd','5h']),'air'],
   flushPlusStraightIsCombo:[C(['Jh','Th'],['9h','8c','2h']),'combo'],
   flushPlusGutshotIsCombo:[C(['Jh','Th'],['Qh','8h','4s']),'combo'],
   weakPairPlusOpenEndedIsHighEquity:[C(['Ts','9s'],['Qd','Tc','Jd']),'he'],      // pair of tens is below the Q and J: not a combo draw
   weakPairPlusFlushDrawIsHighEquity:[C(['5s','4s'],['Ks','Qs','5h']),'he'],
   topPairPlusFlushDrawStaysMade:[C(['Jh','Th'],['Td','6h','5h']),'thick']}
 }; });
const kinds=await p.evaluate(()=>{ const o=__dp.oop,K=(h,bd)=>o.outsOf(h.map(o.card),bd.map(o.card)).straightKind; return {
  openEnded:[K(['Jd','Td'],['Qc','9h','4s']),'open-ended'], wheelOpenEnded:[K(['5d','4c'],['3h','2s','Kd']),'open-ended'],
  gutshot:[K(['Jd','9d'],['Kh','Td','2s']),'gutshot'], broadwayGutshot:[K(['Ad','Jh'],['Kc','8d','Qh']),'gutshot'],
  doubleGutshot:[K(['9d','8c'],['6h','Ts','Qd']),'double gutshot'], wheelTwoGutshots:[K(['3d','4c'],['As','7h','5d']),'double gutshot']}; }); r.kinds=kinds;
let bad=0; for(const g of ['outs','types','kinds']) for(const k in r[g]){ const [got,exp]=r[g][k]; if(got!==exp){ bad++; console.log('MISMATCH',g,k,'got',got,'expected',exp); } }
console.log(bad?'FAILED':'all outs counts and hand types match', errs.length?errs:'');
await b.close(); process.exit(bad||errs.length?1:0);})();
