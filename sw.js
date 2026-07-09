// ICS Service CRM — service worker
//
// Deliberately does NOT cache anything. This app's entire purpose is
// live Firestore/Storage data — caching index.html or API responses
// would risk showing stale project data, stale submittal statuses, or
// stale document links. This worker exists only to satisfy Chrome/Edge's
// "installable PWA" requirement (a fetch handler must be registered),
// while every request still goes straight to the network untouched.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Pure passthrough — always hit the network, never serve from cache.
  event.respondWith(fetch(event.request));
});
