'use strict';
const CACHE_NAME = 'static-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/entity/webComponents/cardComponent.js',
  '/boundary/webComponents/cardFetchComponent.js',
  '/entity/webComponents/cardListaCategoriasComponent.js',
  '/LIB/lit-html.js'
];

self.addEventListener('install', function(evt) {
  console.log('[ServiceWorker] Instalando');

  // Precachear los archivos estáticos
  evt.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[ServiceWorker] Precaching archivos');
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', function(evt) {
  console.log('[ServiceWorker] Activando');

  // Eliminar cachés antiguas
  evt.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Eliminando caché antigua', key);
          return caches.delete(key);
        }
      }));
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('[ServiceWorker] Fetch', evt.request.url);

  // Intercepta las solicitudes de red y responde con los archivos en caché si están disponibles
  evt.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(evt.request).then(function(response) {
        return response || fetch(evt.request);
      });
    })
  );
});
