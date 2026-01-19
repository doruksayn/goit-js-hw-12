/* empty css                      */import{S as E,a as S,i as p}from"./assets/vendor-BkVuWn-o.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const P="54219478-952de2791b1b40d9ff96d9b02",I="https://pixabay.com/api/",h=42,A=document.getElementById("search-form"),l=document.querySelector(".gallery"),y=document.querySelector(".loader"),d=document.querySelector(".load-more");let c=null,g="",n=1,u=0;A.addEventListener("submit",B);d.addEventListener("click",M);async function B(e){e.preventDefault();const r=e.target.elements.searchQuery.value.trim();r&&(g=r,n=1,l.innerHTML="",v(),await b())}async function M(){n+=1,await b()}async function b(){H();try{const e=await $(g,n);if(m(),e.hits.length===0){n===1&&f("Sorry, there are no images matching your search query. Please try again!");return}u=e.totalHits,q(e.hits),c===null?c=new E(".gallery a",{captionsData:"alt",captionDelay:250}):c.refresh(),n*h<u?N():(v(),n>1&&R("We're sorry, but you've reached the end of search results.")),n>1&&O()}catch(e){m(),console.error("Error fetching images:",e),f("An error occurred while fetching images. Please try again!")}}async function $(e,r=1){const i={key:P,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:h};return(await S.get(I,{params:i})).data}function q(e){const r=e.map(({webformatURL:i,largeImageURL:s,tags:t,likes:o,views:a,comments:L,downloads:w})=>`
    <div class="gallery-item">
      <a href="${s}" class="gallery-link">
        <img src="${i}" alt="${t}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <span>${o}</span>
        </div>
        <div class="info-item">
          <b>Views</b>
          <span>${a}</span>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <span>${L}</span>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <span>${w}</span>
        </div>
      </div>
    </div>
  `).join("");l.insertAdjacentHTML("beforeend",r)}function O(){const{height:e}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*3,behavior:"smooth"})}function f(e){p.error({title:"Error",message:e,position:"topRight",timeout:5e3})}function R(e){p.info({title:"Info",message:e,position:"topRight",timeout:5e3})}function H(){y.style.display="block"}function m(){y.style.display="none"}function N(){d.style.display="block"}function v(){d.style.display="none"}
//# sourceMappingURL=01-page.js.map
