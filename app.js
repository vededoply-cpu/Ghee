// ==========================================================================
// BRAJBHUMI FOOD - E-COMMERCE & INTERACTIVE LOGIC
// ==========================================================================

// Product Database - 100% Pure Ghee Range
const PRODUCTS = [
  {
    id: 'cow-ghee-pure',
    name: 'Brajbhumi Desi Cow A2 Ghee (500g)',
    category: 'cow-ghee',
    badge: 'Best Seller · A2 Bilona',
    desc: 'Hand-churned from fresh cow butter using traditional bilona method. Rich golden aroma and natural granular texture.',
    image: 'image/ghee.jpg?v=2',
    accentColor: '#bc944c',
    basePrice: 790,
    sizes: [
      { label: '250 ml', price: 440 },
      { label: '500 ml', price: 790 },
      { label: '1 Litre', price: 1490 }
    ],
    features: ['100% Pure A2 Cow Milk', 'Traditional Bilona Method', 'NABL Certified Lab Tested', 'Glass Jar Packaging']
  },
  {
    id: 'cow-ghee-1kg',
    name: 'Brajbhumi Desi Cow A2 Ghee (1kg Pack)',
    category: 'cow-ghee',
    badge: 'Family Value Pack',
    desc: 'Golden, granular premium A2 cow ghee in a convenient 1kg glass jar seal, delivered direct from farm kitchens.',
    image: 'image/1kg.jpg?v=2',
    accentColor: '#e5c378',
    basePrice: 1490,
    sizes: [
      { label: '1 Kg / 1L', price: 1490 },
      { label: '2 Kg (Twin Pack)', price: 2890 }
    ],
    features: ['Granular Danedar Texture', 'Zero Preservatives', 'Rich Aroma & Taste', 'Free Express Delivery']
  },
  {
    id: 'cow-ghee-5kg-tin',
    name: 'Brajbhumi Desi Cow A2 Ghee (5kg Bulk)',
    category: 'cow-ghee',
    badge: 'Mega Savings · 5 Litre',
    desc: 'Pure A2 Bilona Cow Ghee in a heavy-duty 5kg bulk container seal, crafted for long-term family & festive use.',
    image: 'image/5kg.png?v=2',
    accentColor: '#bc944c',
    basePrice: 6800,
    sizes: [
      { label: '5 Kg Container', price: 6800 },
      { label: '10 Kg (Twin Pack)', price: 13200 }
    ],
    features: ['100% Pure A2 Cow Ghee', 'Bulk Savings Pack', 'GC Lab Tested Pure', 'Free Express Shipping']
  },
  {
    id: 'buffalo-ghee-500g',
    name: 'Brajbhumi Desi Buffalo Ghee (500g)',
    category: 'buffalo-ghee',
    badge: 'Traditional Pure',
    desc: 'Pure white-golden ghee made from high-fat buffalo butter. Distinct rich aroma and smooth body.',
    image: 'image/ghee.jpg?v=2',
    accentColor: '#bc944c',
    basePrice: 890,
    sizes: [
      { label: '250 ml', price: 490 },
      { label: '500 ml', price: 890 },
      { label: '1 Litre', price: 1590 }
    ],
    features: ['High Fat & Nutrition', 'Lab Certified Pure', '0 Adulteration', 'Authentic Recipe']
  },
  {
    id: 'buffalo-ghee-1kg',
    name: 'Brajbhumi Desi Buffalo Ghee (1kg Pack)',
    category: 'buffalo-ghee',
    badge: 'Rich Culinary Ghee',
    desc: 'Made from fresh buffalo butter — rich aroma, deep creamy texture, ideal for everyday cooking and parathas.',
    image: 'image/1kg.jpg?v=2',
    accentColor: '#e5c378',
    basePrice: 1590,
    sizes: [
      { label: '1 Kg / 1L', price: 1590 },
      { label: '2 Kg (Twin Pack)', price: 3090 }
    ],
    features: ['Smooth Creamy Texture', 'High Heat Stability', '100% Dairy Fat', 'Farm Fresh Churned']
  },
  {
    id: 'buffalo-ghee-5kg',
    name: 'Brajbhumi Desi Buffalo Ghee (5kg Bulk)',
    category: 'buffalo-ghee',
    badge: 'Festive & Bulk Pack',
    desc: 'Made from pure buffalo butter — rich, deeply aromatic, ideal for sweet making, festivals, and heavy culinary use.',
    image: 'image/5kg.png?v=2',
    accentColor: '#097545',
    basePrice: 4200,
    sizes: [
      { label: '5 Kg Container', price: 4200 },
      { label: '10 Kg (Twin Pack)', price: 8200 }
    ],
    features: ['High Smoke Point', 'Traditional Churning', 'Rich Creamy Body', 'Ideal for Festive Sweets']
  }
];


