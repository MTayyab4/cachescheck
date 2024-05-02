const cacheName = 'v1';
const cacheAssets = [
'index.html',
'style.css',
'main.js'
];

self.addEventListener('install', e => {
console.log('Service Worker: Installed');
e.waitUntil(
caches.open(cacheName)
.then(cache => {
console.log("Service Worker: Caching Files");
return cache.addAll(cacheAssets);
})
.then(() => self.skipWaiting())
);
});

const version = 'v1';

self.addEventListener('activate', e => {
console.log('Service Worker: Activated');
e.waitUntil(
caches.keys().then(keyList => {
return Promise.all(
keyList.map(cache => {
if (cache !== version) {
console.log("Service Worker: Clearing old cache");
return caches.delete(cache);
}
})
);
})
);
});

self.addEventListener('fetch', e => {
console.log('service worker : fetching');
e.respondWith(
fetch(e.request).catch(() => caches.match(e.request))
);
});
