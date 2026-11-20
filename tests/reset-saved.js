// Usage: node tests/reset-saved.js /absolute/path/to/index.html
// Edits are a draft until Save. Undo works before Save. Reset goes back to the version the set started from:
// the imported text, or the set it was duplicated from, or the Original for a set made from scratch.
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(300);await p.click('#tab-ranges');
const res=[];const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m);
const r=await p.evaluate(async()=>{const D=__dp,base=D.base(),S=D.sets;const k='RFI:CO';const out={};
  const arr=base[k].split('');arr[D.idxOf('72o')]='R';const imp=arr.join('');
  document.getElementById('io').value=JSON.stringify({v:3,sets:[{name:'Imp',edits:{[k]:imp}}]});document.getElementById('importBtn').click();
  const sel=document.getElementById('chartSel');sel.value=k;sel.dispatchEvent(new Event('change'));
  const dbl=id=>{const el=document.getElementById(id);el.click();el.click();};
  out.importLoaded=D.chart(k)===imp&&!S.dirty();
  // paint -> draft, not saved
  D.setCustomCell(k,'T9s','F'); document.getElementById('chartSel').dispatchEvent(new Event('change'));
  out.draftChanged=D.chart(k)!==imp; out.notSavedYet=S.list().find(s=>s.id===S.active()).edits[k]===imp;
  out.dirtyFlag=S.dirty();
  // reset goes to the import, not the original, and is still a draft
  dbl('resetOne'); out.resetToImport=D.chart(k)===imp&&D.chart(k)!==base[k];
  // Undo steps back the reset
  document.getElementById('edUndo').click(); out.undoRestoresDraft=D.chart(k)!==imp;
  // save commits; Undo is cleared
  S.save(); out.saved=S.list().find(s=>s.id===S.active()).edits[k]===D.chart(k)&&!S.dirty();
  // after saving, reset still goes to the import
  dbl('resetOne'); out.resetAfterSave=D.chart(k)===imp;
  out.stillDraftAfterReset=S.dirty();
  S.save(); out.sourceKept=S.list().find(s=>s.id===S.active()).source[k]===imp;
  // duplicate: reset goes back to what it was duplicated from
  D.setCustomCell(k,'AKo','F'); S.save(); const edited=D.chart(k);
  const dup=S.create('Copy',S.active()); // duplicate of the active (edited) set
  out.dupStartsFromParent=D.chart(k)===edited;
  D.setCustomCell(k,'QQ','F'); dbl('resetOne'); out.dupResetsToParent=D.chart(k)===edited;
  // from scratch: reset goes to the original
  const fresh=S.create('Fresh','original'); D.setCustomCell(k,'AA','F'); dbl('resetOne'); out.freshResetsToOriginal=D.chart(k)===base[k];
  return out;});
ok(r.importLoaded,'imported set loads and is clean');
ok(r.draftChanged&&r.notSavedYet,'painting changes only the draft until Save');
ok(r.dirtyFlag,'the editor knows there are unsaved changes');
ok(r.resetToImport,'Reset this chart returns to the imported version, not the original');
ok(r.undoRestoresDraft,'Undo steps back the reset before saving');
ok(r.saved,'Save commits the draft');
ok(r.resetAfterSave&&r.stillDraftAfterReset,'after saving, Reset still goes to the import (as a draft)');
ok(r.sourceKept,'the starting version is kept when you save');
ok(r.dupStartsFromParent&&r.dupResetsToParent,'a duplicate resets to the set it was copied from');
ok(r.freshResetsToOriginal,'a set made from scratch resets to the original');
// dialog + unsaved-change guard on switching sets
const guard=await (async()=>{ let asked=0; const q=await b.newPage(); q.on('dialog',d=>{asked++;d.dismiss();}); await q.goto('file://'+process.argv[2]); await q.waitForTimeout(300);
  const r2=await q.evaluate(()=>{ const S=__dp.sets; const a=S.create('A','original'); S.create('B','original'); __dp.setCustomCell('RFI:CO','AA','F'); const before=S.active(); S.switchTo(a.id); return {before,after:S.active(),dirty:S.dirty()}; });
  await q.close(); return {asked,...r2}; })();
ok(guard.asked===1&&guard.before===guard.after&&guard.dirty,'switching sets with unsaved changes asks first, and Cancel stays put');
console.log(res.join('\n'));console.log('ERRORS',errs.length?errs:'none');await b.close();process.exit(res.some(x=>x.startsWith('FAIL'))||errs.length?1:0);})();