// ==========================================================================
// STATE MANAGEMENT
// ==========================================================================

let cart = [];
let activeCategory = 'all';
let currentModalProduct = null;
let currentSelectedSizeIndex = 0;
let currentSlide = 0;
let slideInterval = null;


// ==========================================================================
// DOM LOADED INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  renderProducts();

  setupEventListeners();

  startHeroSlider();

  setupManufacturingVideos();

});


// ==========================================================================
// RENDER PRODUCTS GRID
// ==========================================================================

function renderProducts() {

  const grid = document.getElementById('products-grid');

  if (!grid) return;

  const filtered =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCategory);

  grid.innerHTML = filtered.map(p => `

    <div class="product-card">

      <span class="product-badge">${p.badge}</span>

      <div class="product-img-box">

        <img
          src="${p.image}"
          alt="${p.name}"
          class="product-card-img"
        />

      </div>

      <h3
        class="font-display"
        style="
          font-size: 1.15rem;
          color: var(--color-cream);
          margin-bottom: 0.35rem;
        "
      >
        ${p.name}
      </h3>

      <p
        style="
          font-size: 0.825rem;
          color: var(--color-cream-muted);
          flex: 1;
          margin-bottom: 1rem;
        "
      >
        ${p.desc}
      </p>

      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          border-top: 1px solid rgba(188,148,76,0.15);
          padding-top: 0.75rem;
        "
      >

        <div>

          <span
            style="
              font-size: 0.7rem;
              text-transform: uppercase;
              color: var(--color-gold);
              display: block;
            "
          >
            Starts from
          </span>

          <span
            style="
              font-size: 1.15rem;
              font-weight: 700;
              color: var(--color-gold-light);
            "
          >
            ₹${p.basePrice}
          </span>

        </div>

        <div style="display: flex; gap: 0.5rem;">

          <button
            onclick="openProductModal('${p.id}')"
            class="btn-ghost"
            style="
              padding: 0.4rem 0.85rem;
              font-size: 0.75rem;
            "
          >
            Details
          </button>

          <button
            onclick="addToCartDirect('${p.id}')"
            class="btn-gold"
            style="
              padding: 0.4rem 0.85rem;
              font-size: 0.75rem;
            "
          >
            + Add
          </button>

        </div>

      </div>

    </div>

  `).join('');
}


// ==========================================================================
// CATEGORY FILTER
// ==========================================================================

function setCategory(cat) {

  activeCategory = cat;

  document.querySelectorAll('.filter-tab').forEach(btn => {

    if (btn.dataset.category === cat) {

      btn.classList.add('btn-gold');
      btn.classList.remove('btn-ghost');

    } else {

      btn.classList.remove('btn-gold');
      btn.classList.add('btn-ghost');

    }

  });

  renderProducts();

}


// ==========================================================================
// MOBILE MENU DRAWER
// ==========================================================================

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('active');
  }
}
window.toggleMobileMenu = toggleMobileMenu;

// ==========================================================================
// CART DRAWER
// ==========================================================================

function toggleCart() {

  const overlay = document.getElementById('cart-overlay');

  if (overlay) {
    overlay.classList.toggle('active');
  }

}


// ==========================================================================
// ADD PRODUCT DIRECTLY
// ==========================================================================

function addToCartDirect(productId) {

  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) return;

  const defaultSize = product.sizes[0];

  addToCart(
    product,
    defaultSize.label,
    defaultSize.price
  );

}


// ==========================================================================
// ADD TO CART
// ==========================================================================

function addToCart(product, sizeLabel, price) {

  const cartItemIndex = cart.findIndex(
    item =>
      item.product.id === product.id &&
      item.sizeLabel === sizeLabel
  );

  if (cartItemIndex > -1) {

    cart[cartItemIndex].quantity += 1;

  } else {

    cart.push({
      product: product,
      sizeLabel: sizeLabel,
      price: price,
      quantity: 1
    });

  }

  updateCartUI();

  toggleCart();

}


// ==========================================================================
// UPDATE QUANTITY
// ==========================================================================

function updateQuantity(index, delta) {

  if (cart[index]) {

    cart[index].quantity += delta;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

  }

  updateCartUI();

}


// ==========================================================================
// UPDATE CART UI
// ==========================================================================

