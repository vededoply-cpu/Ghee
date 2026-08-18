// ==========================================================================
// BRAJBHUMI FOOD - E-COMMERCE & INTERACTIVE LOGIC
// ==========================================================================

// Product Database - 100% Pure Desi Cow Ghee Range
const PRODUCTS = [
  {
    id: 'cow-ghee-pure',
    name: 'Brajbhumi Pure Desi Cow A2 Ghee (500g)',
    category: 'cow-ghee',
    badge: '500g Jar · A2 Bilona',
    desc: 'Hand-churned from fresh A2 cow butter using traditional bilona method. Rich golden aroma and natural granular texture.',
    image: 'image/ghee.jpg?v=2',
    accentColor: '#bc944c',
    basePrice: 980,
    sizes: [
      { label: '500g Glass Jar', price: 980 }
    ],
    features: ['100% Pure A2 Cow Milk', 'Traditional Bilona Method', 'NABL Certified Lab Tested', 'Glass Jar Packaging']
  },
  {
    id: 'cow-ghee-1kg',
    name: 'Brajbhumi Pure Desi Cow A2 Ghee (1 Liter)',
    category: 'cow-ghee',
    badge: '1 Liter Pack · Best Value',
    desc: 'Golden, granular premium A2 cow ghee in a convenient 1 Liter glass jar, delivered direct from farm kitchens.',
    image: 'image/1kg.jpg?v=2',
    accentColor: '#e5c378',
    basePrice: 1950,
    sizes: [
      { label: '1 Liter Glass Jar', price: 1950 }
    ],
    features: ['Granular Danedar Texture', 'Zero Preservatives', 'Rich Aroma & Taste', 'Free Express Delivery']
  },
  {
    id: 'cow-ghee-5kg-tin',
    name: 'Brajbhumi Pure Desi Cow A2 Ghee (5 Liter Steel Dolchi)',
    category: 'cow-ghee',
    badge: '5 Liter · Steel Dolchi Container',
    desc: 'Pure A2 Bilona Cow Ghee in a heavy-duty traditional 5 Liter stainless steel dolchi container seal.',
    image: 'image/5kg.png?v=2',
    accentColor: '#bc944c',
    basePrice: 8900,
    sizes: [
      { label: '5 Liter Steel Dolchi Container', price: 8900 }
    ],
    features: ['100% Pure A2 Cow Ghee', 'Traditional Steel Dolchi Container', 'GC Lab Tested Pure', 'Free Express Shipping']
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
    `https://wa.me/916397180939?text=${encoded}`;

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

// ==========================================================================
// HERO SLIDER AUTO PLAY, TOUCH SWIPE & PROGRESS BAR (3 SEC TIMER)
// ==========================================================================

function startHeroSlider() {
  const heroSection = document.getElementById('home');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const progressBar = document.getElementById('slider-progress-bar');

  if (slides.length === 0) return;

  const AUTO_PLAY_TIME = 3000; // 3 Seconds
  let progressInterval = null;
  let progressStep = 0;
  let isPaused = false;

  function showSlide(index) {
    slides.forEach((s, idx) => {
      const isActive = idx === index;
      s.classList.toggle('active', isActive);

      const video = s.querySelector('video');
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
      d.classList.toggle('active', idx === index);
    });

    currentSlide = index;
    resetProgress();
  }

  function resetProgress() {
    clearInterval(progressInterval);
    progressStep = 0;
    if (progressBar) progressBar.style.width = '0%';

    if (isPaused) return;

    const updateFrequency = 30; // update every 30ms
    const totalSteps = AUTO_PLAY_TIME / updateFrequency;

    progressInterval = setInterval(() => {
      if (isPaused) return;

      progressStep++;
      const percent = Math.min((progressStep / totalSteps) * 100, 100);
      if (progressBar) progressBar.style.width = `${percent}%`;

      if (progressStep >= totalSteps) {
        clearInterval(progressInterval);
        nextSlide();
      }
    }, updateFrequency);
  }

  window.setSlide = function (index) {
    showSlide(index);
  };

  window.nextSlide = function () {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  };

  window.prevSlide = function () {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  };

  // Pause on Tap/Hold / Hover
  function pauseSlider() {
    isPaused = true;
  }

  function resumeSlider() {
    if (!isPaused) return;
    isPaused = false;
    resetProgress();
  }

  if (heroSection) {
    // Hover & Tap/Hold events
    heroSection.addEventListener('mouseenter', pauseSlider);
    heroSection.addEventListener('mouseleave', resumeSlider);
    heroSection.addEventListener('mousedown', pauseSlider);
    heroSection.addEventListener('mouseup', resumeSlider);

    // Touch Swipe Gestures for Mobile & Desktop
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseSlider();
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      resumeSlider();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (swipeDistance < -40) {
        // Swiped Left -> Next Slide
        window.nextSlide();
      } else if (swipeDistance > 40) {
        // Swiped Right -> Prev Slide
        window.prevSlide();
      }
    }
  }

  showSlide(0);
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

  // Start Social Proof Toast Rotation
  startSocialProofToast();
}


// ==========================================================================
// NABL CERTIFICATE MODAL
// ==========================================================================

function openCertModal() {
  const overlay = document.getElementById('cert-modal-overlay');
  if (overlay) overlay.classList.add('active');
}

function closeCertModal() {
  const overlay = document.getElementById('cert-modal-overlay');
  if (overlay) overlay.classList.remove('active');
}


// ==========================================================================
// INTERACTIVE GHEE USAGE CALCULATOR
// ==========================================================================

function calculateGheePack(type) {
  const btnSmall = document.getElementById('calc-btn-small');
  const btnMedium = document.getElementById('calc-btn-medium');
  const btnLarge = document.getElementById('calc-btn-large');

  const titleEl = document.getElementById('calc-pack-title');
  const descEl = document.getElementById('calc-pack-desc');
  const actionBtn = document.getElementById('calc-action-btn');

  if (!titleEl || !descEl || !actionBtn) return;

  [btnSmall, btnMedium, btnLarge].forEach(btn => {
    if (btn) btn.classList.remove('active');
  });

  if (type === 'small') {
    if (btnSmall) btnSmall.classList.add('active');
    titleEl.innerText = '500g Signature Glass Jar (₹980)';
    descEl.innerText = 'Ideal for daily spooning, morning warm water / milk ritual, and rotis for 1-2 people (~500g/month).';
    actionBtn.setAttribute('onclick', "openProductModal('cow-ghee-pure')");
  } else if (type === 'medium') {
    if (btnMedium) btnMedium.classList.add('active');
    titleEl.innerText = '1 Liter Glass Jar Value Pack (₹1,950)';
    descEl.innerText = 'Perfect for a family of 3-4 people for regular cooking, tadka, halwa, and daily wellness (~1L/month).';
    actionBtn.setAttribute('onclick', "openProductModal('cow-ghee-1kg')");
  } else if (type === 'large') {
    if (btnLarge) btnLarge.classList.add('active');
    titleEl.innerText = '5 Liter Steel Dolchi Container (₹8,900)';
    descEl.innerText = 'Best savings for large joint families, festive sweet making, and long-term pure A2 ghee storage.';
    actionBtn.setAttribute('onclick', "openProductModal('cow-ghee-5kg-tin')");
  }
}


// ==========================================================================
// LIVE SOCIAL PROOF NOTIFICATION TOAST
// ==========================================================================

const RECENT_ORDERS = [
  { name: 'Ramesh S. (Jaipur)', desc: 'Just ordered 1 Liter Pure A2 Cow Ghee', time: '2 minutes ago' },
  { name: 'Ananya R. (Bengaluru)', desc: 'Ordered 5L Steel Dolchi Container', time: '5 minutes ago' },
  { name: 'Dr. Sharma (Delhi)', desc: 'Ordered 500g Signature Glass Jar', time: '12 minutes ago' },
  { name: 'Srinivas Rao (Hyderabad)', desc: 'Ordered 5L Steel Dolchi Container', time: '18 minutes ago' },
  { name: 'Priya K. (Mumbai)', desc: 'Ordered 1 Liter Pure A2 Cow Ghee', time: '24 minutes ago' }
];

let socialProofIndex = 0;
let socialProofTimer = null;

function startSocialProofToast() {
  const toast = document.getElementById('social-proof-toast');
  const titleEl = document.getElementById('sp-title');
  const descEl = document.getElementById('sp-desc');
  const timeEl = document.getElementById('sp-time');

  if (!toast || !titleEl || !descEl || !timeEl) return;

  function showNextToast() {
    const item = RECENT_ORDERS[socialProofIndex];
    titleEl.innerText = item.name;
    descEl.innerText = item.desc;
    timeEl.innerText = item.time;

    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 4500);

    socialProofIndex = (socialProofIndex + 1) % RECENT_ORDERS.length;
  }

  // Show first toast after 4 seconds, then repeat every 10 seconds
  setTimeout(() => {
    showNextToast();
    socialProofTimer = setInterval(showNextToast, 10000);
  }, 4000);
}

function closeSocialProof() {
  const toast = document.getElementById('social-proof-toast');
  if (toast) toast.classList.remove('active');
  clearInterval(socialProofTimer);
}