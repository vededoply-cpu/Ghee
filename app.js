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
    features: ['100% Pure A2 Cow Milk', 'Traditional Bilona Method', 'NABL Certified Lab Tested', 'Glass Jar Packaging'],
    couponOffer: null
  },
  {
    id: 'cow-ghee-1kg',
    name: 'Brajbhumi Pure Desi Cow A2 Ghee (1 Liter)',
    category: 'cow-ghee',
    badge: '1 Liter Pack · ₹100 Instant Discount',
    desc: 'Golden, granular premium A2 cow ghee in a convenient 1 Liter glass jar, delivered direct from farm kitchens.',
    image: 'image/1kg.jpg?v=2',
    accentColor: '#e5c378',
    basePrice: 1950,
    sizes: [
      { label: '1 Liter Glass Jar', price: 1950 }
    ],
    features: ['Granular Danedar Texture', 'Zero Preservatives', 'Rich Aroma & Taste', 'Free Express Delivery'],
    couponOffer: { code: 'GHEE100', amount: 100, text: 'Instant ₹100 Discount Applied' }
  },
  {
    id: 'cow-ghee-5kg-tin',
    name: 'Brajbhumi Pure Desi Cow A2 Ghee (5 Liter Steel Dolchi)',
    category: 'cow-ghee',
    badge: '5 Liter · ₹300 Instant Discount',
    desc: 'Pure A2 Bilona Cow Ghee in a heavy-duty traditional 5 Liter stainless steel dolchi container seal.',
    image: 'image/5kg.png?v=2',
    accentColor: '#bc944c',
    basePrice: 8900,
    sizes: [
      { label: '5 Liter Steel Dolchi Container', price: 8900 }
    ],
    features: ['100% Pure A2 Cow Ghee', 'Traditional Steel Dolchi Container', 'GC Lab Tested Pure', 'Free Express Shipping'],
    couponOffer: { code: 'GHEE300', amount: 300, text: 'Instant ₹300 Discount Applied' }
  }
];


// ==========================================================================
// STATE MANAGEMENT & COUPON CONFIG
// ==========================================================================

const VALID_COUPONS = {
  'GHEE100': { code: 'GHEE100', discount: 100, label: '₹100 Instant Discount' },
  'NEXT100': { code: 'NEXT100', discount: 100, label: '₹100 Discount' },
  'GHEE300': { code: 'GHEE300', discount: 300, label: '₹300 Instant Discount' },
  'NEXT300': { code: 'NEXT300', discount: 300, label: '₹300 Discount' }
};

