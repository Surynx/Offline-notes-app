let cache_name = "offline-notes-v6"

let files = [
    "/Offline-notes-app/","/Offline-notes-app/index.html","/Offline-notes-app/style.css","/Offline-notes-app/main.js"
]

self.addEventListener("install",(event)=>{

    event.waitUntil(
        caches.open(cache_name).then((cache)=>{

            return cache.addAll(files).catch((err)=>console.log(err));
        })
    )
});

self.addEventListener("activate",(event)=>{

    console.log("activated")

    event.waitUntil(
        caches.keys().then((keys)=>{

            return Promise.all(
                keys.map((key)=>{

                    if(key != cache_name) {
                        return caches.delete(key);
                    }
                })
            ).then(()=>{
                console.log("cleaned...")
            })
        })
    )
})

self.addEventListener("fetch",(event)=>{

    event.respondWith(
        caches.match(event.request).then((response)=>{

            if(response){

                return response;
            } 

            return fetch(event.request);
        })
    )
});