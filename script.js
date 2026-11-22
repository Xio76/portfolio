const lightbox=document.getElementById('lightbox');
document.querySelectorAll('.zoom').forEach(button=>button.addEventListener('click',()=>{lightbox.querySelector('img').src=button.dataset.img;lightbox.querySelector('img').alt=button.dataset.caption;lightbox.querySelector('p').textContent=button.dataset.caption;lightbox.showModal();}));
lightbox.querySelector('.dialog-close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});


const glassCards=[...document.querySelectorAll('.skill-grid a')];glassCards.forEach(card=>{card.addEventListener('pointermove',event=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const rect=card.getBoundingClientRect();card.style.setProperty('--glass-x',((event.clientX-rect.left)/rect.width*100)+'%');card.style.setProperty('--glass-y',((event.clientY-rect.top)/rect.height*100)+'%');});card.addEventListener('pointerleave',()=>{card.style.removeProperty('--glass-x');card.style.removeProperty('--glass-y');});});


const socialTrack=document.querySelector('.social-track');
const galleryFigures=[...socialTrack.querySelectorAll('figure')];
const dotsHost=document.querySelector('.gallery-dots');
let galleryTargets=[];
function refreshGalleryDots(){
 const max=Math.max(0,socialTrack.scrollWidth-socialTrack.clientWidth);
 const step=Math.max(1,socialTrack.clientWidth*.9);
 galleryTargets=[0];
 for(let x=step;x<max-5;x+=step) galleryTargets.push(x);
 if(max>5) galleryTargets.push(max);
 dotsHost.replaceChildren();
 galleryTargets.forEach((x,i)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label','顯示第 '+(i+1)+' 組貼文');button.addEventListener('click',()=>scrollGallery(i));dotsHost.append(button);});
 updateGalleryControls();
}
function nearestGalleryIndex(){return galleryTargets.reduce((best,x,i)=>Math.abs(x-socialTrack.scrollLeft)<Math.abs(galleryTargets[best]-socialTrack.scrollLeft)?i:best,0);}
function scrollGallery(i){socialTrack.scrollTo({left:galleryTargets[i],behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
function updateGalleryControls(){document.querySelector('[data-gallery="prev"]').disabled=socialTrack.scrollLeft<2;document.querySelector('[data-gallery="next"]').disabled=socialTrack.scrollLeft+socialTrack.clientWidth>=socialTrack.scrollWidth-3;const active=nearestGalleryIndex();[...dotsHost.children].forEach((dot,i)=>dot.setAttribute('aria-current',String(i===active)));}
 document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>scrollGallery(Math.max(0,Math.min(galleryTargets.length-1,nearestGalleryIndex()+(button.dataset.gallery==='next'?1:-1))))));
 socialTrack.addEventListener('scroll',updateGalleryControls,{passive:true});window.addEventListener('resize',refreshGalleryDots);refreshGalleryDots();

const contactDialog=document.getElementById('contact-dialog');
document.getElementById('open-contact').addEventListener('click',()=>{document.getElementById('copy-status').textContent='';contactDialog.showModal();});
contactDialog.querySelector('.dialog-close').addEventListener('click',()=>contactDialog.close());
contactDialog.addEventListener('click',e=>{if(e.target===contactDialog)contactDialog.close();});
document.getElementById('copy-email').addEventListener('click',async()=>{const input=document.getElementById('contact-email');try{await navigator.clipboard.writeText(input.value);document.getElementById('copy-status').textContent='已複製信箱，可以貼到你的郵件服務。';}catch{input.focus();input.select();document.getElementById('copy-status').textContent='請複製已選取的信箱，貼到你的郵件服務。';}});