let cart = [];
let appliedCoupon = null;
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

  initFeedbackSystem();

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

  // Auto-apply instant discount coupon if not manually set
  if (product.id === 'cow-ghee-5kg-tin') {
    appliedCoupon = VALID_COUPONS['GHEE300'];
  } else if (product.id === 'cow-ghee-1kg' && (!appliedCoupon || appliedCoupon.discount < 300)) {
    appliedCoupon = VALID_COUPONS['GHEE100'];
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

// ==========================================================================
// COUPON & DISCOUNT LOGIC
// ==========================================================================

function calculateEarnedCoupon() {
  const has5kg = cart.some(item => item.product.id === 'cow-ghee-5kg-tin');
  const has1kg = cart.some(item => item.product.id === 'cow-ghee-1kg');

  if (has5kg) {
    return { code: 'GHEE300', amount: 300, label: '₹300 Next Order Coupon' };
  } else if (has1kg) {
    return { code: 'GHEE100', amount: 100, label: '₹100 Next Order Coupon' };
  }
  return null;
}

function renderCouponSectionHtml(earnedCoupon) {
  let html = '';

  // Render Earned Coupon Badge if applicable
  if (earnedCoupon) {
    html += `
      <div class="reward-earned-box">
        <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: var(--color-gold); flex-shrink: 0;"><path d="M20 6h-3.17L18.4 3.2a1 1 0 0 0-1.6-1.2L14.4 5H9.6L7.2 2a1 1 0 0 0-1.6 1.2L7.17 6H4a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h1v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8h1a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2zm-9-2h2v2h-2V4zm-6 4h14v2H5V8zm2 4h4v8H7v-8zm10 8h-4v-8h4v8z"/></svg>
        <div style="font-size: 0.775rem;">
          <strong style="color: var(--color-gold-light); display: block;">Next Order Cashback Unlocked!</strong>
          <span style="color: var(--color-cream-muted);">Buying this item unlocks code <code style="color: var(--color-gold); background: rgba(0,0,0,0.5); padding: 2px 6px; border-radius: 4px; font-weight: 700;">${earnedCoupon.code}</code> (₹${earnedCoupon.amount} OFF on next order)!</span>
        </div>
      </div>
    `;
  }

  // Render Applied Coupon or Input box
  if (appliedCoupon) {
    html += `
      <div class="coupon-applied-box">
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <span style="font-weight: 700;">${appliedCoupon.code} Applied</span>
          <span style="font-size: 0.75rem; opacity: 0.85;">(-₹${appliedCoupon.discount})</span>
        </div>
        <button onclick="removeCoupon()" style="background: none; border: none; color: #ef4444; font-size: 0.75rem; cursor: pointer; text-decoration: underline; font-weight: 600;">Remove</button>
      </div>
    `;
  } else {
    html += `
      <div style="margin-top: 0.5rem;">
        <label style="font-size: 0.75rem; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; display: block; margin-bottom: 0.25rem;">Apply Coupon Code:</label>
        <div class="coupon-input-group">
          <input type="text" id="coupon-code-input" class="coupon-input" placeholder="Enter code (e.g. GHEE100)" onkeydown="if(event.key==='Enter') applyCoupon()">
          <button onclick="applyCoupon()" class="btn-gold" style="padding: 0.5rem 0.85rem; font-size: 0.775rem;">Apply</button>
        </div>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center; margin-top: 0.35rem;">
          <span style="font-size: 0.7rem; color: var(--color-cream-muted);">Fast apply:</span>
          <button onclick="applyCoupon('GHEE100')" class="coupon-chip">GHEE100 (-₹100)</button>
          <button onclick="applyCoupon('GHEE300')" class="coupon-chip">GHEE300 (-₹300)</button>
        </div>
      </div>
    `;
  }

  return html;
}

function applyCoupon(customCode) {
  const inputEl = document.getElementById('coupon-code-input');
  const code = (customCode || (inputEl ? inputEl.value : '')).trim().toUpperCase();

  if (!code) {
    alert('Kripya coupon code enter karein! (Jaise: GHEE100 ya GHEE300)');
    return;
  }

  if (VALID_COUPONS[code]) {
    appliedCoupon = VALID_COUPONS[code];
  } else {
    const saved = getSavedCoupons();
    const found = saved.find(c => c.code === code);
    if (found) {
      appliedCoupon = { code: found.code, discount: found.discount, label: `₹${found.discount} Next Order Discount` };
    } else {
      alert(`Coupon code "${code}" valid nahi hai!\nValid Codes: GHEE100 (₹100 Off) | GHEE300 (₹300 Off)`);
      return;
    }
  }

  updateCartUI();
}

function removeCoupon() {
  appliedCoupon = null;
  updateCartUI();
}

function saveEarnedCoupon(code, discount) {
  try {
    let saved = getSavedCoupons();
    if (!saved.some(c => c.code === code)) {
      saved.push({ code, discount, date: new Date().toLocaleDateString() });
      localStorage.setItem('brajbhumi_coupons', JSON.stringify(saved));
    }
  } catch (e) {
    console.error('Error saving coupon:', e);
  }
}

function getSavedCoupons() {
  try {
    const data = localStorage.getItem('brajbhumi_coupons');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

window.applyCoupon = applyCoupon;
window.removeCoupon = removeCoupon;


// ==========================================================================
// UPDATE CART UI
// ==========================================================================

function updateCartUI() {
  const cartBody = document.getElementById('cart-items-container');
  const cartBadge = document.getElementById('cart-badge');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartDiscountRow = document.getElementById('cart-discount-row');
  const cartDiscountVal = document.getElementById('cart-discount-val');
  const cartFinalTotalEl = document.getElementById('cart-final-total');
  const couponContainer = document.getElementById('cart-coupon-section');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartBadge) {
    cartBadge.innerText = totalItems;
  }

  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = appliedCoupon.discount;
  }
  const finalTotal = Math.max(0, subtotal - discountAmount);

  if (cartSubtotalEl) {
    cartSubtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
  }

  if (cartDiscountRow && cartDiscountVal) {
    if (appliedCoupon && discountAmount > 0) {
      cartDiscountRow.style.display = 'flex';
      cartDiscountVal.innerText = `-₹${discountAmount.toLocaleString('en-IN')}`;
    } else {
      cartDiscountRow.style.display = 'none';
    }
  }

  if (cartFinalTotalEl) {
    cartFinalTotalEl.innerText = `₹${finalTotal.toLocaleString('en-IN')}`;
  }

  const earnedCoupon = calculateEarnedCoupon();

  if (couponContainer) {
    couponContainer.innerHTML = renderCouponSectionHtml(earnedCoupon);
  }

  if (!cartBody) return;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--color-cream-muted);">
        <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; stroke: var(--color-gold); fill: none; margin: 0 auto 1rem auto; opacity: 0.5;">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12h8"></path>
        </svg>
        <p style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--color-cream);">
          Your Cart is Empty
        </p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem;">
          Explore our pure A2 ghee & wood-pressed oils to add items.
        </p>
      </div>
    `;
    return;
  }

  cartBody.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img" />
      <div style="flex: 1;">
        <h4 style="font-size: 0.9rem; font-family: var(--font-heading); color: var(--color-cream);">
          ${item.product.name}
        </h4>
        <span style="font-size: 0.75rem; color: var(--color-gold);">
          ${item.sizeLabel} · ₹${item.price}
        </span>
        ${item.product.couponOffer ? `<div style="font-size: 0.7rem; color: #4ade80; margin-top: 0.2rem; font-weight: 600;">Earns ₹${item.product.couponOffer.amount} Next Order Coupon</div>` : ''}
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <button onclick="updateQuantity(${idx}, -1)" class="qty-btn">-</button>
        <span style="font-size: 0.85rem; font-weight: 600;">${item.quantity}</span>
        <button onclick="updateQuantity(${idx}, 1)" class="qty-btn">+</button>
      </div>
    </div>
  `).join('');
}


