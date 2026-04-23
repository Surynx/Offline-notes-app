let cache_name = "offline-notes-v4"

self.addEventListener("install",(event)=>{

    event.waitUntil(
        caches.open(cache_name).then((cache)=>{

            return cache.addAll(["/","/index.html","/style.css","/main.js"]);
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
                        caches.delete(key);
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