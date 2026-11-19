// Usage: node tests/cloud.js /absolute/path/to/repo
// Cloud sign-in and sync, tested against an in-memory stand-in for Firebase that is shared between "browsers" (browser contexts), like the real cloud.
const {chromium}=require('playwright'); const http=require('http'),fs=require('fs'),path=require('path');
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json'};
(async()=>{const root=process.argv[2];
const srv=http.createServer((q,r)=>{ const f=(q.url.split('?')[0].replace(/^\//,'')||'index.html'); try{ const b=fs.readFileSync(path.join(root,f)); r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'}); r.end(b);}catch(e){ r.writeHead(404); r.end('nf'); } });
await new Promise(r=>srv.listen(0,'127.0.0.1',r)); const URL='http://127.0.0.1:'+srv.address().port+'/index.html';
const b=await chromium.launch(); const res=[]; const ok=(c,m)=>res.push((c?'PASS ':'FAIL ')+m); const errs=[];

// ---- the shared "cloud": accounts and documents
const docs=new Map(); const accounts=new Map(); let uidN=0; let googleUser={uid:'g-1',email:'google@test.com'}; const fail={write:null,read:null};
const mkUser=(email)=>({uid:'u'+(++uidN),email});
async function ctxFor(){ const ctx=await b.newContext({viewport:{width:390,height:800}});
  await ctx.exposeFunction('__cloudGet',async uid=>{ if(fail.read) return {err:fail.read}; return {doc:docs.has(uid)?JSON.parse(JSON.stringify(docs.get(uid))):null}; });
  await ctx.exposeFunction('__cloudSet',async (uid,d)=>{ if(fail.write) return {err:fail.write}; docs.set(uid,JSON.parse(JSON.stringify(d))); return {}; });
  await ctx.exposeFunction('__authEmail',async (mode,email,pw)=>{ if(mode==='up'){ if(accounts.has(email)) return {err:'auth/email-already-in-use'}; const u=mkUser(email); accounts.set(email,{pw,user:u}); return {user:u}; }
      const a=accounts.get(email); if(!a||a.pw!==pw) return {err:'auth/invalid-credential'}; return {user:a.user}; });
  await ctx.exposeFunction('__authGoogle',async ()=>googleUser);
  await ctx.addInitScript(()=>{ window.__firebaseMock=(()=>{ const LS=localStorage; const L=[]; const cur=()=>JSON.parse(LS.getItem('__mockauth')||'null');
    const setCur=u=>{ if(u) LS.setItem('__mockauth',JSON.stringify(u)); else LS.removeItem('__mockauth'); L.forEach(f=>f(u)); };
    const thr=c=>{ const e=new Error(c); e.code=c; throw e; };
    return { onAuth(cb){ L.push(cb); setTimeout(()=>cb(cur()),0); return ()=>{}; },
      async signInGoogle(){ setCur(await window.__authGoogle()); },
      async signInEmail(e,p){ const r=await window.__authEmail('in',e,p); if(r.err) thr(r.err); setCur(r.user); },
      async signUpEmail(e,p){ const r=await window.__authEmail('up',e,p); if(r.err) thr(r.err); setCur(r.user); },
      async resetPassword(){}, async signOut(){ setCur(null); },
      getDoc:async uid=>{ const r=await window.__cloudGet(uid); if(r.err) thr(r.err); return r.doc; }, setDoc:async (uid,d)=>{ const r=await window.__cloudSet(uid,d); if(r.err) thr(r.err); } }; })(); });
  const p=await ctx.newPage(); p.on('pageerror',e=>errs.push(e.message)); return {ctx,p}; }
const go=async p=>{ await p.goto(URL); await p.waitForTimeout(400); };
const cloudSnap=uid=>docs.has(uid)?JSON.parse(docs.get(uid).json):null;
async function signIn(p,{email,pw='secret1',create=false}){ await p.click('#acctBtn'); await p.waitForSelector('#cEmail'); await p.fill('#cEmail',email); await p.fill('#cPass',pw); await p.click(create?'#cCreate':'#cSignIn'); }
const waitReload=async(p,fn)=>{ await Promise.all([p.waitForNavigation({timeout:8000}).catch(()=>{}),fn()]); await p.waitForTimeout(500); };
const makeSet=(p,name,hand='72o')=>p.evaluate(([n,h])=>{ const x=__dp.sets.create(n); const arr=__dp.chart('RFI:UTG').split(''); arr[__dp.idxOf(h)]='R'; x.edits['RFI:UTG']=arr.join(''); __dp.sets.switchTo(x.id); },[name,hand]);
const playHands=(p,n)=>p.evaluate(n=>{ for(let i=0;i<n;i++){ const sc=__dp.newSc('rfi','BTN'); } },n);
const bumpStats=p=>p.evaluate(()=>{ /* answer one hand through the UI path so stats are saved */ });
async function answerOne(p){ await p.click('#tab-play'); await p.waitForTimeout(150); await p.click('#actions .btn:not([disabled])'); await p.waitForTimeout(200); }

// ---------- 1. new account takes this device's charts and stats
let {ctx,p}=await ctxFor(); await go(p);
ok(await p.isVisible('#acctBtn')&&(await p.textContent('#acctBtn'))==='Sign in','guests see a Sign in button');
ok(!(await p.evaluate(()=>!!window.FishingCloud)),'guests never load the cloud module');
await makeSet(p,'Fish table'); await answerOne(p);
await waitReload(p,()=>signIn(p,{email:'a@test.com',create:true}));
ok(await p.evaluate(()=>__dp.sets.list().map(s=>s.name).join())==='Fish table','after creating an account the charts are still there');
const A=accounts.get('a@test.com').user;
ok(docs.has(A.uid)&&cloudSnap(A.uid).sets.some(s=>s.name==='Fish table'),'the new account document holds the device\'s chart set');
ok(cloudSnap(A.uid).stats.hands>=1,'and the stats');
ok((await p.textContent('#acctBtn'))==='Saved','the button says Saved');
ok(await p.evaluate(()=>Fishing.profile()==='u_'+FishingCloud.user().uid),'a signed-in player uses their own local profile');

// ---------- 2. autosave
await makeSet(p,'Shark table','AQs'); await p.waitForTimeout(2200);
ok(cloudSnap(A.uid).sets.map(s=>s.name).join()==='Fish table,Shark table','a change is saved to the account about a second later');
ok((await p.textContent('#acctBtn'))==='Saved','status is Saved again');
await p.evaluate(()=>{ __dp.sets.rename(__dp.sets.list()[0].id,'Fish table v2'); }); await p.waitForTimeout(2000);
ok(cloudSnap(A.uid).sets[0].name==='Fish table v2','renames sync too');

// ---------- 3. a second browser: empty device takes the account's data silently
const b2=await ctxFor(); await go(b2.p);
await waitReload(b2.p,()=>signIn(b2.p,{email:'a@test.com'}));
ok(await b2.p.evaluate(()=>__dp.sets.list().map(s=>s.name).join())==='Fish table v2,Shark table','a fresh browser signs in and sees the same chart sets');
ok(!(await b2.p.isVisible('#cloudModal')),'no question asked when this device has nothing');
ok(await b2.p.evaluate(()=>__dp.sets.active())===await p.evaluate(()=>__dp.sets.active()),'including the active set');

// ---------- 4. newer data from another device arrives when you come back to the tab
await makeSet(p,'Third table','KQo'); await p.waitForTimeout(2200);
await b2.p.evaluate(()=>{ Object.defineProperty(document,'hidden',{value:false,configurable:true}); document.dispatchEvent(new Event('visibilitychange')); }); await b2.p.waitForTimeout(800);
ok(await b2.p.evaluate(()=>__dp.sets.list().length)===3,'the other browser picks up the new set when you return to it');
ok(cloudSnap(A.uid).sets.length===3,'and the account was not overwritten by the refresh');

// ---------- 5. sign out: back to this device\'s own guest charts
const guestBefore=await p.evaluate(()=>{ const g=Fishing.guestProfile(); return localStorage.getItem('dp3:'+g+':sets'); });
await p.click('#acctBtn'); await p.waitForSelector('#cOut'); await waitReload(p,()=>p.click('#cOut'));
ok(await p.evaluate(()=>Fishing.profile()===Fishing.guestProfile()),'signing out returns to the guest profile');
ok(!(await p.evaluate(()=>__dp.sets.list().some(s=>s.name==='Third table'))),'the signed-in charts are not visible after signing out');
ok(cloudSnap(A.uid).sets.length===3,'the account keeps its data');
ok((await p.textContent('#acctBtn'))==='Sign in','the button is back to Sign in');

// ---------- 6. conflict: both have data
const seed=(email,sets,hands)=>{ const u=mkUser(email); accounts.set(email,{pw:'secret1',user:u}); const stats={hands,correct:hands,sizeN:0,sizeOk:0,streak:0,best:0,bySit:{},byPos:{},leaks:{loose:0,tight:0,passive:0,aggro:0,size:0},miss:[],oop:{q:{},hands:{flop:[0,0],stab:[0,0],turn:[0,0],hand:[0,0],outs:[0,0]},cats:{},streak:0,best:0}};
  docs.set(u.uid,{v:4,rev:'r0',updatedAt:Date.now()-3600e3,json:JSON.stringify({v:4,sets,activeSet:sets[0]?sets[0].id:'original',stats,settings:{sit:{},pos:[]}})}); return u; };
const cloudSet=(id,name)=>({id,name,edits:{},created:1,updated:1});
for(const choice of ['merge','cloud','local']){
  const email='c-'+choice+'@test.com'; const u=seed(email,[cloudSet('cs-'+choice,'Cloud set')],40);
  const c=await ctxFor(); await go(c.p); await makeSet(c.p,'Device set'); await answerOne(c.p); await answerOne(c.p);
  await c.p.click('#acctBtn'); await c.p.waitForSelector('#cEmail'); await c.p.fill('#cEmail',email); await c.p.fill('#cPass','secret1'); await c.p.click('#cSignIn');
  await c.p.waitForSelector('#cMerge',{timeout:5000});
  const txt=await c.p.textContent('#cloudBody');
  if(choice==='merge') ok(/This device/.test(txt)&&/Your account/.test(txt)&&/1 chart set/.test(txt)&&/40 hands/.test(txt),'conflict: asks, and shows what each side has');
  await waitReload(c.p,()=>c.p.click(choice==='merge'?'#cMerge':choice==='cloud'?'#cCloud':'#cLocal'));
  const names=await c.p.evaluate(()=>__dp.sets.list().map(s=>s.name).sort().join()); const hands=await c.p.evaluate(()=>__dp.sets.snapshot().stats.hands);
  const inCloud=cloudSnap(u.uid).sets.map(s=>s.name).sort().join();
  if(choice==='merge') ok(names==='Cloud set,Device set'&&inCloud===names&&hands===40,'merge keeps both chart sets and the stats with more hands (device '+names+', stats '+hands+')');
  if(choice==='cloud') ok(names==='Cloud set'&&inCloud==='Cloud set'&&hands===40,'use the account: device is replaced by the account data');
  if(choice==='local') ok(names==='Device set'&&inCloud==='Device set'&&hands<40&&hands>=1,'keep the device: the account is replaced by this device (stats '+hands+')');
  await c.ctx.close();
}
// cancel
{ const email='c-cancel@test.com'; seed(email,[cloudSet('cs-x','Cloud set')],10); const c=await ctxFor(); await go(c.p); await makeSet(c.p,'Device set');
  await c.p.click('#acctBtn'); await c.p.waitForSelector('#cEmail'); await c.p.fill('#cEmail',email); await c.p.fill('#cPass','secret1'); await c.p.click('#cSignIn'); await c.p.waitForSelector('#cCancel');
  await c.p.click('#cCancel'); await c.p.waitForTimeout(600);
  ok(await c.p.evaluate(()=>Fishing.profile()===Fishing.guestProfile()&&__dp.sets.list().map(s=>s.name).join()==='Device set'),'cancel leaves the device exactly as it was');
  ok((await c.p.textContent('#acctBtn'))==='Sign in','and signed out'); await c.ctx.close(); }

// ---------- 7. a different person on the same device
{ const c=await ctxFor(); await go(c.p); await makeSet(c.p,'Guest set');
  await waitReload(c.p,()=>signIn(c.p,{email:'p1@test.com',create:true})); await makeSet(c.p,'P1 only'); await c.p.waitForTimeout(2200);
  await c.p.click('#acctBtn'); await c.p.waitForSelector('#cOut'); await waitReload(c.p,()=>c.p.click('#cOut'));
  ok(await c.p.evaluate(()=>__dp.sets.list().map(s=>s.name).join())==='Guest set','after sign-out the device shows only its guest charts, not the last person\'s');
  await waitReload(c.p,()=>signIn(c.p,{email:'p2@test.com',create:true}));
  ok(!(await c.p.evaluate(()=>__dp.sets.list().some(s=>s.name==='P1 only'))),'a second person signing in never sees the first person\'s charts');
  await c.ctx.close(); }

// ---------- 8. errors and offline
{ const c=await ctxFor(); await go(c.p);
  await c.p.click('#acctBtn'); await c.p.waitForSelector('#cEmail'); await c.p.fill('#cEmail','nobody@test.com'); await c.p.fill('#cPass','whatever1'); await c.p.click('#cSignIn'); await c.p.waitForTimeout(400);
  ok(/do not match/.test(await c.p.textContent('#cMsg')),'wrong password gives a plain message');
  await c.p.fill('#cEmail','a@test.com'); await c.p.fill('#cPass','x'); await c.p.click('#cCreate'); await c.p.waitForTimeout(300);
  ok(/at least 6/.test(await c.p.textContent('#cMsg')),'a short password is caught before asking the server');
  await c.p.fill('#cPass','secret1'); await c.p.click('#cCreate'); await c.p.waitForTimeout(400);
  ok(/already an account/.test(await c.p.textContent('#cMsg')),'an existing email says so');
  googleUser={uid:'g-77',email:'g@test.com'};
  await waitReload(c.p,()=>c.p.click('#cGoogle'));
  ok(await c.p.evaluate(()=>Fishing.profile()==='u_g-77'),'Google sign-in works too');
  // offline: write fails with "unavailable", data stays dirty, then saves when back
  fail.write='unavailable'; await makeSet(c.p,'Offline set'); await c.p.waitForTimeout(2200);
  ok((await c.p.textContent('#acctBtn'))==='Offline','when saving fails the button says Offline');
  ok(await c.p.evaluate(()=>JSON.parse(localStorage.getItem('dp3:'+Fishing.profile()+':sync')||'{}').dirty===true),'the unsaved change is remembered');
  ok(await c.p.evaluate(()=>__dp.sets.list().some(s=>s.name==='Offline set')),'and kept on the device');
  fail.write=null; await c.p.evaluate(()=>window.dispatchEvent(new Event('online'))); await c.p.waitForTimeout(1500);
  ok(cloudSnap('g-77').sets.some(s=>s.name==='Offline set')&&(await c.p.textContent('#acctBtn'))==='Saved','it saves when the connection is back');
  fail.write='permission-denied'; await makeSet(c.p,'Denied set'); await c.p.waitForTimeout(2200);
  ok((await c.p.textContent('#acctBtn'))==='Not saved','a database refusal shows Not saved');
  fail.write=null; await c.ctx.close(); }

console.log(res.join('\n')); console.log('ERRORS',errs.length?errs:'none'); await b.close(); srv.close(); process.exit(res.some(r=>r.startsWith('FAIL'))||errs.length?1:0);})();
