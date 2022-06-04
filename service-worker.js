const casheName = 'version3'

// Called when the SW is installed
self.addEventListener('install', function (event) {
    console.log('SW Installed:', event);
    self.skipWaiting();

    event.waitUntil(
        caches.open(casheName)
            .then(function (cashe) {
                cashe.addAll([
                    '/my-pwa/',
                    '/my-pwa/index.html',
                    '/my-pwa/styles.css',
                    '/my-pwa/image.png',
                    '/my-pwa/script.js',
                    '/my-pwa/favicon-32x32.png',
                    '/my-pwa/favicon-16x16.png',
                    '/my-pwa/manifest.json',
                    '/my-pwa/android-chrome-144x144.png'
                ]);
            })
    );

});


// Called when the SW is activated
self.addEventListener('activate', function (event) {
    console.log('SW Activated:', event);
    event.waitUntil(clients.claim());

// Delete old cashes
event.waitUntil(
    caches.keys()
        .then(function (cashNames) {
            for (const item of cashNames) {
                if (item !== casheName) {
                    caches.delete(item);
                }
            }
        })
    )
});

// Every time something comes from the web
self.addEventListener('fetch', function (event) {

    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});