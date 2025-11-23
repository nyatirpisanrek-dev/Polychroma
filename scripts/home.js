// Home page: parallax hero, carousel, quick shop, testimonials
(function(){
  // Parallax hero
  const media = document.querySelector('.hero-media');
  const content = document.querySelector('.hero-content');
  if(media && content){
    const onScroll = () => {
      const y = window.scrollY * 0.25;
      media.style.transform = `translateY(${y}px)`;
      content.style.transform = `translateY(${y*0.2}px)`;
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // Dummy data
  const products = Array.from({length:12}).map((_,i)=>({
    id:i+1,
    title:`Hoodie Pastel ${i+1}`,
    price: 48 + (i%4)*10,
    img:`assets/placeholder-${(i%6)+1}.jpg`,
    imgAlt:`assets/placeholder-${((i+1)%6)+1}.jpg`,
    badge: ['Baru','Sedang Tren','Eco','Paket'][i%4]
  }));

  // Trending carousel with enhanced interactions
  const carousel = document.querySelector('.carousel');
  if(carousel){
    // Add skeleton loading
    for(let i = 0; i < 4; i++){
      const skeleton = document.createElement('div');
      skeleton.className = 'card product-card skeleton';
      skeleton.innerHTML = `
        <div class="card-media skeleton"></div>
        <div class="card-body">
          <div class="card-title skeleton" style="height:20px;margin-bottom:8px"></div>
          <div class="card-meta skeleton" style="height:16px;width:60%"></div>
        </div>`;
      carousel.appendChild(skeleton);
    }

    // Load products with delay to show skeleton
    setTimeout(() => {
      carousel.innerHTML = '';
      products.slice(0,8).forEach(p=>{
        const card = document.createElement('article');
        card.className = 'card product-card';
        card.setAttribute('role', 'article');
        card.innerHTML = `
          <div class="card-media">
            <img src="${p.img}" alt="${p.title}" loading="lazy">
            <img class="alt" src="${p.imgAlt}" alt="${p.title} alt view" loading="lazy">
            <div class="quick-add">
              <button class="icon-btn" data-add data-id="${p.id}" aria-label="Add ${p.title} to cart">+</button>
              <button class="icon-btn" aria-label="Add ${p.title} to wishlist">♡</button>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">${p.title}</div>
            <div class="card-meta"><span>$${p.price}</span><span class="badge">${p.badge}</span></div>
          </div>`;
        carousel.appendChild(card);
      });
    }, 1000);

    // Enhanced autoplay with pause on interaction
    let auto = setInterval(()=>{carousel.scrollBy({left:320, behavior:'smooth'})}, 4000);
    let isPaused = false;
    carousel.addEventListener('mouseenter', ()=>{ clearInterval(auto); isPaused = true; });
    carousel.addEventListener('mouseleave', ()=>{
      if(isPaused) auto = setInterval(()=>{carousel.scrollBy({left:320, behavior:'smooth'})}, 4000);
    });
    // Pause on focus for keyboard users
    carousel.addEventListener('focusin', ()=>{ clearInterval(auto); isPaused = true; });
    carousel.addEventListener('focusout', (e)=>{
      if(!carousel.contains(e.relatedTarget)) {
        auto = setInterval(()=>{carousel.scrollBy({left:320, behavior:'smooth'})}, 4000);
        isPaused = false;
      }
    });
  }

  // Quick shop grid with lazy loading
  const grid = document.getElementById('quickShopGrid');
  if(grid){
    // Add skeleton loading
    for(let i = 0; i < 8; i++){
      const skeleton = document.createElement('div');
      skeleton.className = 'card product-card skeleton';
      skeleton.innerHTML = `
        <div class="card-media skeleton"></div>
        <div class="card-body">
          <div class="card-title skeleton" style="height:20px;margin-bottom:8px"></div>
          <div class="card-meta skeleton" style="height:16px;width:60%"></div>
        </div>`;
      grid.appendChild(skeleton);
    }

    // Load products with delay
    setTimeout(() => {
      grid.innerHTML = '';
      products.slice(0,8).forEach(p=>{
        const card = document.createElement('article');
        card.className = 'card product-card';
        card.setAttribute('role', 'article');
        card.innerHTML = `
          <div class="card-media">
            <img src="${p.img}" alt="${p.title}" loading="lazy">
            <img class="alt" src="${p.imgAlt}" alt="${p.title} alt view" loading="lazy">
            <div class="quick-add">
              <div class="sizes">
                ${['XS','S','M','L','XL'].map(s=>`<button class='size-pill' aria-label='Select size ${s}'>${s}</button>`).join('')}
              </div>
              <button class="btn btn-primary" data-add data-id="${p.id}" aria-label="Quick add ${p.title} to cart">Tambah Cepat</button>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">${p.title}</div>
            <div class="card-meta"><span>$${p.price}</span><span class="badge">${p.badge}</span></div>
          </div>`;
        grid.appendChild(card);
      });
    }, 1500);
  }

  // Testimonials with smooth animations
  const testimonials = document.getElementById('testimonials');
  if(testimonials){
    const people = ['@ameliastyles', '@jaytee', '@nova', '@kai'];
    people.forEach((h,i)=>{
      const t = document.createElement('div');
      t.className = 'testimonial';
      t.style.animationDelay = `${i * 0.1}s`;
      t.innerHTML = `
        <div class="avatar" aria-hidden="true">${h[1].toUpperCase()}</div>
        <div>
          <div class="stars" aria-label="5 star rating">★★★★★</div>
        <p>Suka kualitas dan getarannya. ${i%2? 'Line Eco favorit saya.' : 'Cocok dengan estetika saya sempurna.'}</p>
          <div class="muted">${h}</div>
        </div>`;
      testimonials.appendChild(t);
    });

    // Auto-scroll testimonials
    let testimonialAuto = setInterval(() => {
      testimonials.scrollBy({left: 350, behavior: 'smooth'});
      // Reset to start when reaching end
      setTimeout(() => {
        if(testimonials.scrollLeft + testimonials.clientWidth >= testimonials.scrollWidth - 10){
          testimonials.scrollTo({left: 0, behavior: 'smooth'});
        }
      }, 2000);
    }, 5000);

    testimonials.addEventListener('mouseenter', () => clearInterval(testimonialAuto));
    testimonials.addEventListener('mouseleave', () => testimonialAuto = setInterval(() => {
      testimonials.scrollBy({left: 350, behavior: 'smooth'});
      setTimeout(() => {
        if(testimonials.scrollLeft + testimonials.clientWidth >= testimonials.scrollWidth - 10){
          testimonials.scrollTo({left: 0, behavior: 'smooth'});
        }
      }, 2000);
    }, 5000));
  }

  // Add to cart buttons with enhanced feedback
  document.addEventListener('click', (e)=>{
    const t = e.target;
    if(t.matches('[data-add]')){
      // Add loading state
      const originalText = t.textContent;
      t.textContent = 'Adding...';
      t.disabled = true;

      setTimeout(() => {
        window.__bumpCart && window.__bumpCart();
        window.__showMiniCart && window.__showMiniCart('Ditambahkan ke keranjang');
        t.textContent = originalText;
        t.disabled = false;
      }, 800);
    }
  });

  // Size selection feedback
  document.addEventListener('click', (e)=>{
    const t = e.target;
    if(t.classList.contains('size-pill')){
      // Remove active class from siblings
      t.parentNode.querySelectorAll('.size-pill').forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      t.classList.add('active');
      // Announce selection
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `Size ${t.textContent} selected`;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
  });
})();
