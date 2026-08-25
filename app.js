/* ==========================================================================
   NEXA BOOK - APP.JS (INTERACTIVE STORE ENGINE & ROUTER)
   - SPA View Router (FR & EN Editions + Complete Bundle Sales Pages)
   - Bilingual Engine (FR / EN) with dynamic asset switching (covers, banners)
   - Real-time Multi-Currency Engine (EUR, USD, CAD, GBP, XOF)
   - Slide-out Cart Drawer with Live Promo Codes & Progress Bar
   - Real & Simulated Checkout Engine with Instant PDF Downloads
   - Diagnostic Quiz with Personalized Book Matching
   - Reviews Filter & Live Social Proof Toasts
   ========================================================================== */

// --- Global App State ---
const state = {
  currentLang: 'fr',
  currentCurrency: 'XOF', // default to FCFA or EUR
  currentView: 'home',
  appliedDiscountPercent: 0,
  cart: [],
  quizAnswers: {},
  currencyRates: {
    EUR: { symbol: '€', rate: 1.0, position: 'after' },
    USD: { symbol: '$', rate: 1.1664, position: 'before' }, // 1 € ≈ 1.1664 $
    CAD: { symbol: 'CA$', rate: 1.58, position: 'before' },
    GBP: { symbol: '£', rate: 0.85, position: 'before' },
    XOF: { symbol: 'FCFA', rate: 655.555, position: 'after' } // 4.50 € ≈ 2950 FCFA
  }
};

// --- Product Catalog Database ---
const products = {
  attached: {
    id: 'attached',
    priceEur: 4.50,
    oldPriceEur: 12.00,
    priceXOF: 2950,
    priceUSD: 5.25,
    pages: 86,
    badge: 'Master Édition N°1',
    plan: 'Plan 14 Jours',
    checkoutLinks: {
      fr: 'https://nuxshwfj.mychariow.shop/prd_8ivay7iy/checkout',
      en: 'https://nuxshwfj.mychariow.shop/prd_8ivay7iy/checkout'
    },
    covers: {
      fr: 'assets/cover_attached_fr.jpg',
      en: 'assets/cover_attached_en.jpg'
    },
    banners: {
      fr: 'assets/banner_attached_fr.jpg',
      en: 'assets/banner_attached_en.jpg'
    },
    titles: {
      fr: "Pourquoi tu t'attaches toujours aux mauvaises personnes",
      en: "Why You Always Get Attached to the Wrong People"
    },
    subtitle: {
      fr: "Comprendre tes schémas amoureux, tes choix de partenaires et apprendre à ne plus répéter les mêmes histoires.",
      en: "Understand your patterns, your choices, and how to stop repeating the same stories."
    },
    downloadName: {
      fr: "Ebook-Attachement-Schemas-Mystere-d-Amour.pdf",
      en: "Ebook-Attachment-Patterns-Love-Mystery.pdf"
    },
    pdfFile: {
      fr: 'pourquoi_tu_t_attaches_aux_mauvaises_personnes.pdf',
      en: 'why_you_always_get_attached_to_the_wrong_people.pdf'
    }
  },

  distance: {
    id: 'distance',
    priceEur: 4.50,
    oldPriceEur: 12.00,
    priceXOF: 2950,
    priceUSD: 5.25,
    pages: 50,
    badge: "Guide d'Urgence N°1",
    plan: 'Plan 7 Jours & 15 Scripts',
    checkoutLinks: {
      fr: 'https://nuxshwfj.mychariow.shop/prd_tc3bmpx4/checkout',
      en: 'https://nuxshwfj.mychariow.shop/prd_qk81p5tr/checkout'
    },
    covers: {
      fr: 'assets/cover_distance_fr.jpg',
      en: 'assets/cover_distance_en.jpg'
    },
    banners: {
      fr: 'assets/banner_distance_fr.jpg',
      en: 'assets/banner_distance_en.jpg'
    },
    titles: {
      fr: "Pourquoi il/elle s'éloigne de toi ?",
      en: "Why He/She is Moving Away From You"
    },
    subtitle: {
      fr: "Comprendre les comportements amoureux, décoder les changements et savoir quoi faire quand quelqu'un devient distant.",
      en: "Understanding emotional distance, sudden silences, and behavioral shifts without losing yourself."
    },
    downloadName: {
      fr: "Ebook-Distance-Silence-Scripts-Mystere-d-Amour.pdf",
      en: "Ebook-Distance-Silence-Scripts-Love-Mystery.pdf"
    },
    pdfFile: {
      fr: 'pourquoi_il_s_eloigne_de_toi.pdf',
      en: 'why_he_she_is_pulling_away_from_you.pdf'
    }
  },

  commit: {
    id: 'commit',
    priceEur: 4.50,
    oldPriceEur: 12.00,
    priceXOF: 2950,
    priceUSD: 5.25,
    pages: 80,
    badge: 'Guide Clarté N°1',
    plan: 'Méthode des 4 Réalités',
    checkoutLinks: {
      fr: 'https://nuxshwfj.mychariow.shop/prd_tom22hdt/checkout',
      en: 'https://nuxshwfj.mychariow.shop/prd_60f683w0/checkout'
    },
    covers: {
      fr: 'assets/cover_commit_fr.jpg',
      en: 'assets/cover_commit_en.jpg'
    },
    banners: {
      fr: 'assets/banner_commit_fr.jpg',
      en: 'assets/banner_commit_en.jpg'
    },
    titles: {
      fr: "Pourquoi il/elle t'aime mais ne s'engage pas",
      en: "Why He/She Loves You but Doesn't Commit"
    },
    subtitle: {
      fr: "Comprendre les hésitations, les signaux contradictoires et les relations qui restent toujours entre deux.",
      en: "Understand the hesitations, the mixed signals, and the relationships that stay somewhere in between."
    },
    downloadName: {
      fr: "Ebook-Engagement-Zone-Grise-Mystere-d-Amour.pdf",
      en: "Ebook-Commitment-Gray-Zone-Love-Mystery.pdf"
    },
    pdfFile: {
      fr: 'pourquoi_il_elle_t_aime_mais_ne_s_engage_pas.pdf',
      en: 'why_he_she_loves_you_but_doesnt_commit.pdf'
    }
  },

  bundle: {
    id: 'bundle',
    priceEur: 4.50,
    oldPriceEur: 12.00,
    priceXOF: 2950,
    priceUSD: 5.25,
    pages: 216,
    badge: 'Pack Trilogie Ultime (Offre 2 950 FCFA)',
    plan: '3 Livres + Tous les Ateliers + Bonus VIP',
    checkoutLinks: {
      fr: 'https://nuxshwfj.mychariow.shop/prd_8ivay7iy/checkout',
      en: 'https://nuxshwfj.mychariow.shop/prd_60f683w0/checkout'
    },
    covers: {
      fr: 'assets/bundle_mockup.jpg',
      en: 'assets/bundle_mockup.jpg'
    },
    banners: {
      fr: 'assets/bundle_mockup.jpg',
      en: 'assets/bundle_mockup.jpg'
    },
    titles: {
      fr: "Pack Intégral : La Trilogie Cœur Souverain (3 Livres)",
      en: "Complete Sovereign Heart Trilogy (3 Master Books)"
    },
    subtitle: {
      fr: "L'écosystème intégral : Schémas amoureux + Distance & Scripts + Engagement & 4 Réalités.",
      en: "The full relationship ecosystem: Patterns & Healing + Distance & Scripts + Commitment Mastery."
    },
    downloadName: {
      fr: "Pack-Trilogie-Complete-Mystere-d-Amour-VIP.zip",
      en: "Complete-Trilogy-Bundle-Love-Mystery-VIP.zip"
    },
    pdfFiles: {
      fr: [
        { title: "Pourquoi tu t'attaches aux mauvaises personnes", file: 'pourquoi_tu_t_attaches_aux_mauvaises_personnes.pdf' },
        { title: "Pourquoi il/elle s'éloigne de toi", file: 'pourquoi_il_s_eloigne_de_toi.pdf' },
        { title: "Pourquoi il/elle t'aime mais ne s'engage pas", file: 'pourquoi_il_elle_t_aime_mais_ne_s_engage_pas.pdf' }
      ],
      en: [
        { title: "Why You Always Get Attached to the Wrong People", file: 'why_you_always_get_attached_to_the_wrong_people.pdf' },
        { title: "Why He/She is Moving Away From You", file: 'why_he_she_is_pulling_away_from_you.pdf' },
        { title: "Why He/She Loves You but Doesn't Commit", file: 'why_he_she_loves_you_but_doesnt_commit.pdf' }
      ]
    }
  }
};

