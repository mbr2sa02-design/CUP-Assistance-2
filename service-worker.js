const CACHE='cvc-v8-10';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./sync-config.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  /* never touch the online database calls: they must always be live */
  if(url.pathname.indexOf('/rest/v1/')!==-1||url.hostname.endsWith('.supabase.co'))return;
  const isPage=e.request.mode==='navigate'||url.pathname.endsWith('/')||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/sync-config.js');
  if(isPage){
    /* network first so a new upload is picked up; cached copy only when offline */
    const key=url.pathname.endsWith('/sync-config.js')?'./sync-config.js':'./index.html';
    e.respondWith(fetch(e.request.url,{cache:'no-cache'}).then(r=>{if(r&&r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(key,copy))}return r}).catch(()=>caches.match(key).then(h=>h||caches.match(e.request))));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error())));
});
