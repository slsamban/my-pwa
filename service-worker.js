const casheName = 'version3'

// Called when the SW is installed
self.addEventListener('install', function (event) {
    console.log('SW Installed:', event);
    self.skipWaiting();

    event.waitUntil(
        caches.open(casheName)
            .then(function (cashe) {
                cashe.addAll([
                    '/my-pwa-lab2/',
                    '/my-pwa-lab2/index.html',
                    '/my-pwa-lab2/styles.css',
                    '/my-pwa-lab2/image.png',
                    '/my-pwa-lab2/script.js',
                    '/my-pwa-lab2/favicon-32x32.png',
                    '/my-pwa-lab2/favicon-16x16.png',
                    '/my-pwa-lab2/manifest.json',
                    '/my-pwa-lab2/android-chrome-144x144.png'
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