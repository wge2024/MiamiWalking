// Install event listener to cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/charitywalks.html',
        '/Comfortshoes.html',
        '/Exerciseshoes.html/',
        '/menscasualshoes.html',
        '/mensexerciseshoes.html',
        '/mensshoes.html',
        '/womenscasualshoes.html',
        '/womensexerciseshoes.html',
        '/womensshoes.html',
        '/styles.css',
        '/script.js',
        '/images/logo.png',
        '/favicon.ico'
        // Add more files as needed
      ]);
    })
  );
});

// Activate event listener to clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== 'my-cache') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event listener to serve from cache or network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});