// ==========================================================================
// CHECKOUT VIA WHATSAPP
// ==========================================================================

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert('Aapka cart khali hai. Pehle kuch products add karein!');
    return;
  }

  let text = `Hi Brajbhumi Food, I would like to place an order:\n\n`;
  let subtotal = 0;

  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    text += `${idx + 1}. *${item.product.name}* (${item.sizeLabel}) x ${item.quantity} = ₹${itemTotal.toLocaleString('en-IN')}\n`;
  });

  text += `\n*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n`;

  let discount = 0;
  if (appliedCoupon) {
    discount = appliedCoupon.discount;
    text += `*Coupon Applied (${appliedCoupon.code}):* -₹${discount.toLocaleString('en-IN')}\n`;
  }

  const finalTotal = Math.max(0, subtotal - discount);
  text += `*Total Amount Payable:* ₹${finalTotal.toLocaleString('en-IN')}\n`;

  const earnedCoupon = calculateEarnedCoupon();
  if (earnedCoupon) {
    text += `\n*Next Order Offer:* You earned a *₹${earnedCoupon.amount} OFF* Coupon Code: *${earnedCoupon.code}* for your NEXT order!\n`;
    saveEarnedCoupon(earnedCoupon.code, earnedCoupon.amount);
  }

  text += `\nPlease confirm availability and delivery details. Thank you!`;

  const encoded = encodeURIComponent(text);
  const waUrl = `https://wa.me/916397180939?text=${encoded}`;
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
            •
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


// ==========================================================================
// CUSTOMER RATING & FEEDBACK SYSTEM LOGIC
// ==========================================================================

