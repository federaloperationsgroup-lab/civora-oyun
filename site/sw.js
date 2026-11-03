// Civora hizmet çalışanı (D-162): yalnız telefon bildirimi. Önbellek ve ağ isteği yok (sayfa her zaman ağdan gelir).
// İleti: {"title","body","url","tag"} (sunucu kişinin dilinde yazar; mesaj içeriği yok).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Civora", {
    body: d.body || "", tag: d.tag || "civora", renotify: true, data: { url: d.url || "" },
    icon: "img/amblem.png", badge: "img/simge_maskeli_192.png",
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const hedef = new URL("./" + (e.notification.data?.url || ""), self.registration.scope).href;
  e.waitUntil((async () => {
    const pencereler = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const p of pencereler) {
      if (p.url.startsWith(self.registration.scope)) { await p.focus(); p.postMessage({ tur: "bildirim-ac", url: e.notification.data?.url || "" }); return; }
    }
    await self.clients.openWindow(hedef);
  })());
});
