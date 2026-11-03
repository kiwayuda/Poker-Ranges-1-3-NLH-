const {chromium}=require('playwright'); const http=require('http'), fs=require('fs');
(async()=>{
 const html=fs.readFileSync(process.argv[2]); const OUT=process.argv[3];
 const srv=http.createServer((q,r)=>{ r.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}); r.end(html); }); await new Promise(r=>srv.listen(0,'127.0.0.1',r));
 const URL=`http://127.0.0.1:${srv.address().port}/`; const b=await chromium.launch(); const errs=[], res=[]; const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m);
 const ctx=await b.newContext(); const p=await ctx.newPage(); await p.setViewportSize({width:390,height:844});
 p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push('console '+m.text()); });
 await p.goto(URL); await p.waitForTimeout(400);
 ok(!(await p.$('#profileBtn')) && !(await p.$('#lock')) && !(await p.$('#profilePanel')), 'no profile button, PIN screen or profile panel');
 await p.keyboard.press('f'); await p.waitForTimeout(150); ok(!(await p.isHidden('#feedback')), 'preflop: answering works'); await p.keyboard.press('Space'); await p.waitForTimeout(150);
 ok(await p.isHidden('#feedback'), 'preflop: Space deals the next hand');
 await p.click('#tab-postflop'); await p.waitForTimeout(300);
 ok(await p.getAttribute('#oopw-speed','aria-pressed')==='true', 'timed walkthrough is the default');
 const expected={flop:/Wet or dry/, stab:/Small or big stab/, turn:/flop stab: small or big/};
 for(const m of ['flop','stab','turn']){
   await p.click('#oopm-'+m); await p.waitForTimeout(150);
   ok(expected[m].test(await p.textContent('#oop-qs')), `${m}: first timed question is the live-table one`);
   const t1=await p.textContent('#oop-clock'); await p.waitForTimeout(700); const t2=await p.textContent('#oop-clock');
   ok(parseFloat(t2)>parseFloat(t1), `${m}: clock is running (${t1} → ${t2})`);
   const asked=[]; let g=0; while(g++<8){ const cur=await p.$('#oop-qs .oq.cur'); if(!cur) break; asked.push((await cur.$eval('.oqq',e=>e.textContent)).replace(/^\d+/,'').trim()); await p.keyboard.press('1'); await p.waitForTimeout(120); }
   ok(!asked.some(x=>/What kind of hand/.test(x)) && asked.length<=4, `${m}: timed mode asks ${asked.length} questions: ${asked.join(' | ')}`);
   const tl=await p.textContent('#oop-feedback .timeline'); ok(/\d+\.\ds/.test(tl), `${m}: result shows your time: "${tl.trim().slice(0,70)}"`);
   const c1=await p.textContent('#oop-clock'); await p.waitForTimeout(400); ok(c1===await p.textContent('#oop-clock'), `${m}: clock stops when you finish`);
   ok((await p.$$('#oop-qs .oqres .qt')).length===asked.length, `${m}: each answer shows its own time`);
   if(m==='flop') await p.screenshot({path:OUT+'/timer-flop.png',fullPage:true});
   await p.keyboard.press('Space'); await p.waitForTimeout(150);
 }
 ok((await p.textContent('#oop-avgt'))!=='–', 'HUD shows average time');
 await p.click('#oopw-full'); await p.waitForTimeout(150); let fq=[]; let g=0; while(g++<8){ const cur=await p.$('#oop-qs .oq.cur'); if(!cur) break; fq.push(await cur.$eval('.oqq',e=>e.textContent)); await p.keyboard.press('1'); await p.waitForTimeout(100); }
 ok(fq.some(x=>/What kind of hand/.test(x)), 'full walkthrough still asks hand type');
 await p.click('#tab-stats'); await p.waitForTimeout(200);
 ok(/Decision speed/.test(await p.textContent('#t-oopt')) && /Per question/.test(await p.textContent('#t-oopt')), 'Stats tab shows decision speed overall and per question');
 await p.screenshot({path:OUT+'/timer-stats.png',fullPage:true});
 await p.reload(); await p.waitForTimeout(400); await p.click('#tab-stats'); await p.waitForTimeout(150);
 ok(/Decision speed/.test(await p.textContent('#t-oopt')) && (await p.textContent('#s-hands'))!=='0', 'stats survive a reload (saved in the browser)');
 await p.click('#resetStats'); await p.click('#resetStats'); await p.waitForTimeout(200);
 ok(/Play a few postflop hands/.test(await p.textContent('#t-oopt')) && (await p.textContent('#s-hands'))==='0', 'Clear stats resets preflop and postflop, including times');
 ok(await p.evaluate(()=>document.documentElement.scrollWidth)<=390, 'fits the phone width');
 res.forEach(x=>console.log(x)); console.log('ERRORS',errs.length?errs:'none'); await b.close(); srv.close();
})();
