// Usage: node tests/chart-guide.js /absolute/path/to/repo
// The chart guide shows the original charts, and the same chart sets you made in the trainer.
const {chromium}=require('playwright'); const http=require('http'),fs=require('fs'),path=require('path');
(async()=>{const root=process.argv[2];
const srv=http.createServer((q,r)=>{ const f=q.url.split('?')[0].replace(/^\//,'')||'index.html'; try{ r.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}); r.end(fs.readFileSync(path.join(root,f))); }catch(e){ r.writeHead(404); r.end(); } });
await new Promise(r=>srv.listen(0,'127.0.0.1',r)); const URL='http://127.0.0.1:'+srv.address().port+'/';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:390,height:800}}); const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
const res=[]; const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m);
await p.goto(URL+'chart-guide.html'); await p.waitForTimeout(300);
ok(await p.evaluate(()=>!document.getElementById('live')&&!document.getElementById('nobluff')),'no live-read / skip-bluff toggles');
const all=await p.evaluate(()=>{ let bad=0,n=0; for(const h of POS){ S.hero=h; for(const a of ACTS){ S.act=a.id; if(!actOK(a.id)) continue; fix(); const vc=villainChoices(); for(const v of (vc.length?vc:[null])){ S.villain=v; fix(); const sp=spot(); n++; if(!sp.key||!DATA.charts[sp.key]||setChart(sp.key)!==DATA.charts[sp.key]) bad++; } } } return {n,bad}; });
ok(all.n===153&&all.bad===0,'all 153 spots show the original chart: '+JSON.stringify(all));
// the trainer's sets show up here
await p.goto(URL+'index.html'); await p.waitForTimeout(400);
await p.evaluate(()=>{ const x=__dp.sets.create('Shark table'); const idx=__dp.idxOf('AQs'); const arr=__dp.chart('RFI:UTG').split(''); arr[idx]='F'; x.edits['RFI:UTG']=arr.join(''); __dp.sets.switchTo(x.id); });
await p.goto(URL+'chart-guide.html'); await p.waitForTimeout(300);
ok(await p.evaluate(()=>[...document.querySelectorAll('#setPick option')].map(o=>o.textContent).join('|')==='Original (exploitative)|Shark table'),'the set picker lists the Original and your sets');
ok(await p.evaluate(()=>document.getElementById('setPick').value!=='original'),'it opens on the set you were playing');
const aq=await p.evaluate(()=>{ S.hero='UTG'; S.act='rfi'; fix(); render(); const i=HANDS.indexOf('AQs'); return [setChart('RFI:UTG')[i], DATA.charts['RFI:UTG'][i]]; });
ok(aq[0]==='F'&&aq[1]==='R','Shark table: AQs is a fold, the Original raises it');
await p.selectOption('#setPick','original'); await p.waitForTimeout(150);
ok(await p.evaluate(()=>{ const i=HANDS.indexOf('AQs'); return setChart('RFI:UTG')[i]==='R'; }),'switching to Original shows the original chart');
console.log(res.join('\n')); console.log('ERRORS',errs.length?errs:'none'); await b.close(); srv.close(); process.exit(res.some(r=>r.startsWith('FAIL'))||errs.length?1:0);})();
