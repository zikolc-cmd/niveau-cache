// Garde le jeu en mémoire sur le téléphone : après la première visite, il marche sans internet.
const CACHE = 'ziko-niveau-cache-v1';
const FICHIERS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(rep => {
    const copie = rep.clone(); caches.open(CACHE).then(c => c.put(e.request, copie)); return rep;
  }).catch(() => caches.match('./index.html'))));
});
