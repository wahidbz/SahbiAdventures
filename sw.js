// Service Worker for offline support
const CACHE_NAME = 'sahbi-adventures-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/js/config.js',
    '/js/game.js',
    '/js/PiNetworkManager.js',
    '/js/AssetGenerator.js',
    '/js/scenes/BootScene.js',
    '/js/scenes/PreloadScene.js',
    '/js/scenes/MenuScene.js',
    '/js/scenes/WorldSelectScene.js',
    '/js/scenes/GameScene.js',
    '/js/scenes/UIScene.js',
    '/js/scenes/GameOverScene.js',
    '/assets/data/worlds.json',
    'https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js',
    'https://sdk.minepi.com/pi-sdk.js'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then(
                    (response) => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    }
                );
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
