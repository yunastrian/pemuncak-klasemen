const CACHE_NAME = "pemuncak";
var urlsToCache = [
  "/pemuncak-klasemen/",
  "/pemuncak-klasemen/nav.html",
  "/pemuncak-klasemen/index.html",
  "/pemuncak-klasemen/pages/home.html",
  "/pemuncak-klasemen/pages/inggris.html",
  "/pemuncak-klasemen/pages/italia.html",
  "/pemuncak-klasemen/pages/jerman.html",
  "/pemuncak-klasemen/pages/spanyol.html",
  "/pemuncak-klasemen/css/materialize.min.css",
  "/pemuncak-klasemen/js/materialize.min.js",
  "/pemuncak-klasemen/js/nav.js",
  "/pemuncak-klasemen/asset/atalanta.png",
  "/pemuncak-klasemen/asset/everton.png",
  "/pemuncak-klasemen/asset/leipzig.png",
  "/pemuncak-klasemen/asset/real_madrid.png",
  "/pemuncak-klasemen/asset/logo.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
            }

            console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
            );
            return fetch(event.request);
        })
    );
});