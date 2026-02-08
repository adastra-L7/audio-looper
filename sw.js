const CACHE_NAME = 'loop-tool-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// 安装时：缓存所有文件
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 运行时：优先从缓存读取，实现离线秒开
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});