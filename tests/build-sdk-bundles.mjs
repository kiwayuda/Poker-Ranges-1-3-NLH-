// Builds browser bundles of the real Firebase SDK so tests/cloud-sdk.js can run without the CDN.
// In an empty folder:  npm init -y && npm i firebase@10.14.1 esbuild && cp <repo>/tests/build-sdk-bundles.mjs . && node build-sdk-bundles.mjs
// Then:  node tests/cloud-sdk.js "$PWD" <that folder>/out
import {build} from 'esbuild'; import fs from 'fs';
const APP='https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
const mk=async(name,entry,external)=>{ fs.writeFileSync('entry-'+name+'.js',entry); await build({entryPoints:['entry-'+name+'.js'],bundle:true,format:'esm',platform:'browser',outfile:'out/firebase-'+name+'.js',external,logLevel:'error',minify:false,mainFields:['browser','module','main']});
  let t=fs.readFileSync('out/firebase-'+name+'.js','utf8'); t=t.replace(/(["'])@firebase\/app\1/g,'"'+APP+'"'); fs.writeFileSync('out/firebase-'+name+'.js',t); };
await mk('app',"export * from 'firebase/app';",[]);
await mk('auth',"export * from 'firebase/auth';",['@firebase/app']);
await mk('firestore',"export * from 'firebase/firestore';",['@firebase/app']);
console.log(fs.readdirSync('out').map(f=>f+' '+fs.statSync('out/'+f).size).join('\n'));
