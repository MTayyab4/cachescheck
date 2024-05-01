const cacheName = 'v2';


// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

});

// Call Activate Event
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
                }
                )
            )
        })
    );
});

//Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('service worker : fetcheing');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Make copy/clone of response
                const resClone = res.clone()
                //Open cache
                caches.open(cacheName)
                    .then(cache => {
                        //Add response to cache
                        cache.put(e.request, resClone);
                    })
                return res;
            }).catch(err => caches.match(e.request).then(res => res))
    );


})
