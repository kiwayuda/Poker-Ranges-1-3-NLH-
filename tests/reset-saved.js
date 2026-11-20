// Usage: node tests/reset-saved.js /absolute/path/to/index.html
// Reset puts a chart back to how the set was when it was imported or created, not to the original PokerCoaching chart.
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(300);await p.click('#tab-ranges');
const res=[];const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m);
const r=await p.evaluate(async()=>{const D=__dp,base=D.base();const k='RFI:CO';const arr=base[k].split('');arr[D.idxOf('72o')]='R';const imp=arr.join('');
  document.getElementById('io').value=JSON.stringify({v:3,sets:[{name:'T',edits:{[k]:imp}}]});document.getElementById('importBtn').click();
  const sel=document.getElementById('chartSel');sel.value=k;sel.dispatchEvent(new Event('change'));
  const out={};out.imported=D.chart(k)===imp;
  D.setCustomCell(k,'T9s','F'); out.edited=D.chart(k)!==imp;
  const click=async id=>{const el=document.getElementById(id);el.click();el.click();};
  await click('resetOne'); out.backToImport=D.chart(k)===imp; out.notOriginal=D.chart(k)!==base[k];
  D.setCustomCell(k,'T9s','F'); await click('resetAll'); out.allBack=D.chart(k)===imp;
  // a set started from scratch resets to the original
  return out;});
ok(r.imported,'imported chart is loaded');ok(r.edited,'editing changes the chart');
ok(r.backToImport,'Reset this chart returns to the imported version');ok(r.notOriginal,'...not the original PokerCoaching chart');
ok(r.allBack,'Reset all charts returns to the imported version');
console.log(res.join('\n'));console.log('ERRORS',errs.length?errs:'none');await b.close();process.exit(res.some(x=>x.startsWith('FAIL'))||errs.length?1:0);})();
