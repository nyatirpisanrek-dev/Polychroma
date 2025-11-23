// Product page: gallery, zoom, tabs, size guide
(function(){
  const image = document.getElementById('pdpImage');
  const thumbs = document.querySelectorAll('.media-thumbs img');
  thumbs.forEach(t=> t.addEventListener('click', ()=>{
    image.src = t.dataset.src;
  }));

  // Zoom on hover (desktop)
  const mediaMain = document.querySelector('.media-main');
  if(mediaMain){
    mediaMain.addEventListener('mousemove', (e)=>{
      const rect = mediaMain.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 100;
      const y = (e.clientY - rect.top) / rect.height * 100;
      image.style.transformOrigin = `${x}% ${y}%`;
      image.style.transform = 'scale(1.5)';
    });
    mediaMain.addEventListener('mouseleave', ()=>{
      image.style.transform = 'none';
    });
  }

  // Tabs
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab=> tab.addEventListener('click', ()=>{
    tabs.forEach(t=> t.classList.remove('active'));
    tab.classList.add('active');
    const id = tab.dataset.tab;
    document.getElementById('viewer').hidden = id !== 'viewer';
    document.getElementById('ugc').hidden = id !== 'ugc';
  }));

  // Size guide modal
  const openSize = document.getElementById('openSizeGuide');
  if(openSize){
    openSize.addEventListener('click', ()=> window.__openModal('sizeGuide'));
  }

  // Add to cart microinteraction
  const add = document.getElementById('addToCart');
  if(add){
    add.addEventListener('click', ()=>{
      window.__bumpCart && window.__bumpCart();
      window.__showMiniCart && window.__showMiniCart('Ditambahkan ke keranjang');
    });
  }
})();
