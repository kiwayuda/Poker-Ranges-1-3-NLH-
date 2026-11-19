// Cloud sign-in and sync for Exploit Poker Lab (Firebase Auth + Firestore).
// Loaded on demand (when someone taps "Sign in", or when a signed-in player returns), so guests never download the Firebase SDK.
//
// What is stored: one Firestore document per player at users/{uid}:
//   { v: 4, rev: "<random id of the last write>", updatedAt: <ms>, json: "<the player's snapshot as a JSON string>" }
// The snapshot is { v:4, sets:[...chart sets], activeSet, stats, settings } (see userSnapshot() in index.html).
//
// How it behaves:
//  - Every player has a separate local copy on the device (profile "u_<uid>"), so signing out on a shared device never leaks charts to the next person.
//  - First sign-in on a device: if the account has no data, this device's data is uploaded. If this device is empty, the account's data is loaded.
//    If both have data, the player chooses: merge (default), use the account's data, or keep this device's data.
//  - After that every change is saved to the account about a second later. Coming back to the tab loads newer data saved from another device.
import { firebaseConfig } from './firebase-config.js';

const SDK = 'https://www.gstatic.com/firebasejs/10.14.1/';
const SAVE_DELAY_MS = 1200;
const MAX_JSON = 900000;   // a Firestore document is limited to 1 MiB

/* ---------------------------------------------------------------------------------------------- pure helpers */
const clone = x => JSON.parse(JSON.stringify(x));
export function handsOf(s){
  const st = (s && s.stats) || {}, oop = st.oop || {};
  const o = oop.hands ? Object.values(oop.hands).reduce((a, x) => a + ((x && x[0]) || 0), 0) : 0;
  return (st.hands || 0) + o;
}
export function isPristine(s){ return !s || (!(s.sets && s.sets.length) && handsOf(s) === 0); }
/* Merge two snapshots: every chart set from both (the newer copy wins when the same set is on both), stats from whichever has more hands,
   settings and the active set from the account. Set names stay unique. */
