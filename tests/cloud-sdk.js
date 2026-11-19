// Usage: node tests/cloud-sdk.js /absolute/path/to/repo /absolute/path/to/dir-with-firebase-bundles
// Runs the REAL Firebase SDK code path (initializeApp, getAuth, getFirestore, sign-in calls) with the SDK files served locally instead of
// from the CDN. There is no network, so it checks that the SDK loads and initialises, that the sign-in modal works, and that the
// SDK's real "no connection" error is turned into a plain message. (Build the bundles with the esbuild script described in the README.)
const {chromium}=require('playwright'); const http=require('http'),fs=require('fs'),path=require('path');
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8'};
(async()=>{const root=process.argv[2], bundles=process.argv[3];
const srv=http.createServer((q,r)=>{ const f=(q.url.split('?')[0].replace(/^\//,'')||'index.html'); try{ const b=fs.readFileSync(path.join(root,f)); r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/plain'}); r.end(b);}catch(e){ r.writeHead(404); r.end(); } });
await new Promise(r=>srv.listen(0,'127.0.0.1',r)); const URL='http://127.0.0.1:'+srv.address().port+'/index.html';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:390,height:800}}); const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
const res=[]; const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m); const hits=[];
await ctx.route('https://www.gstatic.com/firebasejs/10.14.1/*',route=>{ const f=route.request().url().split('/').pop(); hits.push(f); const file=path.join(bundles,f);
  if(fs.existsSync(file)) route.fulfill({status:200,contentType:'text/javascript',headers:{'access-control-allow-origin':'*'},body:fs.readFileSync(file)}); else route.fulfill({status:404,body:''}); });
// everything else on the internet is unreachable here, like the sandbox
await ctx.route(/^https:\/\/(?!www\.gstatic\.com\/firebasejs)/,route=>route.abort('internetdisconnected'));
await p.goto(URL); await p.waitForTimeout(500);
await p.click('#acctBtn'); await p.waitForSelector('#cEmail',{timeout:15000});
ok(hits.includes('firebase-app.js')&&hits.includes('firebase-auth.js')&&hits.includes('firebase-firestore.js'),'the three Firebase SDK files are requested: '+[...new Set(hits)].join(', '));
ok(await p.evaluate(()=>window.FishingCloud&&window.FishingCloud.status()==='guest'),'the real SDK initialised and reports nobody signed in');
ok(await p.isVisible('#cGoogle')&&await p.isVisible('#cSignIn')&&await p.isVisible('#cCreate'),'the sign-in screen shows Google, Sign in and Create account');
await p.fill('#cEmail','someone@example.com'); await p.fill('#cPass','secret1'); await p.click('#cSignIn'); await p.waitForTimeout(2500);
const msg=await p.textContent('#cMsg'); ok(/connection|internet|wrong|went wrong|network/i.test(msg),'the real SDK error becomes a plain message: "'+msg+'"');
await p.fill('#cPass','x'); await p.click('#cCreate'); await p.waitForTimeout(300);
ok(/at least 6/.test(await p.textContent('#cMsg')),'a short password is caught before any request');
ok(!(await p.evaluate(()=>document.querySelector('.cmodal').hidden)),'the sign-in screen stays open after an error');
await p.click('#cClose'); ok(await p.evaluate(()=>document.querySelector('.cmodal').hidden),'it closes');
ok(await p.evaluate(()=>Fishing.profile()===Fishing.guestProfile()),'nothing changed on the device');
console.log(res.join('\n')); console.log('ERRORS',errs.length?errs:'none'); await b.close(); srv.close(); process.exit(res.some(r=>r.startsWith('FAIL'))||errs.length?1:0);})();