// --- Customer Testimonials Database ---
const reviewsData = [
  {
    book: 'attached',
    name: 'Clara M., 29 ans',
    city: 'Bordeaux',
    rating: 5,
    date: 'Il y a 2 jours',
    text: "J'avais l'impression d'être maudite en amour. Je tombais systématiquement sur des personnes qui soufflaient le chaud et le froid. Le chapitre 2 sur la répétition de l'inachevé m'a mise en larmes. Pour la première fois, j'ai compris mon propre système nerveux. Le plan de 14 jours m'a libérée."
  },
  {
    book: 'distance',
    name: 'Thomas D., 34 ans',
    city: 'Lyon',
    rating: 5,
    date: 'Il y a 3 jours',
    text: "Après 6 mois de relation, elle est devenue distante et répondait en 8 heures. J'étais à deux doigts d'exploser et de lui envoyer un pavé plein de reproches. J'ai acheté ce livre à 23h, lu d'une traite et utilisé le Script 8. Le résultat a été immédiat : elle s'est excusée et le respect est revenu."
  },
  {
    book: 'commit',
    name: 'Sarah L., 31 ans',
    city: 'Paris',
    rating: 5,
    date: 'Il y a 4 jours',
    text: "Un an et demi dans un « presque-couple ». Il disait m'aimer mais ne voulait pas d'étiquette. La méthode des 4 Réalités m'a ouvert les yeux. J'ai conduit la conversation en 6 étapes sans trembler. Quand il a esquivé, j'ai eu le courage de partir. Deux mois plus tard, je vis enfin en paix."
  },
  {
    book: 'attached',
    name: 'Julien B., 27 ans',
    city: 'Bruxelles',
    rating: 5,
    date: 'Il y a 5 jours',
    text: "Ce livre devrait être remboursé par la sécurité sociale ! Enfin un ouvrage qui ne tombe pas dans le cliché « tous des toxiques », mais qui explique scientifiquement pourquoi l'anxieux court après l'évitant et comment inverser la tendance."
  },
  {
    book: 'distance',
    name: 'Élodie K., 36 ans',
    city: 'Montréal',
    rating: 5,
    date: 'Il y a 6 jours',
    text: "Les 15 scripts sont du pur génie. Plus jamais je ne passerai mes soirées à attendre un message le cœur battant. Le protocole de désamorçage en 7 étapes a calmé mon anxiété dès le premier soir."
  },
  {
    book: 'commit',
    name: 'Maxime R., 41 ans',
    city: 'Genève',
    rating: 5,
    date: 'Il y a 1 semaine',
    text: "Une clarté chirurgicale. J'ai pris le Pack Trilogie et les 3 livres se complètent à la perfection. La mise en page est magnifique et les cahiers d'exercices permettent de vraiment passer à l'action."
  },
  {
    book: 'attached',
    name: 'Amandine P., 26 ans',
    city: 'Nantes',
    rating: 5,
    date: 'Il y a 1 semaine',
    text: "Le concept de dopamine et de récompense intermittente a été une révélation. J'ai compris que mon 'amour fou' n'était en réalité qu'un sevrage d'attention. Depuis le plan de 14 jours, mes critères ont totalement changé !"
  },
  {
    book: 'distance',
    name: 'Karim S., 30 ans',
    city: 'Lille',
    rating: 5,
    date: 'Il y a 9 jours',
    text: "Je n'avais jamais vu de scripts aussi bien formulés. Pas de jeux d'ego puérils, mais une posture digne, posée et souveraine qui désarme totalement la fuite de l'autre."
  },
  {
    book: 'commit',
    name: 'Nathalie V., 38 ans',
    city: 'Toulouse',
    rating: 5,
    date: 'Il y a 10 jours',
    text: "Le tableau du 'Je ne sais pas' traduit au mot près ce que je vivais depuis 2 ans. Arrêter d'attendre et poser mes limites a été la décision la plus salvatrice de ma vie de femme."
  }
];