export function mergeSnapshots(local, cloud){
  const sets = clone(cloud.sets || []);
  for (const x of clone(local.sets || [])) {
    const i = sets.findIndex(y => y.id === x.id);
    if (i < 0) sets.push(x); else if ((x.updated || 0) > (sets[i].updated || 0)) sets[i] = x;
  }
  const seen = new Set();
  sets.forEach(x => { let n = x.name, k = 2; while (seen.has(n.toLowerCase())) n = x.name + ' ' + (k++); x.name = n; seen.add(n.toLowerCase()); });
  const valid = id => id === 'original' || sets.some(x => x.id === id);
  const active = valid(cloud.activeSet) ? cloud.activeSet : valid(local.activeSet) ? local.activeSet : 'original';
  return { v: 4, sets, activeSet: active, stats: clone(handsOf(local) > handsOf(cloud) ? local.stats : (cloud.stats || local.stats)), settings: clone(cloud.settings || local.settings) };
}
export function friendlyError(e){
  const c = (e && e.code) || '';
  const map = {
    'auth/invalid-credential': 'That email and password do not match.',
    'auth/wrong-password': 'That email and password do not match.',
    'auth/user-not-found': 'That email and password do not match.',
    'auth/invalid-email': 'That email address does not look right.',
    'auth/email-already-in-use': 'There is already an account with that email. Try Sign in.',
    'auth/weak-password': 'Use a password with at least 6 characters.',
    'auth/missing-password': 'Enter your password.',
    'auth/too-many-requests': 'Too many tries. Wait a minute and try again.',
    'auth/network-request-failed': 'No connection. Check your internet and try again.',
    'auth/popup-closed-by-user': 'The Google window was closed before you finished.',
    'auth/cancelled-popup-request': 'The Google window was closed before you finished.',
    'auth/popup-blocked': 'Your browser blocked the Google window. Allow pop-ups for this site, or use email.',
    'auth/operation-not-allowed': 'That sign-in method is not turned on in Firebase yet (Authentication, Sign-in method).',
    'auth/unauthorized-domain': 'This site address is not in Firebase Authentication, Settings, Authorized domains.',
    'permission-denied': 'The database refused the request. Check the Firestore rules.',
    'unavailable': 'No connection to the database. Your changes are kept on this device.'
  };
  return map[c] || map[c.replace(/^firestore\//, '')] || ((e && e.message) ? e.message : 'Something went wrong. Try again.');
}

/* ---------------------------------------------------------------------------------------------- Firebase adapter */
// The rest of this file only talks to this small interface, so it can be tested with an in-memory stand-in (window.__firebaseMock).
async function makeAdapter(){
  if (window.__firebaseMock) return window.__firebaseMock;
  const [{ initializeApp }, A, F] = await Promise.all([import(SDK + 'firebase-app.js'), import(SDK + 'firebase-auth.js'), import(SDK + 'firebase-firestore.js')]);
  const app = initializeApp(firebaseConfig), auth = A.getAuth(app), db = F.getFirestore(app);
  const who = u => u ? { uid: u.uid, email: u.email || '', name: u.displayName || '' } : null;
  return {
    onAuth: cb => A.onAuthStateChanged(auth, u => cb(who(u))),
    signInGoogle: () => A.signInWithPopup(auth, new A.GoogleAuthProvider()),
    signInEmail: (e, p) => A.signInWithEmailAndPassword(auth, e, p),
    signUpEmail: (e, p) => A.createUserWithEmailAndPassword(auth, e, p),
    resetPassword: e => A.sendPasswordResetEmail(auth, e),
    signOut: () => A.signOut(auth),
    getDoc: async uid => { const s = await F.getDoc(F.doc(db, 'users', uid)); return s.exists() ? s.data() : null; },
    setDoc: (uid, data) => F.setDoc(F.doc(db, 'users', uid), data)
  };
}

/* ---------------------------------------------------------------------------------------------- state */
let host = null, fb = null, started = false, modal = null, modalKind = null;
let state = { user: null, status: 'guest', msg: '' };       // status: guest | syncing | saved | offline | error
let timer = null, writing = false, writeAgain = false, applyingRemote = false, listening = false;
const profileMetaKey = () => 'dp3:' + host.profile() + ':sync';
const loadMeta = () => { try { return JSON.parse(localStorage.getItem(profileMetaKey()) || '{}') || {}; } catch (e) { return {}; } };
const saveMeta = m => { try { localStorage.setItem(profileMetaKey(), JSON.stringify(m)); } catch (e) {} };
const newRev = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function setStatus(status, msg){ state.status = status; state.msg = msg || ''; renderButton(); if (modal && modalKind === 'account') showAccount(); }

/* ---------------------------------------------------------------------------------------------- the small button in the header */
function renderButton(){
  const b = document.getElementById('acctBtn'); if (!b) return;
  const label = { guest: 'Sign in', syncing: 'Saving…', saved: 'Saved', offline: 'Offline', error: 'Not saved' }[state.status] || 'Sign in';
  b.textContent = label; b.dataset.state = state.status;
  b.title = state.user ? ('Signed in as ' + state.user.email) : 'Sign in to keep your charts and stats on every device';
}

/* ---------------------------------------------------------------------------------------------- modal */
function ensureModal(){
  if (modal) return modal;
  modal = document.createElement('div'); modal.className = 'cmodal'; modal.hidden = true; modal.id = 'cloudModal';
  modal.innerHTML = '<div class="cbox glass" role="dialog" aria-modal="true" aria-labelledby="cloudTitle"><div id="cloudBody"></div></div>';
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal && modalKind !== 'conflict') closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden && modalKind !== 'conflict') closeModal(); });
  return modal;
}
function openModal(kind){ ensureModal(); modalKind = kind; modal.hidden = false; }
function closeModal(){ if (modal) { modal.hidden = true; modalKind = null; } }
const body = () => document.getElementById('cloudBody');

