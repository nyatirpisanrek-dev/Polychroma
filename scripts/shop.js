// Shop page: filters, infinite scroll, quick add
(function(){
  const list = document.getElementById('productList');
  const skeletonRow = document.getElementById('skeletonRow');
  let page = 0; let loading = false;

  function productCard(p){
    const el = document.createElement('article');
    el.className = 'card product-card';
    el.innerHTML = `
      <div class="card-media">
        <img src="${p.img}" alt="${p.title}">
        <img class="alt" src="${p.imgAlt}" alt="${p.title} alt">
        <div class="quick-add">
          <button class="btn btn-primary" data-add data-id="${p.id}">Add</button>
          <button class="icon-btn">♡</button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-title">${p.title}</div>
        <div class="card-meta"><span>$${p.price}</span><span class="badge">${p.badge}</span></div>
      </div>`;
    return el;
  }

  function fakeFetch(){
    return new Promise(resolve=>{
      setTimeout(()=>{
        const data = Array.from({length:9}).map((_,i)=>({
          id: page*9 + i + 1,
          title:`Street Tee ${page*9 + i + 1}`,
          price: 24 + ((page*9+i)%5)*6,
          img:`assets/placeholder-${((page+i)%6)+1}.jpg`,
          imgAlt:`assets/placeholder-${((page+i+1)%6)+1}.jpg`,
          badge:['New','Trending','Eco','Sale'][i%4]
        }));
        resolve(data);
      }, 800);
    });
  }

  function showSkeleton(n=6){
    skeletonRow.innerHTML = '';
    for(let i=0;i<n;i++){
      const s = document.createElement('div');
      s.className = 'skeleton';
      skeletonRow.appendChild(s);
    }
  }

  async function loadMore(){
    if(loading) return; loading = true; page++;
    showSkeleton(6);
    const data = await fakeFetch();
    skeletonRow.innerHTML = '';
    data.forEach(d=> list.appendChild(productCard(d)));
    loading = false;
  }

  const io = new IntersectionObserver((entries)=>{
    if(entries.some(e=> e.isIntersecting)) loadMore();
  }, {rootMargin:'600px'});
  io.observe(document.body.lastElementChild);

  // Add to cart
  document.addEventListener('click', (e)=>{
    const t = e.target;
    if(t.matches('[data-add]')){
      window.__bumpCart && window.__bumpCart();
      window.__showMiniCart && window.__showMiniCart('Ditambahkan ke keranjang');
    }
  });
})();
