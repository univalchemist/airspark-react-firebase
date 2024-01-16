if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    self.addEventListener("fetch", function(event) {
      event.respondWith(
        caches.open("mysite-dynamic").then(function(cache) {
          return fetch(event.request)
            .then(function(response) {
              if (response) {
                cache.put(event.request, response.clone());
                return response;
              } else {
                return (
                  caches.match(event.request) || caches.match("/offline.html")
                );
              }
            })
            .catch((e) => {
              console.log(e);
              return (
                caches.match(event.request) || caches.match("/offline.html")
              );
            });
        })
      );
    });

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute("/index.html", {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