function showSignIn(note){
  openModal('signin');
  body().innerHTML = `
    <button class="cclose" id="cClose" aria-label="Close">×</button>
    <h2 id="cloudTitle">Sign in</h2>
    <p class="cnote">Keep your chart sets and stats on every device. Signing in does not change anything you have on this device.</p>
    <button class="cbtn google" id="cGoogle" type="button"><span class="gmark" aria-hidden="true">G</span> Continue with Google</button>
    <div class="cor"><span>or use email</span></div>
    <form id="cForm" autocomplete="on">
      <input id="cEmail" type="email" inputmode="email" autocomplete="email" placeholder="Email" aria-label="Email" required>
      <input id="cPass" type="password" autocomplete="current-password" placeholder="Password (6+ characters)" aria-label="Password" minlength="6">
      <div class="crow"><button class="cbtn primary" id="cSignIn" type="submit">Sign in</button><button class="cbtn" id="cCreate" type="button">Create account</button></div>
      <button class="clink" id="cForgot" type="button">Forgot password?</button>
    </form>
    <p class="cmsg" id="cMsg" role="status">${esc(note || '')}</p>`;
  const msg = (t, ok) => { const m = document.getElementById('cMsg'); m.textContent = t; m.className = 'cmsg' + (ok ? ' ok' : t ? ' bad' : ''); };
  const busy = on => body().querySelectorAll('button,input').forEach(x => { if (x.id !== 'cClose') x.disabled = on; });
  const run = async fn => { msg(''); busy(true); try { await fn(); } catch (e) { msg(friendlyError(e)); } finally { if (modalKind === 'signin') busy(false); } };
  document.getElementById('cClose').onclick = closeModal;
  document.getElementById('cGoogle').onclick = () => run(() => fb.signInGoogle());
  document.getElementById('cForm').onsubmit = e => { e.preventDefault(); const em = val('cEmail'), pw = val('cPass'); run(() => fb.signInEmail(em, pw)); };
  document.getElementById('cCreate').onclick = () => { const em = val('cEmail'), pw = val('cPass'); if (!em || pw.length < 6) return msg('Enter your email and a password of at least 6 characters, then tap Create account.'); run(() => fb.signUpEmail(em, pw)); };
  document.getElementById('cForgot').onclick = () => { const em = val('cEmail'); if (!em) return msg('Type your email above first.'); run(async () => { await fb.resetPassword(em); msg('If that email has an account, a reset link is on its way.', true); }); };
  function val(id){ return document.getElementById(id).value.trim(); }
}

function showBusy(text){
  openModal('busy');
  body().innerHTML = `<h2 id="cloudTitle">One moment</h2><p class="cnote">${esc(text)}</p>`;
}

function showAccount(){
  openModal('account');
  const u = state.user || {};
  const status = { syncing: 'Saving…', saved: 'Everything is saved to your account.', offline: 'You are offline. Changes are kept on this device and will save when you are back online.', error: state.msg || 'The last save did not go through. It will retry.' }[state.status] || '';
  body().innerHTML = `
    <button class="cclose" id="cClose" aria-label="Close">×</button>
    <h2 id="cloudTitle">Your account</h2>
    <p class="cwho">${esc(u.email || u.name || '')}</p>
    <p class="cnote">${esc(status)}</p>
    <div class="crow"><button class="cbtn" id="cSync" type="button">Save now</button><button class="cbtn warn" id="cOut" type="button">Sign out</button></div>
    <p class="cnote small">Signing out switches this device back to its own guest charts. Your account keeps everything you saved.</p>`;
  document.getElementById('cClose').onclick = closeModal;
  document.getElementById('cSync').onclick = () => { const m = loadMeta(); m.dirty = true; saveMeta(m); flush(); };
  document.getElementById('cOut').onclick = signOutNow;
}