// --- Live Social Toast Simulated Users ---
const liveToastsList = [
  { name: 'Sophie de Lyon', book: 'attached', time: 'Il y a 2 minutes' },
  { name: 'Antoine de Paris', book: 'bundle', time: 'Il y a 4 minutes' },
  { name: 'Mélanie de Bruxelles', book: 'distance', time: 'Il y a 6 minutes' },
  { name: 'David de Genève', book: 'commit', time: 'Il y a 8 minutes' },
  { name: 'Inès de Montréal', book: 'attached', time: 'Il y a 11 minutes' },
  { name: 'Lucas de Marseille', book: 'bundle', time: 'Il y a 14 minutes' }
];

// ==========================================================================
// SPA ROUTER ENGINE
// ==========================================================================
function navigateTo(viewId) {
  const cleanId = String(viewId || 'home').replace('#', '').trim() || 'home';
  state.currentView = cleanId;

  if (window.location.hash !== '#' + cleanId) {
    history.pushState(null, null, '#' + cleanId);
  }

  // Toggle active view
  const allViews = document.querySelectorAll('.app-view');
  allViews.forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${cleanId}`);
  if (targetView) {
    targetView.classList.add('active');
    window.scrollTo(0, 0);
  } else {
    // Fallback to home
    const homeView = document.getElementById('view-home');
    if (homeView) {
      homeView.classList.add('active');
      window.scrollTo(0, 0);
    }
  }

  // Update desktop active nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-nav') === cleanId) {
      link.classList.add('active');
    }
  });

  // Close mobile drawer if open
  closeMobileMenu();

  // Update Sticky Buy Bar
  updateStickyBar(cleanId);
}

function handleHashChange() {
  const hash = window.location.hash.replace('#', '').trim() || 'home';
  const validRoutes = [
    'home',
    'product-attached', 'product-distance', 'product-commit', 'product-bundle',
    'product-attached-en', 'product-distance-en', 'product-commit-en', 'product-bundle-en'
  ];
  if (validRoutes.includes(hash)) {
    navigateTo(hash);
  } else if (hash === '' || hash === '/') {
    navigateTo('home');
  }
}

// ==========================================================================
// CURRENCY CONVERSION ENGINE
// ==========================================================================
function formatPrice(eurAmount) {
  const curr = state.currentCurrency;
  const config = state.currencyRates[curr] || state.currencyRates.EUR;
  const converted = eurAmount * config.rate;

  if (curr === 'XOF') {
    return `${Math.round(converted).toLocaleString('fr-FR')} ${config.symbol}`;
  }

  const formattedNum = converted.toFixed(2);
  if (config.position === 'before') {
    return `${config.symbol}${formattedNum}`;
  } else {
    return `${formattedNum} ${config.symbol}`;
  }
}

function updateAllPricesInDOM() {
  // Update elements with data-price-eur
  document.querySelectorAll('[data-price-eur]').forEach(el => {
    const baseEur = parseFloat(el.getAttribute('data-price-eur'));
    if (!isNaN(baseEur)) {
      el.textContent = formatPrice(baseEur);
    }
  });

  // Update header cart amount
  updateCartUI();
}

function setCurrency(currCode) {
  if (state.currencyRates[currCode]) {
    state.currentCurrency = currCode;
    const config = state.currencyRates[currCode];
    const labelEl = document.getElementById('currentCurrencyLabel');
    if (labelEl) {
      labelEl.textContent = `${currCode} (${config.symbol})`;
    }
    
    document.querySelectorAll('.curr-opt').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-curr') === currCode);
    });

    updateAllPricesInDOM();
  }
}

// ==========================================================================
// BILINGUAL LANGUAGE ENGINE (FR / EN) & ASSET SWAPPER
// ==========================================================================
const i18nDict = {
  fr: {
    nav_home: "Accueil Boutique",
    nav_bestsellers: "Nos Ebooks",
    nav_quiz: "Diagnostic Gratuit",
    nav_reviews: "Avis (+25k)",
    nav_author: "L'Approche",
    tag_attached: "Schémas Inconscients",
    title_attached: "Pourquoi tu t'attaches aux mauvaises personnes",
    desc_attached_short: "Briser la répétition & Plan 14 jours",
    tag_distance: "Urgence & Silence",
    title_distance: "Pourquoi il/elle s'éloigne de toi",
    desc_distance_short: "15 Scripts situationnels & Plan 7 jours",
    tag_commit: "Zone Grise & Amour",
    title_commit: "Pourquoi il/elle t'aime mais ne s'engage pas",
    desc_commit_short: "Méthode 4 Réalités & Conversation de clarté",
    tag_bundle: "Offre Complète -65%",
    title_bundle: "Pack Trilogie Master Collection",
    desc_bundle_short: "Les 3 Ebooks + Tous les Ateliers + Bonus VIP",
    hero_pill_text: "+25 000 lecteurs guidés vers la clarté",
    hero_title_line1: "Comprenez Enfin",
    hero_title_line2: "Ce Qui Se Joue Dans Votre Cœur.",
    hero_subtitle: "Arrêtez de deviner, d'angoisser et de répéter les mêmes histoires douloureuses. La collection officielle Mystère d'Amour vous donne les clés psychologiques, les scripts et les plans d'action pour reprendre votre souveraineté affective.",
    btn_explore_catalog: "Explorer les Ebooks",
    btn_view_bundle_pack: "Voir le Pack Trilogie (-65%)",
    trust_instant: "Téléchargement instantané PDF HD",
    trust_devices: "Lisible sur Téléphone, Tablette & PC",
    trust_guarantee: "Garantie Sérénité 30 Jours",
    badge_bestseller: "BEST-SELLER N°1"
  },
  en: {
    nav_home: "Storefront",
    nav_bestsellers: "Our Ebooks",
    nav_quiz: "Free Assessment",
    nav_reviews: "Reviews (+25k)",
    nav_author: "The Framework",
    tag_attached: "Hidden Patterns",
    title_attached: "Why You Always Get Attached to the Wrong People",
    desc_attached_short: "Break the cycle & 14-day blueprint",
    tag_distance: "Urgency & Distance",
    title_distance: "Why He/She is Moving Away from You",
    desc_distance_short: "15 Situational Scripts & 7-day plan",
    tag_commit: "Gray Zone & Love",
    title_commit: "Why He/She Loves You but Doesn't Commit",
    desc_commit_short: "4 Realities Framework & Clarity Talk",
    tag_bundle: "Ultimate Bundle -65%",
    title_bundle: "The Sovereign Heart Trilogy (3 Books)",
    desc_bundle_short: "3 Master Ebooks + All Workbooks + VIP Bonuses",
    hero_pill_text: "+25,000 readers guided to clarity",
    hero_title_line1: "Finally Understand",
    hero_title_line2: "What Is Truly Happening In Your Heart.",
    hero_subtitle: "Stop guessing, stressing, and repeating painful cycles. The official Love Mystery collection gives you the psychological blueprints, conversational scripts, and action plans to reclaim your emotional sovereignty.",
    btn_explore_catalog: "Browse the Ebooks",
    btn_view_bundle_pack: "Get the Trilogy Pack (-65%)",
    trust_instant: "Instant HD PDF Download",
    trust_devices: "Mobile, iPad, Tablet & Desktop Ready",
    trust_guarantee: "30-Day Money-Back Guarantee",
    badge_bestseller: "#1 BEST-SELLER"
  }
};

function setLanguage(lang) {
  state.currentLang = lang;
  document.documentElement.lang = lang;
  
  // Update Lang button UI
  const flagEl = document.getElementById('currentLangFlag');
  if (flagEl) flagEl.textContent = lang === 'fr' ? '🇫🇷' : '🇬🇧';
  const codeEl = document.getElementById('currentLangCode');
  if (codeEl) codeEl.textContent = lang.toUpperCase();

  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update i18n text nodes
  const dict = i18nDict[lang];
  if (dict) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });
  }

  // Swap dynamic covers and banners according to language
  swapCoversAndBanners(lang);

  // If currently on a product sales page, switch to corresponding FR / EN view
  const cur = state.currentView;
  if (lang === 'en') {
    if (cur === 'product-attached') navigateTo('product-attached-en');
    else if (cur === 'product-distance') navigateTo('product-distance-en');
    else if (cur === 'product-commit') navigateTo('product-commit-en');
    else if (cur === 'product-bundle') navigateTo('product-bundle-en');
  } else if (lang === 'fr') {
    if (cur === 'product-attached-en') navigateTo('product-attached');
    else if (cur === 'product-distance-en') navigateTo('product-distance');
    else if (cur === 'product-commit-en') navigateTo('product-commit');
    else if (cur === 'product-bundle-en') navigateTo('product-bundle');
  }
}

function swapCoversAndBanners(lang) {
  // Safe helper to set src if element exists
  const setSrc = (id, src) => {
    const el = document.getElementById(id);
    if (el && src) el.src = src;
  };

  // Navigation thumbs
  setSrc('navThumbAttached', products.attached.covers[lang]);
  setSrc('navThumbDistance', products.distance.covers[lang]);
  setSrc('navThumbCommit', products.commit.covers[lang]);

  // Hero banner & Thumbs
  setSrc('heroDynamicBanner', products.attached.banners[lang]);
  setSrc('heroThumbAttached', products.attached.covers[lang]);
  setSrc('heroThumbDistance', products.distance.covers[lang]);
  setSrc('heroThumbCommit', products.commit.covers[lang]);

  // Catalog covers
  setSrc('catalogCoverAttached', products.attached.covers[lang]);
  setSrc('catalogCoverDistance', products.distance.covers[lang]);
  setSrc('catalogCoverCommit', products.commit.covers[lang]);

  // Sales pages covers & banners
  setSrc('spCoverAttached', products.attached.covers[lang]);
  setSrc('spPresBannerAttached', products.attached.banners[lang]);
  setSrc('spCoverDistance', products.distance.covers[lang]);
  setSrc('spPresBannerDistance', products.distance.banners[lang]);
  setSrc('spCoverCommit', products.commit.covers[lang]);
  setSrc('spPresBannerCommit', products.commit.banners[lang]);

  // Bundle pillars
  setSrc('bundlePillarAttached', products.attached.covers[lang]);
  setSrc('bundlePillarDistance', products.distance.covers[lang]);
  setSrc('bundlePillarCommit', products.commit.covers[lang]);
}

function switchHeroSlide(bookKey) {
  const prod = products[bookKey];
  if (!prod) return;

  const bannerImg = document.getElementById('heroDynamicBanner');
  if (bannerImg) {
    bannerImg.src = prod.banners[state.currentLang];
  }

  document.querySelectorAll('.hero-thumb-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target-book') === bookKey);
  });
}

// ==========================================================================
// SHOPPING CART SYSTEM & DRAWER
// ==========================================================================
function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

function addToCart(productId) {
  const isExplicitEn = String(productId).endsWith('_en');
  const baseKey = String(productId).replace('_en', '');
  const prod = products[baseKey] || products[productId];
  if (!prod) return;

  const lang = isExplicitEn ? 'en' : state.currentLang;
  const existing = state.cart.find(item => item.id === prod.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: prod.id,
      title: prod.titles[lang] || prod.titles.fr,
      priceEur: prod.priceEur,
      cover: prod.covers[lang] || prod.covers.fr,
      qty: 1
    });
  }

  updateCartUI();
  openCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  updateCartUI();
}

function applyCoupon() {
  const input = document.getElementById('couponInput');
  const feedback = document.getElementById('couponFeedback');
  if (!input || !feedback) return;
  const code = (input.value || '').trim().toUpperCase();

  if (code === 'CLARTE20' || code === 'NEXA20') {
    state.appliedDiscountPercent = 20;
    feedback.className = 'coupon-feedback success';
    feedback.textContent = '✅ Code promo -20% appliqué avec succès !';
  } else if (code === 'NEXA10' || code === 'LUCIDITE10') {
    state.appliedDiscountPercent = 10;
    feedback.className = 'coupon-feedback success';
    feedback.textContent = '✅ Code promo -10% appliqué avec succès !';
  } else {
    feedback.className = 'coupon-feedback error';
    feedback.textContent = '❌ Code promo invalide ou expiré.';
  }

  updateCartUI();
}

function updateCartUI() {
  const listContainer = document.getElementById('cartItemsList');
  const emptyState = document.getElementById('emptyCartState');
  const badge = document.getElementById('cartCountBadge');
  const headerTotal = document.getElementById('headerCartTotal');
  const drawerCount = document.getElementById('cartDrawerCount');
  
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountRow = document.getElementById('discountRow');
  const discountEl = document.getElementById('cartDiscount');
  const finalTotalEl = document.getElementById('cartFinalTotal');
  const modalCheckoutTotal = document.getElementById('modalCheckoutTotal');

  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (badge) badge.textContent = totalItems;
  if (drawerCount) drawerCount.textContent = `(${totalItems})`;

  let subtotalEur = state.cart.reduce((sum, item) => sum + (item.priceEur * item.qty), 0);
  let discountEur = (subtotalEur * state.appliedDiscountPercent) / 100;
  let finalTotalEur = Math.max(0, subtotalEur - discountEur);

  if (headerTotal) headerTotal.textContent = formatPrice(finalTotalEur);
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotalEur);

  if (discountRow && discountEl) {
    if (state.appliedDiscountPercent > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-${formatPrice(discountEur)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (finalTotalEl) finalTotalEl.textContent = formatPrice(finalTotalEur);
  if (modalCheckoutTotal) {
    modalCheckoutTotal.textContent = formatPrice(finalTotalEur);
  }

  // Update Progress Bar
  const progressText = document.getElementById('cartProgressText');
  const progressBar = document.getElementById('cartProgressBar');
  if (progressBar && progressText) {
    if (totalItems >= 2 || state.cart.some(i => i.id === 'bundle')) {
      progressBar.style.width = '100%';
      progressText.innerHTML = '🎉 <strong>FÉLICITATIONS !</strong> Cahier d\'intégration VIP débloqué gratuitement !';
    } else if (totalItems === 1) {
      progressBar.style.width = '50%';
      progressText.innerHTML = '🎁 Ajoutez un 2ème livre pour débloquer le Guide Bonus VIP !';
    } else {
      progressBar.style.width = '15%';
      progressText.innerHTML = '✨ Choisissez un ebook pour débuter votre commande';
    }
  }

  // Render items list
  if (listContainer) {
    if (state.cart.length === 0) {
      listContainer.innerHTML = '';
      if (emptyState) {
        listContainer.appendChild(emptyState);
        emptyState.style.display = 'block';
      }
    } else {
      if (emptyState) emptyState.style.display = 'none';
      listContainer.innerHTML = state.cart.map(item => `
        <div class="cart-item-card">
          <img src="${item.cover}" alt="${item.title}" class="cart-item-thumb">
          <div class="cart-item-info">
            <span class="cart-item-title">${item.title}</span>
            <span class="cart-item-price">${formatPrice(item.priceEur * item.qty)} ${item.qty > 1 ? `(${item.qty}x)` : ''}</span>
          </div>
          <button type="button" class="remove-item-btn" onclick="removeFromCart('${item.id}')" title="Supprimer">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `).join('');
    }
  }
}

// ==========================================================================
// CHECKOUT ENGINE & REAL PDF DOWNLOADS
// ==========================================================================
function openCheckoutModal() {
  if (state.cart.length === 0) {
    alert('Votre panier est vide. Veuillez ajouter un ebook.');
    return;
  }
  closeCart();
  const modal = document.getElementById('checkoutModal');
  const form = document.getElementById('checkoutForm');
  const success = document.getElementById('orderSuccessScreen');
  if (modal) modal.classList.add('open');
  if (form) form.style.display = 'block';
  if (success) success.style.display = 'none';
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('open');
}

function processSimulatedPayment(e) {
  e.preventDefault();
  const btn = document.getElementById('submitOrderBtn');
  const emailInput = document.getElementById('custEmail');
  const email = emailInput ? emailInput.value : 'client@nexa-book.com';

  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Traitement sécurisé en cours...';
    btn.disabled = true;
  }

  const purchasedItems = [...state.cart];

  setTimeout(() => {
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-lock"></i> Valider et Télécharger mes Ebooks';
      btn.disabled = false;
    }

    // Show success screen
    const form = document.getElementById('checkoutForm');
    const success = document.getElementById('orderSuccessScreen');
    const emailDisp = document.getElementById('confEmailDisplay');
    const orderNum = document.getElementById('confOrderNum');

    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';
    if (emailDisp) emailDisp.textContent = email;
    if (orderNum) orderNum.textContent = `#NX-${Math.floor(10000 + Math.random() * 90000)}`;

    // Build downloads list
    const dList = document.getElementById('downloadLinksList');
    const lang = state.currentLang;

    if (dList) {
      let htmlDownloads = '';
      purchasedItems.forEach(item => {
        const prod = products[item.id];
        if (prod) {
          if (item.id === 'bundle' && prod.pdfFiles) {
            const files = prod.pdfFiles[lang] || prod.pdfFiles.fr;
            htmlDownloads += `
              <div class="download-bundle-group" style="background:var(--bg-warm); padding:14px; border-radius:10px; margin-bottom:14px; border:1px solid var(--border-gold);">
                <div style="font-weight:700; color:var(--crimson-primary); margin-bottom:10px; font-size:0.95rem;">
                  <i class="fa-solid fa-box-open"></i> ${item.title} (3 Ebooks HD Inclus)
                </div>
                <div style="display:flex; flex-direction:column; gap:8px;">
                  ${files.map(f => `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; padding:10px 14px; border-radius:8px; border:1px solid var(--border-color); box-shadow:var(--shadow-subtle);">
                      <div>
                        <strong style="font-size:0.88rem; color:var(--text-main); display:block;">${f.title}</strong>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${f.file}</span>
                      </div>
                      <button type="button" class="btn btn-sm btn-primary" onclick="downloadEbookFile('${f.file}', '${f.file}')">
                        <i class="fa-solid fa-download"></i> Télécharger
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          } else {
            const realFile = prod.pdfFile ? prod.pdfFile[lang] : '';
            const filename = prod.downloadName ? prod.downloadName[lang] : `${item.title}.pdf`;
            htmlDownloads += `
              <div class="download-link-item" style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card); padding:12px 16px; border-radius:8px; border:1px solid var(--border-color); margin-bottom:10px; box-shadow:var(--shadow-subtle);">
                <div>
                  <strong style="display:block; font-size:0.9rem; color:var(--text-main);">${item.title}</strong>
                  <span style="font-size:0.75rem; color:var(--text-muted);">${filename} (PDF HD Prêt)</span>
                </div>
                <button type="button" class="btn btn-sm btn-primary" onclick="downloadEbookFile('${realFile}', '${filename}')">
                  <i class="fa-solid fa-download"></i> Télécharger
                </button>
              </div>
            `;
          }
        }
      });
      dList.innerHTML = htmlDownloads;
    }

    // Clear cart
    state.cart = [];
    updateCartUI();
  }, 1000);
}

