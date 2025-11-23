// Shared app behaviors: header scroll, modals, mini-cart, newsletter, accessibility
(function(){
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    const scrolled = window.scrollY > 8;
    if (header) header.setAttribute('data-scrolled', scrolled);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mini-cart toast
  const miniCart = document.getElementById('miniCart');
  function showMiniCart(msg){
    if(!miniCart) return;
    miniCart.textContent = msg;
    miniCart.classList.add('show');
    setTimeout(()=> miniCart.classList.remove('show'), 2000);
  }
  window.__showMiniCart = showMiniCart;

  // Cart button bounce
  const cartButton = document.getElementById('cartButton');
  function bumpCart(){
    if(!cartButton) return;
    cartButton.classList.remove('bump');
    void cartButton.offsetWidth; // reflow
    cartButton.classList.add('bump');
    cartButton.dataset.count = String(Number(cartButton.dataset.count||0)+1);
  }
  const style = document.createElement('style');
  style.textContent = `#cartButton.bump{animation:bump .4s var(--ease)}@keyframes bump{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}`;
  document.head.appendChild(style);
  window.__bumpCart = bumpCart;

  // Modal helpers with focus management
  let lastFocusedElement = null;
  function openModal(id){
    const m = document.getElementById(id);
    if(!m) return;
    lastFocusedElement = document.activeElement;
    m.setAttribute('aria-hidden','false');
    // Focus first focusable element in modal
    const focusable = m.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if(focusable) focusable.focus();
  }
  function closeModal(el){
    const m = el.closest('.modal');
    if(m) {
      m.setAttribute('aria-hidden','true');
      // Return focus to last focused element
      if(lastFocusedElement) lastFocusedElement.focus();
    }
  }
  document.addEventListener('click', (e)=>{
    const t = e.target;
    if(t.matches('[data-close]')) closeModal(t);
    if(t.classList && t.classList.contains('modal')) t.setAttribute('aria-hidden','true');
  });
  // Close modal on Escape key
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      const openModal = document.querySelector('.modal[aria-hidden="false"]');
      if(openModal) closeModal(openModal);
    }
  });
  window.__openModal = openModal;

  // Newsletter modal: open after 12s with announcement
  const newsletterTimer = setTimeout(()=>{
    const modal = document.getElementById('newsletterModal');
    if(modal) {
      openModal('newsletterModal');
      // Announce to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'assertive');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = 'Newsletter subscription modal opened. Get 10% off your first order.';
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
  }, 12000);

  // Forms with validation feedback
  const newsletterForm = document.getElementById('newsletterForm');
  if(newsletterForm){
    newsletterForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]');
      if(email && email.checkValidity()){
      showMiniCart('Terima kasih telah bergabung dengan newsletter!');
        newsletterForm.reset();
        // Close modal if open
        const modal = document.getElementById('newsletterModal');
        if(modal && modal.getAttribute('aria-hidden') === 'false'){
          closeModal(modal);
        }
      } else {
        showMiniCart('Please enter a valid email address.');
      }
    });
  }

  // Accessibility: focus visible polyfill minimal
  let hadKeyboardEvent = false;
  document.addEventListener('keydown', (e)=>{hadKeyboardEvent = true;}, true);
  document.addEventListener('mousedown', ()=>{hadKeyboardEvent = false;}, true);
  document.body.addEventListener('focusin', (e)=>{
    if(hadKeyboardEvent) e.target.classList.add('focus-visible');
  });
})();