function askConflict(local, cloud, user, when){
  return new Promise(resolve => {
    openModal('conflict');
    const sum = (s, extra) => `${(s.sets || []).length} chart set${(s.sets || []).length === 1 ? '' : 's'}, ${handsOf(s)} hand${handsOf(s) === 1 ? '' : 's'} played${extra || ''}`;
    body().innerHTML = `
      <h2 id="cloudTitle">Two copies of your data</h2>
      <p class="cnote">This device and the account <b>${esc(user.email || '')}</b> both have saved data. What should we keep?</p>
      <div class="ccmp"><div><b>This device</b><span>${esc(sum(local))}</span></div><div><b>Your account</b><span>${esc(sum(cloud, when ? ', last saved ' + when : ''))}</span></div></div>
      <button class="cbtn primary block" id="cMerge" type="button">Merge both (recommended)<small>All chart sets from both. Stats from whichever has more hands.</small></button>
      <button class="cbtn block" id="cCloud" type="button">Use my account's data<small>Replace what is on this device.</small></button>
      <button class="cbtn block" id="cLocal" type="button">Keep this device's data<small>Replace what is in the account.</small></button>
      <button class="clink" id="cCancel" type="button">Cancel and sign out</button>`;
    const done = v => { closeModal(); resolve(v); };
    document.getElementById('cMerge').onclick = () => done('merge');
    document.getElementById('cCloud').onclick = () => done('cloud');
    document.getElementById('cLocal').onclick = () => done('local');
    document.getElementById('cCancel').onclick = () => done(null);
  });
}

/* ---------------------------------------------------------------------------------------------- reading and writing the account document */
async function readCloud(uid){
  const d = await fb.getDoc(uid); if (!d) return null;
  let snap = null; try { snap = JSON.parse(d.json); } catch (e) { throw new Error('The saved data in your account could not be read.'); }
  if (!snap || typeof snap !== 'object') throw new Error('The saved data in your account could not be read.');
  return { snap, rev: d.rev || '', updatedAt: d.updatedAt || 0 };
}
async function writeCloud(uid, snap){
  const json = JSON.stringify(snap);
  if (json.length > MAX_JSON) { const e = new Error('There is too much data to save to your account (over 900 KB). Delete some chart sets.'); e.tooBig = true; throw e; }
  const rev = newRev();
  await fb.setDoc(uid, { v: 4, rev, updatedAt: Date.now(), json });
  return rev;
}
const ago = t => { if (!t) return ''; const m = Math.round((Date.now() - t) / 60000); return m < 1 ? 'just now' : m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' h ago' : Math.round(m / 1440) + ' d ago'; };

/* ---------------------------------------------------------------------------------------------- sign-in flow */
async function handleAuth(user){
  if (!user) {
    state.user = null; setStatus('guest'); detach();
    if (host.profile().startsWith('u_')) {            // the sign-in ended (signed out elsewhere, expired): go back to this device's guest charts
      let bounced = false; try { bounced = sessionStorage.getItem('fishing:bounce') === '1'; sessionStorage.setItem('fishing:bounce', '1'); } catch (e) {}
      if (!bounced) { host.useProfile(host.guestProfile()); location.reload(); }
    }
    return;
  }
  try { sessionStorage.removeItem('fishing:bounce'); } catch (e) {}
  state.user = user; setStatus('syncing');
  const mine = 'u_' + user.uid;
  if (host.profile() !== mine) { if (modalKind === 'signin') showBusy('Signed in. Checking your saved data…'); return reconcileAndSwitch(user, mine); }
  closeModalIf('signin'); await startSync(user);
}
function closeModalIf(kind){ if (modal && modalKind === kind) closeModal(); }

async function reconcileAndSwitch(user, mine){
  const local = host.profile().startsWith('u_') ? null : host.snapshot();   // never carry another player's data across
  let cloud = null;
  try { cloud = await readCloud(user.uid); }
  catch (e) { setStatus('error', friendlyError(e)); showSignIn(friendlyError(e)); try { await fb.signOut(); } catch (x) {} return; }
  let result;
  if (!cloud) result = local || host.emptySnapshot();                         // a new account takes this device's charts and stats
  else if (isPristine(local)) result = cloud.snap;                            // nothing here yet: take the account's data
  else {
    const choice = await askConflict(local, cloud.snap, user, ago(cloud.updatedAt));
    if (!choice) { try { await fb.signOut(); } catch (e) {} setStatus('guest'); return; }
    result = choice === 'cloud' ? cloud.snap : choice === 'local' ? local : mergeSnapshots(local, cloud.snap);
  }
  let rev = cloud ? cloud.rev : '';
  if (!cloud || result !== cloud.snap) {
    try { rev = await writeCloud(user.uid, result); }
    catch (e) { setStatus('error', friendlyError(e)); showSignIn(friendlyError(e)); try { await fb.signOut(); } catch (x) {} return; }
  }
  host.writeProfile(mine, result);
  try { localStorage.setItem('dp3:' + mine + ':sync', JSON.stringify({ rev, dirty: false })); } catch (e) {}
  host.useProfile(mine);
  location.reload();
}

