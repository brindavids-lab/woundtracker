// Offline support. Raise VERSION when you upload a new copy of the app.
const VERSION = "wrt-v11";
const SHELL = ["./", "index.html", "jspdf.umd.min.js", "icd10.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];
// Fetch fresh copies on install, so a new version never stores an old page from the browser cache.
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, {cache: "reload"})))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const keep = res => { if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); } return res; };
  // The page itself: newest copy when online, saved copy when offline.
  if (e.request.mode === "navigate") { e.respondWith(fetch(e.request, {cache: "no-cache"}).then(keep).catch(() => caches.match(e.request, {ignoreSearch: true}).then(hit => hit || caches.match("index.html")))); return; }
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(hit => { const net = fetch(e.request).then(keep).catch(() => hit); return hit || net; }));
});