function updateCartUI() {

  const cartBody =
    document.getElementById('cart-items-container');

  const cartBadge =
    document.getElementById('cart-badge');

  const cartSubtotalEl =
    document.getElementById('cart-subtotal');

  const totalItems =
    cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

  const totalPrice =
    cart.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

  if (cartBadge) {
    cartBadge.innerText = totalItems;
  }

  if (cartSubtotalEl) {
    cartSubtotalEl.innerText =
      `₹${totalPrice.toLocaleString('en-IN')}`;
  }

  if (!cartBody) return;

  if (cart.length === 0) {

    cartBody.innerHTML = `

      <div
        style="
          text-align: center;
          padding: 3rem 1rem;
          color: var(--color-cream-muted);
        "
      >

        <svg
          viewBox="0 0 24 24"
          style="
            width: 48px;
            height: 48px;
            stroke: var(--color-gold);
            fill: none;
            margin: 0 auto 1rem auto;
            opacity: 0.5;
          "
        >

          <circle cx="12" cy="12" r="10"></circle>

          <path d="M8 12h8"></path>

        </svg>

        <p
          style="
            font-family: var(--font-heading);
            font-size: 1.1rem;
            color: var(--color-cream);
          "
        >
          Your Cart is Empty
        </p>

        <p
          style="
            font-size: 0.85rem;
            margin-top: 0.5rem;
          "
        >
          Explore our pure A2 ghee & wood-pressed oils
          to add items.
        </p>

      </div>

    `;

    return;
  }

  cartBody.innerHTML = cart.map((item, idx) => `

    <div class="cart-item">

      <img
        src="${item.product.image}"
        alt="${item.product.name}"
        class="cart-item-img"
      />

      <div style="flex: 1;">

        <h4
          style="
            font-size: 0.9rem;
            font-family: var(--font-heading);
            color: var(--color-cream);
          "
        >
          ${item.product.name}
        </h4>

        <span
          style="
            font-size: 0.75rem;
            color: var(--color-gold);
          "
        >
          ${item.sizeLabel} · ₹${item.price}
        </span>

      </div>

      <div
        style="
          display: flex;
          align-items: center;
          gap: 0.5rem;
        "
      >

        <button
          onclick="updateQuantity(${idx}, -1)"
          class="qty-btn"
        >
          -
        </button>

        <span
          style="
            font-size: 0.85rem;
            font-weight: 600;
          "
        >
          ${item.quantity}
        </span>

        <button
          onclick="updateQuantity(${idx}, 1)"
          class="qty-btn"
        >
          +
        </button>

      </div>

    </div>

  `).join('');

}


// ==========================================================================
// CHECKOUT VIA WHATSAPP
// ==========================================================================

function checkoutWhatsApp() {

  if (cart.length === 0) {

    alert(
      'Aapka cart khali hai. Pehle kuch products add karein!'
    );

    return;
  }

  let text =
    `Hi Brajbhumi Food, I would like to place an order:\n\n`;

  let totalPrice = 0;

  cart.forEach((item, idx) => {

    const itemTotal =
      item.price * item.quantity;

    totalPrice += itemTotal;

    text +=
      `${idx + 1}. *${item.product.name}* ` +
      `(${item.sizeLabel}) x ${item.quantity} = ₹${itemTotal}\n`;

  });

  text += `\n*Total Amount:* ₹${totalPrice}\n`;

  text +=
    `\nPlease confirm availability and delivery details. Thank you!`;

  const encoded =
    encodeURIComponent(text);

  const waUrl =
    `https://wa.me/919845279936?text=${encoded}`;

  window.open(waUrl, '_blank');

}


// ==========================================================================
// QUICK VIEW MODAL
// ==========================================================================

function openProductModal(productId) {

  const product =
    PRODUCTS.find(p => p.id === productId);

  if (!product) return;

  currentModalProduct = product;

  currentSelectedSizeIndex = 0;

  document.getElementById('modal-img').src =
    product.image;

  document.getElementById('modal-title').innerText =
    product.name;

  document.getElementById('modal-badge').innerText =
    product.badge;

  document.getElementById('modal-desc').innerText =
    product.desc;

  const featuresList =
    document.getElementById('modal-features');

  if (featuresList) {

    featuresList.innerHTML =
      product.features.map(f => `

        <li
          style="
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.85rem;
            color: var(--color-cream-muted);
          "
        >

          <span
            style="
              color: var(--color-gold);
            "
          >
            ✦
          </span>

          ${f}

        </li>

      `).join('');

  }

  renderModalSizes();

  updateModalPrice();

  const overlay =
    document.getElementById('modal-overlay');

  if (overlay) {
    overlay.classList.add('active');
  }

}


// ==========================================================================
// MODAL SIZES
// ==========================================================================

