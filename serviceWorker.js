const staticPage = "dev-user-site-v1"; /*recuperar la cache*/
const assets = [
    "/",
    "/index.html",
    "/index.js",
]
self.addEventListener("install",(installEvent)=>{
    installEvent.waitUntil(
        caches,open(staticPage).then((cache)=>{
            caches.addAll(assets);
        })
    );
});
self.addEventListener("fetch", (fetchEvent)=>{
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then((response)=>{
            return response || fetch(fetchEvent.request);

        })
    );
});

if("serviceWorker" in navigator){
    window.addEventListener("load", ()=>{
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((res)=>console.log("service   Worker registrado"))
        .catch((err)=>console.log("ServiceWorker no registrado"))

    })
}