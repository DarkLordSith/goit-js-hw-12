import{i as n,S as p}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const u="46873247-b56a65fb4c08f29194ce1856e",h="https://pixabay.com/api/";async function y(s,r=1,o=15){const a=`${h}?key=${u}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${o}&page=${r}`;try{console.log("Fetching URL:",a);const e=await fetch(a);if(!e.ok)throw new Error("Failed to fetch images");const t=await e.json();return t.hits.length===0&&n.info({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16",backgroundColor:"#ef4040",messageColor:"#fafafb",maxWidth:"432px",messageLineHeight:"88px"}),t}catch(e){throw n.error({position:"topRight",message:"Failed to fetch images from Pixabay API",backgroundColor:"#ef4040",messageColor:"#fafafb"}),e}}function b(s){const r=document.getElementById("gallery"),o=s.map(({webformatURL:e,largeImageURL:t,tags:i,likes:f,views:m,comments:g,downloads:d})=>`
    <a href="${t}" class="gallery-item">
      <img src="${e}" alt="${i}" />
      <div class="info">
        <p class="info-text">Likes: ${f}</p>
        <p class="info-text">Views: ${m}</p>
        <p class="info-text">Comments: ${g}</p>
        <p class="info-text">Downloads: ${d}</p>
      </div>
    </a>
  `).join("");r.innerHTML=o,new p(".gallery-item").refresh()}const c=document.getElementById("search-form"),L=document.getElementById("gallery"),l=document.getElementById("loader");c.addEventListener("submit",async s=>{s.preventDefault();const r=c.elements.query.value.trim();if(r===""){n.warning({position:"topRight",message:"Please enter a search query.",messageSize:"16",backgroundColor:"#ef4040",messageColor:"#fafafb",maxWidth:"432px",messageLineHeight:"88px"});return}L.innerHTML="",l.classList.remove("hidden");try{const o=await y(r);b(o.hits)}catch(o){console.error("Error fetching images:",o),n.error({title:"Error",message:"Failed to load images. Try again."})}finally{l.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
