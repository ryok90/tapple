if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const c=e=>n(e,o),t={module:{uri:o},exports:d,require:c};i[o]=Promise.all(r.map((e=>t[e]||c(e)))).then((e=>(s(...e),d)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-198c614d.js",revision:null},{url:"assets/index-2f01870e.css",revision:null},{url:"index.html",revision:"ff66d4478ee4db7eda757f893e485605"},{url:"registerSW.js",revision:"f7ed7fdeb8603a1937286ba13add193e"},{url:"favicon.ico",revision:"638b0685b1c2407b4db582882b08ae1a"},{url:"apple-touch-icon.png",revision:"92d94b3125126cc091a852c31c808b8f"},{url:"masked-icon.svg",revision:"bb4ded5964bf84d3a0a5433b93174946"},{url:"android-chrome-192x192.png",revision:"c80da9c1ff853a88648d17942047846a"},{url:"android-chrome-512x512.png",revision:"1564f6d3dac6ae9a7adcc482266faa79"},{url:"manifest.webmanifest",revision:"e21122cdf7f38a59980b026ff546e34b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