const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Sushma Sharma',
    city: 'New Delhi',
    rating: 5,
    product: '1 Liter Glass Jar',
    comment: 'Brajbhumi A2 ghee ki khushbu bilkul hamari dadi ke hath ke bilona ghee jaisi hai! Danedar texture aur golden colour ekdum pure hai. Highly recommended!',
    date: '15 Aug 2026',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Rajesh Verma',
    city: 'Jaipur, Rajasthan',
    rating: 5,
    product: '5 Liter Steel Dolchi Container',
    comment: '5L Steel Dolchi container order kiya tha. Packing bahut hi safe thi aur ghee quality unbeatable hai. Halwa aur roti par lagane se swad do guna ho jata hai.',
    date: '12 Aug 2026',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Dr. Meenakshi Sundaram',
    city: 'Bengaluru',
    rating: 5,
    product: '500g Signature Jar',
    comment: 'As a doctor, I check for A2 purity. Laboratory certificate verified pure A2 Bilona cow ghee with zero chemicals. Daily warm water with 1 spoon Ghee gives great energy!',
    date: '08 Aug 2026',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Vikramjit Singh',
    city: 'Chandigarh',
    rating: 5,
    product: '1 Liter Glass Jar',
    comment: 'Very fast delivery and 100% pure taste. Pure Bilona method ghee with natural aroma. WhatsApp order process was super smooth.',
    date: '04 Aug 2026',
    verified: true
  },
  {
    id: 'rev-5',
    name: 'Pooja Agarwal',
    city: 'Mathura, UP',
    rating: 4,
    product: '500g Signature Jar',
    comment: 'Shuddh A2 Desi cow ghee. Bilona churned aroma is very authentic. Delivery was done in 2 days. Will reorder 1L pack next time.',
    date: '01 Aug 2026',
    verified: true
  }
];

let selectedStarRating = 5;
let currentActiveRatingFilter = 'all';

const STAR_LABELS = {
  1: '1 Star · Poor (need improvement)',
  2: '2 Stars · Fair (could be better)',
  3: '3 Stars · Good (satisfied)',
  4: '4 Stars · Very Good (loved it!)',
  5: '5 Stars · Excellent! (Pure & Authentic Aroma)'
};

function getStoredReviews() {
  try {
    const local = localStorage.getItem('brajbhumi_customer_reviews');
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return INITIAL_REVIEWS;
}

function saveStoredReviews(reviews) {
  try {
    localStorage.setItem('brajbhumi_customer_reviews', JSON.stringify(reviews));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }
}

function initFeedbackSystem() {
  setupStarRatingPicker();
  renderFeedbackSummaryAndList();
}

function setupStarRatingPicker() {
  const container = document.getElementById('star-picker-container');
  const labelEl = document.getElementById('star-picker-label');
  if (!container) return;

  container.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `star-rating-btn ${i <= selectedStarRating ? 'active' : ''}`;
    btn.innerHTML = '★';
    btn.setAttribute('aria-label', `${i} Star Rating`);

    btn.addEventListener('mouseenter', () => highlightStars(i));
    btn.addEventListener('mouseleave', () => highlightStars(selectedStarRating));
    btn.addEventListener('click', () => {
      selectedStarRating = i;
      highlightStars(i);
      if (labelEl) labelEl.innerText = STAR_LABELS[i];
    });

    container.appendChild(btn);
  }
  if (labelEl) labelEl.innerText = STAR_LABELS[selectedStarRating];
}

function highlightStars(count) {
  const container = document.getElementById('star-picker-container');
  if (!container) return;
  const btns = container.querySelectorAll('.star-rating-btn');
  btns.forEach((btn, index) => {
    if (index < count) {
      btn.classList.add('hovered');
    } else {
      btn.classList.remove('hovered');
    }
  });
}

