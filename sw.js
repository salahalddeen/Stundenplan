/* Service Worker: App offline verfügbar, Updates im Hintergrund. Version: 4f3e05582f */
const CACHE = 'spo-4f3e05582f';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' })))));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('spo-') && k !== CACHE && k !== 'spo-fonts').map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', (e) => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Konto/Abgleich (Firebase) nie zwischenspeichern
  if (/(^|\.)(googleapis\.com|firebaseapp\.com)$/.test(url.hostname) && url.hostname !== 'fonts.googleapis.com') return;
  // Schriften: einmal laden, dann offline aus dem Speicher
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open('spo-fonts').then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => { c.put(req, res.clone()); return res; }).catch(() => hit))));
    return;
  }
  if (url.origin !== self.location.origin) return;
  // Zugangsdaten-Datei immer frisch versuchen (falls sie geändert wurde), offline aus dem Speicher
  if (url.pathname.endsWith('/config.js')) {
    e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; }).catch(() => caches.match(req)));
    return;
  }
  // App selbst: aus dem Speicher (schnell, offline) – neue Versionen kommen über das Update
  e.respondWith(caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then((hit) => hit || (req.mode === 'navigate' ? caches.match('index.html') : null)).then((hit) => hit || fetch(req)));
});
