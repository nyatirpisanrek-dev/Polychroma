import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Dummy data for products
    const products = Array.from({length:12}).map((_,i)=>({
      id:i+1,
      title:`Pastel Hoodie ${i+1}`,
      price: 48 + (i%4)*10,
      img:`assets/placeholder-${(i%6)+1}.jpg`,
      imgAlt:`assets/placeholder-${((i+1)%6)+1}.jpg`,
      badge: ['New','Trending','Eco','Bundle'][i%4]
    }));

    // Populate trending carousel
    const carousel = document.getElementById('trendingCarousel');
    if(carousel){
      products.slice(0,8).forEach(p=>{
        const card = document.createElement('article');
        card.className = 'card product-card';
        card.innerHTML = `
          <div class="card-media">
            <img src="${p.img}" alt="${p.title}">
            <img class="alt" src="${p.imgAlt}" alt="${p.title} alt">
            <div class="quick-add">
              <button class="icon-btn" data-add data-id="${p.id}">+</button>
              <button class="icon-btn">♡</button>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">${p.title}</div>
            <div class="card-meta"><span>$${p.price}</span><span class="badge">${p.badge}</span></div>
          </div>`;
        carousel.appendChild(card);
      });
    }

    // Populate quick shop grid
    const grid = document.getElementById('quickShopGrid');
    if(grid){
      products.slice(0,8).forEach(p=>{
        const card = document.createElement('article');
        card.className = 'card product-card';
        card.innerHTML = `
          <div class="card-media">
            <img src="${p.img}" alt="${p.title}">
            <img class="alt" src="${p.imgAlt}" alt="${p.title} alt">
            <div class="quick-add">
              <div class="sizes">
                ${['XS','S','M','L','XL'].map(s=>`<button class='size-pill'>${s}</button>`).join('')}
              </div>
              <button class="btn btn-primary" data-add data-id="${p.id}">Quick add</button>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">${p.title}</div>
            <div class="card-meta"><span>$${p.price}</span><span class="badge">${p.badge}</span></div>
          </div>`;
        grid.appendChild(card);
      });
    }

    // Populate testimonials
    const testimonials = document.getElementById('testimonials');
    if(testimonials){
      const people = ['@ameliastyles', '@jaytee', '@nova', '@kai'];
      people.forEach((h,i)=>{
        const t = document.createElement('div');
        t.className = 'testimonial';
        t.innerHTML = `
          <div class="avatar">${h[1].toUpperCase()}</div>
          <div>
            <div class="stars">★★★★★</div>
            <p>Love the quality and vibe. ${i%2? 'Eco line is my fave.' : 'Fits my aesthetic perfectly.'}</p>
            <div class="muted">${h}</div>
          </div>`;
        testimonials.appendChild(t);
      });
    }

    // Add event listeners for add to cart buttons
    document.addEventListener('click', (e)=>{
      const t = e.target;
      if(t.matches('[data-add]')){
        showMiniCart('Added to cart');
      }
    });

    // Mini-cart functionality
    function showMiniCart(msg){
      const miniCart = document.getElementById('miniCart');
      if(!miniCart) return;
      miniCart.textContent = msg;
      miniCart.classList.add('show');
      setTimeout(()=> miniCart.classList.remove('show'), 2000);
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if(newsletterForm){
      newsletterForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        showMiniCart('Thanks for joining the newsletter!');
      });
    }

    // Modal functionality
    document.addEventListener('click', (e)=>{
      const t = e.target;
      if(t.matches('[data-close]')) {
        const m = t.closest('.modal');
        if(m) m.setAttribute('aria-hidden','true');
      }
      if(t.classList && t.classList.contains('modal')) {
        t.setAttribute('aria-hidden','true');
      }
    });

    // Newsletter modal timer
    setTimeout(()=>{
      const modal = document.getElementById('newsletterModal');
      if(modal) modal.setAttribute('aria-hidden','false');
    }, 12000);

  }, []);

  return (
    <div className="App">
      <header className="site-header" data-scrolled="false">
        <div className="container header-inner">
          <a href="#home" className="logo">
            <span className="logo-mark">GZ</span>
            <span className="logo-text">GenZ Fashion Collective</span>
          </a>
          <nav className="main-nav">
            <a href="#shop">Belanja</a>
            <a href="#about">Tentang</a>
            <a href="#contact">Kontak</a>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" aria-label="Cari">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="icon-btn" aria-label="Wishlist">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button id="cartButton" className="icon-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="m1 1 4 4h15l-1 7H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Dress the vibe. Be the moment.</h1>
            <p>Koleksi fashion Gen Z yang berkelanjutan, inklusif, dan tanpa kompromi menjadi diri Anda.</p>
            <div className="cta-row">
              <a href="#shop" className="btn btn-primary">Belanja Sekarang</a>
              <a href="#about" className="btn btn-secondary">Pelajari Lebih Lanjut</a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Sedang Tren</h2>
              <a href="#shop" className="btn btn-ghost">Lihat Semua</a>
            </div>
            <div className="carousel" id="trendingCarousel">
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Belanja Cepat</h2>
            </div>
            <div className="grid" id="quickShopGrid">
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Testimoni</h2>
            </div>
            <div className="testimonials" id="testimonials">
            </div>
          </div>
        </section>

        <section className="social-strip">
          <div className="container">
            <div className="social-card ig">Feed Instagram placeholder</div>
            <div className="social-card tt">Pratinjau TikTok placeholder</div>
            <div className="social-card pin">Moodboard Pinterest</div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="logo small">
              <span className="logo-mark">GZ</span> GenZ Fashion Collective
            </div>
            <p className="muted">Berkelanjutan, inklusif, dan tanpa kompromi menjadi diri Anda.</p>
          </div>
          <nav>
            <h4>Belanja</h4>
            <ul>
              <li><a href="#men">Pria</a></li>
              <li><a href="#women">Wanita</a></li>
              <li><a href="#unisex">Unisex</a></li>
              <li><a href="#accessories">Aksesoris</a></li>
            </ul>
          </nav>
          <nav>
            <h4>Perusahaan</h4>
            <ul>
              <li><a href="#about">Tentang</a></li>
              <li><a href="#sustainability">Keberlanjutan</a></li>
              <li><a href="#careers">Karir</a></li>
            </ul>
          </nav>
          <div>
            <h4>Newsletter</h4>
            <form id="newsletterForm" className="newsletter">
              <input type="email" placeholder="Email Anda" aria-label="Email" required />
              <button className="btn btn-primary" type="submit">Bergabung</button>
            </form>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2025 GenZ Fashion Collective</span>
          <div className="social-links">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="TikTok">TT</a>
            <a href="#" aria-label="Pinterest">Pin</a>
          </div>
        </div>
      </footer>

      <div className="modal" id="newsletterModal" aria-hidden="true" role="dialog" aria-modal="true">
        <div className="modal-content">
          <button className="icon-btn modal-close" data-close>✕</button>
          <h3>Dapatkan 10% off pesanan pertama Anda</h3>
          <p>Bergabunglah dengan kolektif untuk drops dan tren.</p>
          <form className="newsletter">
            <input type="email" placeholder="Alamat email" required />
            <button className="btn btn-primary" type="submit">Berlangganan</button>
          </form>
          <button className="btn btn-ghost" data-close>Tidak, saya akan membayar penuh</button>
        </div>
      </div>

      <div id="miniCart" className="mini-cart" aria-live="polite"></div>
    </div>
  );
}

export default App;