function downloadEbookFile(realFile, filename) {
  if (realFile) {
    const link = document.createElement('a');
    link.href = realFile;
    link.download = filename || realFile;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert(`✨ Téléchargement immédiat de "${filename}" initié ! Vos bonus et fiches d'action sont prêts.`);
  }
}

// ==========================================================================
// INTERACTIVE DIAGNOSTIC QUIZ
// ==========================================================================
function selectQuizAnswer(questionNum, bookRecommendation) {
  state.quizAnswers[questionNum] = bookRecommendation;

  const currentStep = document.querySelector(`.quiz-step[data-step="${questionNum}"]`);
  if (currentStep) currentStep.classList.remove('active');

  if (questionNum < 3) {
    const nextStep = document.querySelector(`.quiz-step[data-step="${questionNum + 1}"]`);
    if (nextStep) nextStep.classList.add('active');
  } else {
    // Show results
    showQuizResult();
  }
}

function showQuizResult() {
  // Count most frequent answer
  const counts = { attached: 0, distance: 0, commit: 0 };
  Object.values(state.quizAnswers).forEach(val => {
    if (counts[val] !== undefined) counts[val]++;
  });

  let bestMatch = 'attached';
  if (counts.distance > counts.attached && counts.distance >= counts.commit) bestMatch = 'distance';
  if (counts.commit > counts.attached && counts.commit > counts.distance) bestMatch = 'commit';

  const prod = products[bestMatch];
  const lang = state.currentLang;

  const resultContainer = document.getElementById('quizResultBox');
  const cardContainer = document.getElementById('quizRecommendedCard');

  if (cardContainer && prod) {
    cardContainer.innerHTML = `
      <img src="${prod.covers[lang]}" alt="${prod.titles[lang]}" class="rec-thumb">
      <div class="rec-details">
        <span class="badge-featured" style="margin-bottom:8px;">${prod.badge}</span>
        <h4>${prod.titles[lang]}</h4>
        <p>${prod.subtitle[lang]}</p>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-sm" onclick="addToCart('${bestMatch}')">
            <i class="fa-solid fa-cart-plus"></i> Commander ce guide (${formatPrice(prod.priceEur)})
          </button>
          <button type="button" class="btn btn-outline btn-sm" onclick="navigateTo('product-${bestMatch}')">
            Lire la page de vente
          </button>
        </div>
      </div>
    `;
  }

  if (resultContainer) {
    resultContainer.style.display = 'block';
  }
}

