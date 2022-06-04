
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/my-pwa/service-worker.js', {scope: '/my-pwa/'})
        .then( function(registration) {
            console.log('SW Registration success:', registration);
        })
        .catch( function(error) {
            console.log('SW Regitration failed:', error);
        });
}
else {
    console.log('Service worker is not supported.');
}