function renderModalSizes() {

  const container =
    document.getElementById('modal-sizes-container');

  if (!container || !currentModalProduct) return;

  container.innerHTML =
    currentModalProduct.sizes.map((s, idx) => `

      <button
        onclick="selectModalSize(${idx})"
        class="size-pill ${idx === currentSelectedSizeIndex ? 'active' : ''}"
      >
        ${s.label}
      </button>

    `).join('');

}


function selectModalSize(idx) {

  currentSelectedSizeIndex = idx;

  renderModalSizes();

  updateModalPrice();

}


function updateModalPrice() {

  if (!currentModalProduct) return;

  const selected =
    currentModalProduct.sizes[currentSelectedSizeIndex];

  const priceEl =
    document.getElementById('modal-price');

  if (priceEl) {
    priceEl.innerText = `₹${selected.price}`;
  }

}


function addModalItemToCart() {

  if (!currentModalProduct) return;

  const selectedSize =
    currentModalProduct.sizes[currentSelectedSizeIndex];

  addToCart(
    currentModalProduct,
    selectedSize.label,
    selectedSize.price
  );

  closeModal();

}


function closeModal() {

  const overlay =
    document.getElementById('modal-overlay');

  if (overlay) {
    overlay.classList.remove('active');
  }

}


// ==========================================================================
// HERO SLIDER AUTO PLAY
// ==========================================================================

function startHeroSlider() {

  const slides =
    document.querySelectorAll('.hero-slide');

  const dots =
    document.querySelectorAll('.slider-dot');

  if (slides.length === 0) return;


  function showSlide(index) {

    slides.forEach((s, idx) => {

      const isActive =
        idx === index;

      s.classList.toggle(
        'active',
        isActive
      );

      const video =
        s.querySelector('video');

      if (video) {

        video.muted = true;

        if (isActive) {

          video.play().catch(() => { });

        } else {

          video.pause();

          video.currentTime = 0;

        }

      }

    });


    dots.forEach((d, idx) => {

      d.classList.toggle(
        'active',
        idx === index
      );

    });

    currentSlide = index;

  }


  window.setSlide = function (index) {

    showSlide(index);

    resetInterval();

  };


  function nextSlide() {

    const nextIndex =
      (currentSlide + 1) % slides.length;

    showSlide(nextIndex);

  }


  function resetInterval() {

    clearInterval(slideInterval);

    slideInterval =
      setInterval(
        nextSlide,
        6000
      );

  }


  document
    .querySelectorAll('.hero-bg-video')
    .forEach(v => {

      v.muted = true;

      v.play().catch(() => { });

    });


  showSlide(0);

  resetInterval();

}


// ==========================================================================
// MANUFACTURING VIDEOS
// ==========================================================================
// IMPORTANT:
// Ek time par sirf ek manufacturing video play hoga.
// Dusra video play karte hi pehla automatically pause hoga.
// Sab manufacturing videos default mute rahenge.
// ==========================================================================

function setupManufacturingVideos() {

  const videos =
    document.querySelectorAll('.mfg-video-player');

  if (!videos.length) return;


  videos.forEach(video => {

    // Default mute
    video.muted = true;


    // Video play hone par
    video.addEventListener('play', () => {

      // Baaki saare videos pause
      videos.forEach(otherVideo => {

        if (otherVideo !== video) {

          otherVideo.pause();

        }

      });

    });


    // Agar video manually unmute ho jaye
    // tab bhi doosra video play karne par
    // ye pause ho jayega.


    // Volume ko mute rakho
    video.addEventListener('volumechange', () => {

      if (!video.muted) {

        // User manually sound ON kar sakta hai.
        // Doosra video play hote hi ye pause ho jayega.

      }

    });

  });

}


// ==========================================================================
// SETUP EVENT LISTENERS
// ==========================================================================

function setupEventListeners() {

  // Sticky Header Shadow
  window.addEventListener('scroll', () => {

    const header =
      document.querySelector(
        'header.sticky-header'
      );

    if (header) {

      if (window.scrollY > 50) {

        header.classList.add('scrolled');

      } else {

        header.classList.remove('scrolled');

      }

    }

  });


  // FAQ Accordion
  document
    .querySelectorAll('.faq-button')
    .forEach(btn => {

      btn.addEventListener('click', () => {

        const item =
          btn.parentElement;

        const isActive =
          item.classList.contains('active');

        document
          .querySelectorAll('.faq-item')
          .forEach(el => {

            el.classList.remove('active');

          });


        if (!isActive) {

          item.classList.add('active');

        }

      });

    });

}