function renderFeedbackSummaryAndList() {
  const reviews = getStoredReviews();
  const summaryScoreEl = document.getElementById('feedback-avg-score');
  const summaryCountEl = document.getElementById('feedback-total-count');
  const starsHeaderEl = document.getElementById('feedback-header-stars');
  const breakdownListEl = document.getElementById('feedback-breakdown-bars');
  const reviewsContainer = document.getElementById('published-reviews-list');

  // Calculate Average and Counts
  const total = reviews.length;
  const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
  const avg = total > 0 ? (sum / total).toFixed(1) : '5.0';

  if (summaryScoreEl) summaryScoreEl.innerText = avg;
  if (summaryCountEl) summaryCountEl.innerText = `Based on ${total} verified customer ratings`;

  if (starsHeaderEl) {
    const roundedAvg = Math.round(Number(avg));
    starsHeaderEl.innerText = '★'.repeat(roundedAvg) + '☆'.repeat(5 - roundedAvg);
  }

  // Calculate breakdown for 5,4,3,2,1
  if (breakdownListEl) {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      const star = Number(r.rating) || 5;
      if (counts[star] !== undefined) counts[star]++;
    });

    breakdownListEl.innerHTML = [5, 4, 3, 2, 1].map(star => {
      const c = counts[star];
      const pct = total > 0 ? Math.round((c / total) * 100) : 0;
      return `
        <div class="rating-bar-row">
          <span class="rating-bar-label">${star} ★</span>
          <div class="rating-bar-track">
            <div class="rating-bar-fill" style="width: ${pct}%;"></div>
          </div>
          <span class="rating-bar-count">${c}</span>
        </div>
      `;
    }).join('');
  }

  // Render Reviews List with filter
  if (reviewsContainer) {
    let filtered = reviews;
    if (currentActiveRatingFilter !== 'all') {
      const targetStar = Number(currentActiveRatingFilter);
      filtered = reviews.filter(r => Number(r.rating) === targetStar);
    }

    if (filtered.length === 0) {
      reviewsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--color-cream-muted);">
          No reviews found for this rating filter yet. Be the first to leave one!
        </div>
      `;
      return;
    }

    reviewsContainer.innerHTML = filtered.map(r => `
      <div class="review-item-card">
        <div class="review-item-header">
          <div>
            <div class="review-user-name">${escapeHtml(r.name)}</div>
            <div class="review-user-meta">${escapeHtml(r.city || 'India')} · ${escapeHtml(r.date || 'Recent')}</div>
          </div>
          <span class="verified-buyer-badge">
            Verified Buyer
          </span>
        </div>
        <div class="rating-stars-gold" style="font-size: 1.1rem;">
          ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
        </div>
        <p class="review-text-content">
          "${escapeHtml(r.comment)}"
        </p>
        ${r.product ? `<span class="review-product-tag">Product: ${escapeHtml(r.product)}</span>` : ''}
      </div>
    `).join('');
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function filterReviewsByRating(star, btn) {
  currentActiveRatingFilter = star;
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  filterBtns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderFeedbackSummaryAndList();
}

function submitCustomerFeedback(event) {
  if (event) event.preventDefault();

  const nameInput = document.getElementById('feedback-name');
  const cityInput = document.getElementById('feedback-city');
  const productSelect = document.getElementById('feedback-product');
  const commentInput = document.getElementById('feedback-comment');

  const name = nameInput ? nameInput.value.trim() : '';
  const city = cityInput ? cityInput.value.trim() : '';
  const product = productSelect ? productSelect.value : '';
  const comment = commentInput ? commentInput.value.trim() : '';

  if (!name || !comment) {
    showToastNotification('Please enter your name and feedback comment!');
    return;
  }

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const newReview = {
    id: 'rev-' + Date.now(),
    name: name,
    city: city || 'India',
    rating: selectedStarRating,
    product: product || 'Brajbhumi Pure A2 Ghee',
    comment: comment,
    date: dateStr,
    verified: true
  };

  const currentList = getStoredReviews();
  currentList.unshift(newReview);
  saveStoredReviews(currentList);

  renderFeedbackSummaryAndList();

  // Reset form
  if (nameInput) nameInput.value = '';
  if (cityInput) cityInput.value = '';
  if (commentInput) commentInput.value = '';
  selectedStarRating = 5;
  setupStarRatingPicker();

  showToastNotification(`Thank you ${name}! Your ${newReview.rating}-star review has been published.`);
}

function sendFeedbackToWhatsApp() {
  const nameInput = document.getElementById('feedback-name');
  const cityInput = document.getElementById('feedback-city');
  const commentInput = document.getElementById('feedback-comment');
  const productSelect = document.getElementById('feedback-product');

  const name = nameInput ? nameInput.value.trim() : 'Valued Customer';
  const city = cityInput ? cityInput.value.trim() : '';
  const comment = commentInput ? commentInput.value.trim() : '';
  const product = productSelect ? productSelect.value : 'Pure A2 Ghee';

  const stars = '★'.repeat(selectedStarRating);

  let msg = `Hi Brajbhumi Ghee Team,%0A%0AI would like to submit my feedback & rating:%0A%0A*Rating:* ${selectedStarRating}/5 Stars (${stars})%0A*Name:* ${encodeURIComponent(name)}`;
  if (city) msg += `%0A*Location:* ${encodeURIComponent(city)}`;
  if (product) msg += `%0A*Product:* ${encodeURIComponent(product)}`;
  if (comment) msg += `%0A*Feedback:* ${encodeURIComponent(comment)}`;

  window.open(`https://wa.me/916397180939?text=${msg}`, '_blank');
}

function showToastNotification(message) {
  let toast = document.getElementById('feedback-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'feedback-toast';
    toast.className = 'feedback-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div>${message}</div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}