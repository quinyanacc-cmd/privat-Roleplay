const CACHE_PREFIX = `roleplay:${self.registration.scope}:`;
const CACHE = `${CACHE_PREFIX}7.0.0-beta.2`;
const ASSETS = ["./", "./index.html", "./style.css", "./product.css", "./storage.js", "./app.js", "./product.js", "./manifest.webmanifest", "./privacy.html", "./logo.jpeg", "./icon-192.png", "./icon-512.png", "./icon-maskable.png", "./evening-header.jpg", "./mascot-wirt.jpeg", "./mascot-unternehmer.jpeg", "./mascot-muslim.jpeg", "./morning-header.jpg", "./header-tag.jpg", "./mascot-familie.jpeg", "./mascot-absolvent.jpeg", "./header-zuhause.jpg", "./header-daemmerung.jpg", "./mascot-ich.jpeg", "./mascot-vitalist.jpeg"];
const ASSET_URLS = new Set(ASSETS.map(path => new URL(path, self.registration.scope).href));
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener("message", event => {
  if (event.data?.type === "ACTIVATE_UPDATE") event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || !ASSET_URLS.has(event.request.url)) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(event.request);
    if (cached) return cached;
    const response = await fetch(event.request);
    if (response.ok && response.type === "basic") await cache.put(event.request, response.clone());
    return response;
  }));
});