function resetQuiz() {
  state.quizAnswers = {};
  const resBox = document.getElementById('quizResultBox');
  if (resBox) resBox.style.display = 'none';
  document.querySelectorAll('.quiz-step').forEach((step, idx) => {
    step.classList.toggle('active', idx === 0);
  });
}

function scrollToQuiz() {
  navigateTo('home');
  setTimeout(() => {
    const el = document.getElementById('quiz-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 200);
}

function scrollToReviews() {
  navigateTo('home');
  setTimeout(() => {
    const el = document.getElementById('reviews-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 200);
}

function scrollToAuthor() {
  navigateTo('home');
  setTimeout(() => {
    const el = document.getElementById('author-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 200);
}

// ==========================================================================
// REVIEWS MASONRY & FILTERING
// ==========================================================================
function renderReviews(filter = 'all') {
  const container = document.getElementById('reviewsGrid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? reviewsData 
    : reviewsData.filter(r => r.book === filter);

  container.innerHTML = filtered.map(r => `
    <div class="review-card">
      <div>
        <div class="rev-top">
          <div class="rev-stars">
            ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}
          </div>
          <span class="rev-verified"><i class="fa-solid fa-circle-check"></i> Achat Vérifié</span>
        </div>
        <p class="rev-text">« ${r.text} »</p>
      </div>
      <div class="rev-author-group">
        <div class="rev-avatar">${r.name.substring(0, 2).toUpperCase()}</div>
        <div class="rev-meta">
          <strong>${r.name}</strong>
          <span>${r.city} • ${r.date}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function filterReviews(filterKey) {
  document.querySelectorAll('.rev-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === filterKey);
  });
  renderReviews(filterKey);
}

// ==========================================================================
// LIVE PURCHASE TOAST SIMULATOR
// ==========================================================================
let toastIndex = 0;
function showPurchaseToast() {
  const toast = document.getElementById('purchaseToast');
  if (!toast) return;

  const item = liveToastsList[toastIndex % liveToastsList.length];
  toastIndex++;

  const prod = products[item.book];
  if (!prod) return;

  const userEl = document.getElementById('toastUser');
  const bookEl = document.getElementById('toastBook');
  const imgEl = document.getElementById('toastCoverImg');

  if (userEl) userEl.textContent = item.name;
  if (bookEl) bookEl.textContent = prod.titles[state.currentLang] || prod.titles.fr;
  if (imgEl) imgEl.src = prod.covers[state.currentLang] || prod.covers.fr;

  toast.classList.add('show');

  setTimeout(() => {
    hideToast();
  }, 5000);
}

function hideToast() {
  const toast = document.getElementById('purchaseToast');
  if (toast) toast.classList.remove('show');
}

// ==========================================================================
// STICKY BUY BAR & FAQ ACCORDIONS
// ==========================================================================
function updateStickyBar(viewId) {
  const bar = document.getElementById('stickyBuyBar');
  if (!bar) return;

  const titleEl = document.getElementById('stickyBookTitle');
  const priceEl = document.getElementById('stickyBookPrice');

  if (viewId === 'product-attached' || viewId === 'product-attached-en') {
    bar.classList.add('active');
    if (titleEl) titleEl.textContent = products.attached.titles[state.currentLang];
    if (priceEl) priceEl.textContent = formatPrice(products.attached.priceEur);
  } else if (viewId === 'product-distance' || viewId === 'product-distance-en') {
    bar.classList.add('active');
    if (titleEl) titleEl.textContent = products.distance.titles[state.currentLang];
    if (priceEl) priceEl.textContent = formatPrice(products.distance.priceEur);
  } else if (viewId === 'product-commit' || viewId === 'product-commit-en') {
    bar.classList.add('active');
    if (titleEl) titleEl.textContent = products.commit.titles[state.currentLang];
    if (priceEl) priceEl.textContent = formatPrice(products.commit.priceEur);
  } else if (viewId === 'product-bundle' || viewId === 'product-bundle-en') {
    bar.classList.add('active');
    if (titleEl) titleEl.textContent = products.bundle.titles[state.currentLang];
    if (priceEl) priceEl.textContent = formatPrice(products.bundle.priceEur);
  } else {
    bar.classList.remove('active');
  }
}

function handleStickyBuy() {
  if (state.currentView.startsWith('product-attached')) addToCart('attached');
  else if (state.currentView.startsWith('product-distance')) addToCart('distance');
  else if (state.currentView.startsWith('product-commit')) addToCart('commit');
  else if (state.currentView.startsWith('product-bundle')) addToCart('bundle');
}

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
  if (!isOpen) {
    item.classList.add('open');
  }
}

// ==========================================================================
// SEARCH MODAL ENGINE
// ==========================================================================
function initSearchEngine() {
  const searchTrigger = document.getElementById('searchTriggerBtn');
  const searchModal = document.getElementById('searchModal');
  const closeBtn = document.getElementById('closeSearchModalBtn');
  const input = document.getElementById('liveSearchInput');
  const resultsList = document.getElementById('searchResultsList');

  if (searchTrigger && searchModal) {
    searchTrigger.addEventListener('click', () => {
      searchModal.classList.add('open');
      if (input) input.focus();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        searchModal.classList.remove('open');
      });
    }

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.classList.remove('open');
    });

    if (input && resultsList) {
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (!q) {
          resultsList.innerHTML = '';
          return;
        }

        const matches = Object.values(products).filter(p => 
          p.titles.fr.toLowerCase().includes(q) || 
          p.titles.en.toLowerCase().includes(q) ||
          p.subtitle.fr.toLowerCase().includes(q)
        );

        if (matches.length === 0) {
          resultsList.innerHTML = '<div style="padding:16px; color:var(--text-muted); text-align:center;">Aucun livre correspondant à votre recherche.</div>';
        } else {
          resultsList.innerHTML = matches.map(m => `
            <div class="search-res-item" onclick="navigateTo('product-${m.id}'); document.getElementById('searchModal').classList.remove('open');">
              <img src="${m.covers[state.currentLang]}" alt="${m.titles[state.currentLang]}">
              <div>
                <strong>${m.titles[state.currentLang]}</strong>
                <div style="font-size:0.78rem; color:var(--crimson-primary); font-weight:700;">${formatPrice(m.priceEur)} • ${m.pages} Pages</div>
              </div>
            </div>
          `).join('');
        }
      });
    }
  }
}

// ==========================================================================
// APP INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Init Reviews
  renderReviews('all');

  // Init Search
  initSearchEngine();

  // Dropdown Toggles (Lang & Currency)
  const langBtn = document.getElementById('langSwitchBtn');
  const currBtn = document.getElementById('currencySwitchBtn');

  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langBtn.classList.toggle('open');
      if (currBtn) currBtn.classList.remove('open');
    });
  }

  if (currBtn) {
    currBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currBtn.classList.toggle('open');
      if (langBtn) langBtn.classList.remove('open');
    });
  }

  document.addEventListener('click', () => {
    if (langBtn) langBtn.classList.remove('open');
    if (currBtn) currBtn.classList.remove('open');
  });

  // Lang selection
  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });

  // Currency selection
  document.querySelectorAll('.curr-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      setCurrency(btn.getAttribute('data-curr'));
    });
  });

  // Mobile Drawer
  const mobileToggle = document.getElementById('mobileNavToggle');
  const closeMobileBtn = document.getElementById('closeMobileDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => mobileDrawer.classList.add('open'));
  }
  if (closeMobileBtn && mobileDrawer) {
    closeMobileBtn.addEventListener('click', () => mobileDrawer.classList.remove('open'));
  }

  // Cart Trigger
  const cartBtn = document.getElementById('openCartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
  }

  // Payment mode tabs in Checkout
  document.querySelectorAll('.pay-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const input = tab.querySelector('input');
      const method = input ? input.value : 'card';
      const cardFields = document.getElementById('cardSimFields');
      if (cardFields) {
        cardFields.style.display = method === 'card' ? 'block' : 'none';
      }
    });
  });

  // Hash change routing
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();

  // Periodic Social Toast Notification
  setInterval(showPurchaseToast, 12000);
  setTimeout(showPurchaseToast, 4000);
});

function closeMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) drawer.classList.remove('open');
}

function redirectToChariow(productId) {
  const isExplicitEn = String(productId).endsWith('_en');
  const baseKey = String(productId).replace('_en', '');
  const prod = products[baseKey] || products[productId];
  if (!prod) return;
  const targetLang = isExplicitEn ? 'en' : (state.currentLang || 'fr');
  const link = prod.checkoutLinks[targetLang] || prod.checkoutLinks.en || prod.checkoutLinks.fr;
  window.open(link, '_blank');
}
