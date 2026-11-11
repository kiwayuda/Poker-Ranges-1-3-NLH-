const {chromium}=require('playwright'); const http=require('http'),fs=require('fs');
(async()=>{const html=fs.readFileSync(process.argv[2]);const srv=http.createServer((q,r)=>{r.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});r.end(html)});await new Promise(r=>srv.listen(0,'127.0.0.1',r));
const U='http://127.0.0.1:'+srv.address().port+'/';const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
const res=[];const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m);
await p.goto(U);await p.waitForTimeout(400);
await p.click('#tab-ranges');
const cell=h=>`#editGrid .c:text-is("${h}")`;
const cls=async h=>(await p.getAttribute(cell(h),'class')).split(' ');
// nav
await p.click('#edGroups [data-g="VS"]'); await p.waitForTimeout(100);
ok((await p.textContent('#edName')).includes('BTN')||(await p.inputValue('#chartSel')).startsWith('VS:'),'group chip switches to Facing a raise: '+await p.inputValue('#chartSel'));
await p.click('#edHeroes [data-h="BTN"]'); await p.click('#edOpps [data-o="CO"]');
ok(await p.inputValue('#chartSel')==='VS:BTN vs CO','seat + opener chips pick VS:BTN vs CO');
for(const g of ['RFI','LIMP','3B','V4B','SBL','SQZ']){ await p.click(`#edGroups [data-g="${g}"]`); if(!(await p.inputValue('#chartSel')).startsWith(g+':')) ok(false,'group '+g); }
ok(true,'all groups navigable');
await p.click('#edGroups [data-g="VS"]'); await p.click('#edHeroes [data-h="BTN"]'); await p.click('#edOpps [data-o="CO"]');
const before=(await cls('72o')).filter(c=>'RBGFD'.includes(c)&&c.length===1)[0];
// brush by key 3 (Call) then click cell
await p.keyboard.press('3'); await p.click('#brushes button[aria-pressed="true"]',{trial:true});
const bsel=await p.getAttribute('#brushes button[aria-pressed="true"]','data-b');
await p.click(cell('72o'));
ok((await cls('72o')).includes(bsel),'tap paints 72o with brush '+bsel+' (was '+before+')');
ok((await p.textContent('#edRead')).includes('72o'),'readout shows hand');
ok((await p.textContent('#edName')).includes('1 hand changed'),'name shows 1 hand changed');
ok(await p.isEnabled('#edUndo'),'undo enabled');
await p.click('#edUndo'); await p.waitForTimeout(100);
ok(!(await cls('72o')).includes('cu')&&(await cls('72o')).includes(before),'undo restores 72o');
// typed range
await p.keyboard.press('1'); const b1=await p.getAttribute('#brushes button[aria-pressed="true"]','data-b');
await p.fill('#edType','TT+, AQs+'); await p.click('#edApply'); await p.waitForTimeout(100);
ok((await cls('TT')).includes(b1)&&(await cls('AKs')).includes(b1)&&(await cls('AQs')).includes(b1),'typed range paints TT, AQs, AKs');
ok(/Painted \d+ hand/.test(await p.textContent('#editStatus'))||/Nothing to change/.test(await p.textContent('#editStatus')),'status: '+(await p.textContent('#editStatus')));
await p.fill('#edType','zz9, TT+'); await p.click('#edApply');
ok((await p.textContent('#editStatus')).includes("Couldn't read"),'bad token rejected');
// group paint
await p.click('#brushes button:last-child'); const bl=await p.getAttribute('#brushes button[aria-pressed="true"]','data-b');
await p.click('#edGroupsQuick [data-grp="pairs"]'); await p.waitForTimeout(100);
ok((await cls('22')).includes(bl)&&(await cls('AA')).includes(bl),'group pairs painted as '+bl);
// undo group + typed
await p.click('#edUndo');await p.click('#edUndo');await p.waitForTimeout(100);
ok((await p.textContent('#edName')).includes('changed')===false,'two undos return to unchanged: '+await p.textContent('#edName'));
// drag paint
await p.click('#brushes button:nth-child(3)');
const a=await p.locator(cell('K9s')).boundingBox(), c=await p.locator(cell('K6s')).boundingBox();
await p.mouse.move(a.x+a.width/2,a.y+a.height/2);await p.mouse.down();await p.mouse.move(c.x+c.width/2,c.y+c.height/2,{steps:6});await p.mouse.up();
const bd=await p.getAttribute('#brushes button[aria-pressed="true"]','data-b');
ok((await cls('K8s')).includes(bd)&&(await cls('K7s')).includes(bd),'drag paints K9s-K6s row');
await p.click('#edUndo');await p.waitForTimeout(100);
ok(!(await cls('K8s')).includes('cu'),'one undo reverts the whole drag');
// grading honours custom
await p.click('#edGroups [data-g="RFI"]'); await p.click('#edHeroes [data-h="BTN"]'); await p.keyboard.press('4');
await p.click(cell('AA')); // fold AA on BTN
const g=await p.evaluate(()=>__dp.eff(__dp.newSc('rfi','BTN')));
ok(await p.evaluate(()=>{ const sc=__dp.newSc('rfi','BTN'); return __dp.eff(sc)[__dp.idxOf('AA')]; })!=='R','custom AA fold on BTN is what grading uses');
// reload persistence
await p.reload(); await p.waitForTimeout(300); await p.click('#tab-ranges'); await p.click('#edGroups [data-g="RFI"]'); await p.click('#edHeroes [data-h="BTN"]');
ok((await cls('AA')).includes('cu'),'edit persists after reload');
// resets
await p.click('#resetOne'); await p.click('#resetOne'); ok(!(await cls('AA')).includes('cu'),'reset this chart');
await p.click('#edUndo'); ok((await cls('AA')).includes('cu'),'undo after reset restores edits');
// help
await p.click('#tab-help'); ok(await p.isVisible('#view-help'),'help visible');
await p.click('.toc a[href="#h-terms"]'); await p.waitForTimeout(200); ok(await p.isVisible('#view-help'),'toc link keeps help open');
ok((await p.evaluate(()=>document.querySelectorAll('#view-help dt').length))>35,'help has glossary');
ok(await p.evaluate(()=>document.documentElement.scrollWidth<=390),'help fits phone');
await p.click('#tab-ranges'); await p.click('a.hl'); await p.waitForTimeout(200); ok(await p.isVisible('#view-help'),'How editing works link opens help');
console.log(res.join('\n'));console.log('ERRORS',errs.length?errs:'none');await b.close();srv.close();})();
