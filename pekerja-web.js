(function() {
  'use strict';

  var filesToCache = [
    '.',
    'style/main.css',
    'index.html',
	  'js/main.js',
	  'js/idb.js',
    'images/sneaker.jpg',
    'images/heels.jpg',
	  'images/flatshoes.jpg'
  ];
//digunakan untuk mengisi array yang berisi  path/file
  var staticCacheName = 'pages-cache-v1';
//berisi nama cache nya supaya tdk bentrok dengan cache aplikasi web yang lain
  self.addEventListener('install', function(event) {
    console.log('install service worker and cache static assets');
    event.waitUntil(
	//wait until adl bagian blog install aakan berhenti setelah semua selesai , membuat cache jkbelum ada
      caches.open(staticCacheName)
      .then(function(cache) {
		  //jika berhasil maka menambahkan 4 file td ke dalam cache.
        return cache.addAll(filesToCache);
	
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
      }).catch(function(error) {
        console.log('Error, ', error);
      })
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('Activating service worker');

    var cacheWhitelist = [staticCacheName];
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

})();
