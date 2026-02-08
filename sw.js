// === 关键修改：版本号从 v1 改为 v2 ===
const CACHE_NAME = 'loop-tool-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// 安装时：缓存新文件
self.addEventListener('install', (e) => {
  // 强制跳过等待，立即接管
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 激活时：清理旧版本缓存 (重要！)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('删除旧缓存:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // 让 Service Worker 立即控制页面
  return self.clients.claim();
});

// 运行时：优先从缓存读取
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
