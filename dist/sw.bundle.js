if(!self.define){let e,i={};const n=(n,o)=>(n=new URL(n+".js",o).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(o,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let c={};const a=e=>n(e,s),d={module:{uri:s},exports:c,require:a};i[s]=Promise.all(o.map((e=>d[e]||a(e)))).then((e=>(r(...e),c)))}}define(["./workbox-3bd9af45"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"app.bundle.js",revision:"5db3421e68ddca50a143620503fbe7b7"},{url:"app.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app.webmanifest",revision:"4ed1bf339e0022ba3b03e2556f046e13"},{url:"data/DATA.json",revision:"0760fae8cf2d2b172678847987d1d95c"},{url:"icons/icon-128-128.png",revision:"606f3792e8d4538bb7a784ae0241795f"},{url:"icons/icon-144-144.png",revision:"7952b3db380a8e21e8e667e295e7c482"},{url:"icons/icon-152-152.png",revision:"c099277b879e6a7846768f3707d8f571"},{url:"icons/icon-192-192.png",revision:"0ee60e473f149d2552f412e9ca706dac"},{url:"icons/icon-512-512.png",revision:"81a40357f796260bdbef5378ea0ca14c"},{url:"icons/icon-72-72.png",revision:"45e053be46feba8c8d056a9fa7139aaa"},{url:"icons/icon-96-96.png",revision:"05344f78f3a73c61eb56675bce5edb1e"},{url:"images/favicon.png",revision:"9189e8577b887a3e9c5606b0d05cdc9b"},{url:"index.html",revision:"39f9e46b3f3ba21393db33670b55cf11"}],{}),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev")),new e.StaleWhileRevalidate({cacheName:"restaurant-api",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map