async function signOutNow(){
  try { await fb.signOut(); } catch (e) {}
  state.user = null; detach(); closeModal();
  host.useProfile(host.guestProfile()); location.reload();
}

/* ---------------------------------------------------------------------------------------------- autosave */
function attach(){
  if (listening) return; listening = true;
  window.addEventListener('fishing:saved', onSaved);
  window.addEventListener('online', onOnline);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', flushNow);
}
function detach(){
  if (!listening) return; listening = false;
  window.removeEventListener('fishing:saved', onSaved); window.removeEventListener('online', onOnline);
  document.removeEventListener('visibilitychange', onVisibility); window.removeEventListener('pagehide', flushNow);
  clearTimeout(timer);
}
function onSaved(){
  if (applyingRemote || !state.user) return;
  const m = loadMeta(); m.dirty = true; saveMeta(m);
  setStatus('syncing'); clearTimeout(timer); timer = setTimeout(flush, SAVE_DELAY_MS);
}
function onOnline(){ refresh(false); }
function onVisibility(){ if (document.hidden) flushNow(); else refresh(false); }
function flushNow(){ clearTimeout(timer); if (loadMeta().dirty) flush(); }

async function flush(){
  if (!state.user) return;
  if (writing) { writeAgain = true; return; }
  writing = true;
  try {
    do {
      writeAgain = false;
      const rev = await writeCloud(state.user.uid, host.snapshot());
      const m = loadMeta(); m.rev = rev; m.dirty = writeAgain ? true : false; saveMeta(m);
    } while (writeAgain);
    setStatus('saved');
  } catch (e) {
    const offline = !navigator.onLine || (e && (e.code === 'unavailable' || e.code === 'auth/network-request-failed'));
    setStatus(offline ? 'offline' : 'error', offline ? '' : friendlyError(e));
  } finally { writing = false; }
}

/* Bring in newer data saved from another device (only when this device has nothing unsaved); then save anything pending. */
async function refresh(force){
  if (!state.user) return;
  const m = loadMeta();
  if (m.dirty) { await flush(); return; }
  try {
    setStatus('syncing');
    const cloud = await readCloud(state.user.uid);
    if (!cloud) { await flush(); return; }
    if (cloud.rev && cloud.rev !== m.rev) {
      applyingRemote = true;
      try { host.apply(cloud.snap); } finally { applyingRemote = false; }
      saveMeta({ rev: cloud.rev, dirty: false });
    }
    setStatus('saved');
  } catch (e) {
    const offline = !navigator.onLine || (e && (e.code === 'unavailable' || e.code === 'auth/network-request-failed'));
    setStatus(offline ? 'offline' : 'error', offline ? '' : friendlyError(e));
  }
}
async function startSync(user){
  attach();
  const m = loadMeta();
  if (m.dirty) await flush(); else await refresh(false);
}

/* ---------------------------------------------------------------------------------------------- public */
export async function init(hostApi){
  if (started) return; started = true; host = hostApi;
  window.FishingCloud = { status: () => state.status, user: () => state.user, flush: () => flush(), refresh: () => refresh(true), mergeSnapshots, isPristine };
  try { fb = await makeAdapter(); }
  catch (e) { started = false; setStatus('offline'); window.addEventListener('online', () => init(hostApi), { once: true }); return; }
  fb.onAuth(handleAuth);
}
export function openPanel(){
  if (!fb) return;
  if (state.user) showAccount(); else showSignIn();
}
export function status(){ return state.status; }
