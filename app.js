/* ==========================================================================
   NEXA BOOK - APP.JS (UNIVERSAL MULTI-GENRE BOOKSTORE & CHARIOW ENGINE)
   - Dynamic Multi-Genre Catalog Engine (Psychology, Business, Productivity, Mindset, Relationships)
   - Real-time Category Filtering & Keyword Search Modal
   - Dynamic Book Quick-View / Universal Modal with Chapters & Bonuses
   - Dedicated High-Converting Sales Pages Router (SPA routes)
   - Bilingual Engine (FR / EN) & Multi-Currency Engine (EUR, XOF, USD, CAD, GBP)
   - Universal Smart Guide Finder (Interactive Orientation Quiz)
   - Live Social Proof Notifications & Customer Testimonials
   ========================================================================== */

// --- Global App State ---
const state = {
  currentLang: 'fr',
  currentCurrency: 'EUR',
  currentView: 'home',
  currentCategory: 'all',
  quizAnswers: {},
  currencyRates: {
    EUR: { symbol: '€', rate: 1.0, position: 'after' },
    USD: { symbol: '$', rate: 1.1664, position: 'before' }, // 4.50 € ≈ $5.25
    CAD: { symbol: 'CA$', rate: 1.58, position: 'before' },
    GBP: { symbol: '£', rate: 0.85, position: 'before' },
    XOF: { symbol: 'FCFA', rate: 655.555, position: 'after' } // 4.50 € ≈ 2950 FCFA
  }
};

// --- Category Definitions ---
const categories = {
  all: {
    id: 'all',
    icon: 'fa-layer-group',
    names: { fr: 'Tous les Livres', en: 'All Books' }
  },
  psychology: {
    id: 'psychology',
    icon: 'fa-brain',
    names: { fr: 'Psychologie & Mental', en: 'Psychology & Mind' }
  },
  business: {
    id: 'business',
    icon: 'fa-briefcase',
    names: { fr: 'Business & Stratégie', en: 'Business & Strategy' }
  },
  productivity: {
    id: 'productivity',
    icon: 'fa-bolt',
    names: { fr: 'Productivité & Focus', en: 'Productivity & Focus' }
  },
  mindset: {
    id: 'mindset',
    icon: 'fa-coins',
    names: { fr: 'Finances & Mindset', en: 'Wealth & Mindset' }
  },
  relations: {
    id: 'relations',
    icon: 'fa-comments',
    names: { fr: 'Relations & Clarté', en: 'Relationships & Clarity' }
  }
};

// --- Universal Product Catalog Database ---
const products = {
  // 1. Attachement & Schémas Inconscients
  attached: {
    id: 'attached',
    category: 'psychology',
    categoryTag: 'cat-psychology',
    badge: 'Bestseller N°1',
    badgeClass: 'badge-featured',
    hasDedicatedSalesPage: true,
    salesPageRoute: 'product-attached',
    priceEur: 4.50,
    oldPriceEur: 12.00,
    priceXOF: 2950,
    priceUSD: 5.25,
    pages: 86,
    rating: 4.97,
    reviewsCount: 1420,
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
    author: {
      fr: "Nexa Éditions • Psychologie Clinique",
      en: "Nexa Editions • Clinical Psychology"
    },
    subtitle: {
      fr: "Comprendre tes schémas inconscients, désamorcer l'attirance pour l'indisponibilité et recâbler ton esprit avec le Plan 14 Jours.",
      en: "Understand your attachment patterns, deactivate attraction to unavailability, and rewire your heart with the 14-Day Blueprint."
    },
    perks: {
      fr: [
        "12 Chapitres approfondis (86 pages A5 HD)",
        "Questionnaire d'Auto-Lucidité diagnostique",
        "Plan 14 Jours + 5 Ateliers de Standards"
      ],
      en: [
        "12 In-Depth Chapters (86 pages A5 HD)",
        "Self-Clarity Diagnostic Assessment",
        "14-Day Action Blueprint + 5 Standards Worksheets"
      ]
    },
    chapters: [
      { num: "01", title: "L'Anatomie de l'Attachement Adulte", desc: "Comprendre les styles anxieux, évitant et sécurisant sans clichés." },
      { num: "02", title: "La Répétition de l'Inachevé", desc: "Pourquoi votre cerveau cherche inconsciemment à réparer les blessures du passé." },
      { num: "03", title: "La Dopamine de l'Incertitude", desc: "La science du renforcement intermittent et de l'addiction émotionnelle." },
      { num: "04", title: "Le Plan de 14 Jours de Recâblage", desc: "Exercices pratiques quotidiens pour réinitialiser vos standards affectifs." }
    ],
    bonuses: [
      "Diagnostic d'Auto-Lucidité (PDF)",
      "Cahier de 5 Ateliers Pratiques",
      "Fiche mémo d'ancrage émotionnel"
    ]
  },

  // 2. Distance & Silence Émotionnel
  distance: {
    id: 'distance',
    category: 'relations',
    categoryTag: 'cat-relations',
    badge: "Guide d'Urgence",
    badgeClass: 'badge-featured alert',
    hasDedicatedSalesPage: true,
    salesPageRoute: 'product-distance',
    priceEur: 4.50,
    oldPriceEur: 12.00,
    priceXOF: 2950,
    priceUSD: 5.25,
    pages: 50,
    rating: 4.92,
    reviewsCount: 980,
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
    author: {
      fr: "Nexa Éditions • Comportement & Relations",
      en: "Nexa Editions • Behavior & Dynamics"
    },
    subtitle: {
      fr: "Décoder la distance soudaine, calmer l'angoisse nerveuse et savoir exactement quoi dire grâce aux 15 Scripts Situationnels et au Plan 7 Jours.",
      en: "Decoding sudden distance, calming nervous anxiety and knowing exactly what to text with 15 situational scripts."
    },
    perks: {
      fr: [
        "Cartographie des 4 causes réelles de retrait",
        "Répertoire complet de 15 Scripts Situationnels prêts à l'emploi",
        "Plan 7 Jours & 5 Ateliers de Posture et Dignité"
      ],
      en: [
        "4 Real Root Causes of Emotional Withdrawal",
        "15 Ready-to-use Situational Word-for-Word Scripts",
        "7-Day Action Plan & 5 Dignity Worksheets"
      ]
    },
    chapters: [
      { num: "01", title: "Les 4 Causes Réelles du Retrait", desc: "Identifier immédiatement si c'est un besoin d'espace, une peur ou une manipulation." },
      { num: "02", title: "Le Protocole de Désamorçage Nerveux", desc: "Stopper la rumination et reprendre le contrôle de votre système nerveux." },
      { num: "03", title: "Les 15 Scripts Situationnels", desc: "Messages exacts mot-à-mot selon la durée du silence et le type de lien." },
      { num: "04", title: "Le Plan 7 Jours de Recouvrement", desc: "Rebâtir votre attractivité naturelle sans supplier ni courir après l'autre." }
    ],
    bonuses: [
      "Tableau récapitulatif des 15 Scripts",
      "Protocole de respiration anti-panique",
      "Guide d'analyse des signaux faibles"
    ]
  },

  // 3. Engagement & Zone Grise
  commit: {
    id: 'commit',
    category: 'relations',
    categoryTag: 'cat-relations',
    badge: 'Méthode Clarté',
    badgeClass: 'badge-featured warm',
    hasDedicatedSalesPage: true,
    salesPageRoute: 'product-commit',
    priceEur: 4.50,
    oldPriceEur: 12.00,
    priceXOF: 2950,
    priceUSD: 5.25,
    pages: 80,
    rating: 4.95,
    reviewsCount: 1150,
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
    author: {
      fr: "Nexa Éditions • Psychologie Relationnelle",
      en: "Nexa Editions • Relationship Psychology"
    },
    subtitle: {
      fr: "Sortir de la zone grise (*situationship*), maîtriser la Méthode des 4 Réalités et mener la conversation de clarté en 6 étapes sans trembler.",
      en: "Escape the situationship gray zone, master the 4 Realities Framework and lead the clarity conversation with dignity."
    },
    perks: {
      fr: [
        "Différence fondamentale Sentiments vs Capacité d'engagement",
        "Méthode des 4 Réalités Propriétaire Nexa",
        "Guide de la Conversation de Clarté en 6 Étapes"
      ],
      en: [
        "Feelings vs Commitment Capacity Diagnostic",
        "Proprietary 4 Realities Framework",
        "6-Step Sovereign Clarity Conversation Blueprint"
      ]
    },
    chapters: [
      { num: "01", title: "L'Illusion du 'Presque Couple'", desc: "Pourquoi rester dans le flou vous coûte votre estime et votre temps précieux." },
      { num: "02", title: "La Méthode des 4 Réalités", desc: "La grille d'analyse objective pour voir la vérité au-delà des belles promesses." },
      { num: "03", title: "La Conversation de Clarté en 6 Étapes", desc: "La structure exacte pour poser vos limites sans agressivité ni faiblesse." },
      { num: "04", title: "Les Décisions Courageuses", desc: "Comment avancer avec force et intégrité selon sa réponse." }
    ],
    bonuses: [
      "Structure de la conversation en 6 étapes",
      "Grille de diagnostic de disponibilité réelle",
      "Exercice d'auto-coaching de souveraineté"
    ]
  }
};

// --- Customer Testimonials Database ---
const reviewsData = [
  {
    book: 'attached',
    category: 'psychology',
    name: 'Clara M., 29 ans',
    city: 'Bordeaux',
    rating: 5,
    date: 'Il y a 2 jours',
    avatar: 'assets/avatar_clara.jpg',
    text: "Le chapitre 2 sur la répétition de l'inachevé m'a ouvert les yeux. Pour la première fois, j'ai compris pourquoi je tombais systématiquement sur des personnes émotionnellement indisponibles. Le plan de 14 jours m'a libérée."
  },
  {
    book: 'distance',
    category: 'relations',
    name: 'Thomas D., 34 ans',
    city: 'Lyon',
    rating: 5,
    date: 'Il y a 3 jours',
    avatar: 'assets/avatar_thomas.jpg',
    text: "Quand quelqu'un devient distant, le premier réflexe est de paniquer. J'ai acheté ce guide à 23h et utilisé le Script 8. Le résultat a été instantané : la conversation est redevenue calme, saine et respectueuse."
  },
  {
    book: 'commit',
    category: 'relations',
    name: 'Sarah L., 31 ans',
    city: 'Paris',
    rating: 5,
    date: 'Il y a 5 jours',
    avatar: 'assets/avatar_sarah.jpg',
    text: "Un an et demi dans un presque-couple. La méthode des 4 Réalités m'a permis de conduire la conversation de clarté en 6 étapes sans trembler et de poser mes standards."
  },
  {
    book: 'attached',
    category: 'psychology',
    name: 'Amandine P., 27 ans',
    city: 'Nantes',
    rating: 5,
    date: 'Il y a 1 semaine',
    avatar: 'assets/avatar_amandine.jpg',
    text: "Ce livre devrait être obligatoire à l'école ! En 86 pages, j'ai plus appris sur moi-même et mes choix que durant 3 ans de questionnements inutiles."
  },
  {
    book: 'distance',
    category: 'relations',
    name: 'Julien R., 31 ans',
    city: 'Marseille',
    rating: 5,
    date: 'Il y a 1 semaine',
    avatar: 'assets/avatar_julien.jpg',
    text: "Les 15 scripts sont rédigés avec une telle justesse. Aucune manipulation, que de la posture et du respect de soi. Bravo à l'équipe Nexa Book."
  },
  {
    book: 'commit',
    category: 'relations',
    name: 'Élodie V., 33 ans',
    city: 'Lille',
    rating: 5,
    date: 'Il y a 2 semaines',
    avatar: 'assets/avatar_elodie.jpg',
    text: "J'ai enfin osé poser mes limites grâce à la méthode des 4 réalités. Ce guide vaut de l'or pour toute personne coincée dans une relation ambiguë."
  }
];

// --- Live Social Toast Simulated Purchases ---
const liveToastsList = [
  { name: 'Sophie de Lyon', book: 'attached', time: 'Il y a 2 minutes' },
  { name: 'David de Genève', book: 'distance', time: 'Il y a 5 minutes' },
  { name: 'Inès de Toulouse', book: 'commit', time: 'Il y a 8 minutes' },
  { name: 'Marc de Paris', book: 'attached', time: 'Il y a 11 minutes' },
  { name: 'Émilie de Bruxelles', book: 'distance', time: 'Il y a 14 minutes' },
  { name: 'Antoine de Montréal', book: 'commit', time: 'Il y a 18 minutes' }
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
    'product-attached', 'product-distance', 'product-commit',
    'product-attached-en', 'product-distance-en', 'product-commit-en'
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

  // Re-render catalog to update card prices
  renderCatalog(state.currentCategory);
  renderEnglishCatalog();
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
// BILINGUAL LANGUAGE ENGINE (FR / EN)
// ==========================================================================
const i18nDict = {
  fr: {
    nav_home: "Accueil Boutique",
    nav_catalog: "Tous les Livres",
    nav_categories: "Catégories",
    nav_quiz: "Guide Finder (1 min)",
    nav_reviews: "Avis Lecteurs (+25k)",
    nav_author: "L'Exigence Éditoriale",
    header_action_btn: "Commander (4,50 €)",
    hero_pill_text: "+50 000 guides pratiques téléchargés",
    hero_title_line1: "L'Excellence Éditoriale",
    hero_title_line2: "Pour Transformer Votre Esprit & Vos Compétences.",
    hero_subtitle: "Des méthodes claires, des plans d'action pragmatiques et des ouvrages de référence pour votre psychologie, votre business, votre focus et vos relations.",
    btn_explore_catalog: "Explorer le Catalogue (4,50 €)",
    trust_instant: "Téléchargement immédiat PDF HD",
    trust_devices: "Lisible sur Téléphone, Tablette & PC",
    trust_guarantee: "Garantie Sérénité 30 Jours",
    badge_bestseller: "BEST-SELLER N°1"
  },
  en: {
    nav_home: "Storefront",
    nav_catalog: "All Books",
    nav_categories: "Categories",
    nav_quiz: "Guide Finder (1 min)",
    nav_reviews: "Reviews (+25k)",
    nav_author: "Editorial Quality",
    header_action_btn: "Get Ebook ($5.25)",
    hero_pill_text: "+50,000 practical guides downloaded",
    hero_title_line1: "High-Impact Publishing",
    hero_title_line2: "To Upgrade Your Mindset & Core Skills.",
    hero_subtitle: "Actionable frameworks, clear battleplans, and reference guides for psychology, business strategy, deep focus, and human dynamics.",
    btn_explore_catalog: "Browse Full Catalog ($5.25 / 4.50 €)",
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

  // Re-render dynamic elements in new language
  renderCategoryPills();
  renderCatalog(state.currentCategory);
  renderEnglishCatalog();
  swapCoversAndBanners(lang);

  // If on a sales page, route to corresponding edition
  const cur = state.currentView;
  if (lang === 'en') {
    if (cur === 'product-attached') navigateTo('product-attached-en');
    else if (cur === 'product-distance') navigateTo('product-distance-en');
    else if (cur === 'product-commit') navigateTo('product-commit-en');
  } else if (lang === 'fr') {
    if (cur === 'product-attached-en') navigateTo('product-attached');
    else if (cur === 'product-distance-en') navigateTo('product-distance');
    else if (cur === 'product-commit-en') navigateTo('product-commit');
  }
}

function swapCoversAndBanners(lang) {
  const setSrc = (id, src) => {
    const el = document.getElementById(id);
    if (el && src) el.src = src;
  };

  setSrc('heroDynamicBanner', products.attached.banners[lang]);
}

// ==========================================================================
// DYNAMIC CATALOG & CATEGORY FILTERING ENGINE
// ==========================================================================
function renderCategoryPills() {
  const container = document.getElementById('categoryPillsContainer');
  if (!container) return;

  const lang = state.currentLang;
  const allProds = Object.values(products);

  const pillsHtml = Object.values(categories).map(cat => {
    const count = cat.id === 'all' 
      ? allProds.length 
      : allProds.filter(p => p.category === cat.id).length;
    
    const isActive = state.currentCategory === cat.id ? 'active' : '';

    return `
      <button type="button" class="category-pill-btn ${isActive}" data-category="${cat.id}" onclick="filterByCategory('${cat.id}')">
        <i class="fa-solid ${cat.icon}"></i>
        <span>${cat.names[lang]}</span>
        <span class="category-count">${count}</span>
      </button>
    `;
  }).join('');

  container.innerHTML = `<div class="category-filter-nav">${pillsHtml}</div>`;
}

function filterByCategory(catId) {
  state.currentCategory = catId;
  renderCategoryPills();
  renderCatalog(catId);
}

function renderCatalog(catFilter = 'all') {
  const container = document.getElementById('dynamicCatalogGrid');
  if (!container) return;

  const lang = state.currentLang;
  const prods = Object.values(products).filter(p => {
    if (catFilter === 'all') return true;
    return p.category === catFilter;
  });

  if (prods.length === 0) {
    const catName = categories[catFilter] ? categories[catFilter].names[lang] : '';
    container.innerHTML = `
      <div style="grid-column: 1 / -1; background: #ffffff; padding: 48px 24px; border-radius: 16px; border: 1px dashed #cbd5e1; text-align: center; box-shadow: var(--shadow-sm);">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--brand-light); color: var(--brand-primary); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 16px;">
          <i class="fa-solid fa-sparkles"></i>
        </div>
        <h3 style="font-size: 1.3rem; margin-bottom: 8px; color: var(--text-primary);">Nouveaux Ouvrages "${catName}" Bientôt Disponibles</h3>
        <p style="color: var(--text-secondary); max-width: 520px; margin: 0 auto 20px; font-size: 0.95rem;">
          Nos prochains guides d'action dans cette thématique sont en cours de parution officielle. Explorez dès maintenant nos bestsellers disponibles !
        </p>
        <button type="button" class="btn btn-primary btn-sm" onclick="filterByCategory('all')">
          <i class="fa-solid fa-layer-group"></i> Voir tous les livres disponibles
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = prods.map(prod => {
    const title = prod.titles[lang] || prod.titles.fr;
    const subtitle = prod.subtitle[lang] || prod.subtitle.fr;
    const author = prod.author[lang] || prod.author.fr;
    const cover = prod.covers[lang] || prod.covers.fr;
    const perksList = (prod.perks[lang] || prod.perks.fr).map(pk => `
      <li><i class="fa-solid fa-circle-check"></i> ${pk}</li>
    `).join('');

    const buyBtnText = lang === 'en' ? 'Buy Now' : 'Acheter';
    const detailsBtnText = lang === 'en' ? 'Details & Table' : 'Détails & Sommaire';

    const detailAction = prod.hasDedicatedSalesPage 
      ? `navigateTo('${prod.salesPageRoute}${lang === 'en' ? '-en' : ''}')`
      : `openBookModal('${prod.id}')`;

    const catName = categories[prod.category] ? categories[prod.category].names[lang] : 'Guide';

    return `
      <article class="product-card" data-product-id="${prod.id}">
        <div class="card-badge-container">
          <span class="${prod.badgeClass}">${prod.badge}</span>
          <span class="cat-tag ${prod.categoryTag}">${catName}</span>
        </div>
        
        <div class="product-cover-container" onclick="${detailAction}">
          <img src="${cover}" alt="${title}" class="product-cover-img" loading="lazy">
          <div class="cover-hover-overlay">
            <span class="btn btn-sm btn-light"><i class="fa-solid fa-eye"></i> ${detailsBtnText}</span>
          </div>
        </div>

        <div class="product-card-details">
          <div class="card-rating">
            <div class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <span class="rating-text">${prod.rating}/5 (${prod.reviewsCount}+ avis)</span>
          </div>

          <h3 class="product-title" onclick="${detailAction}">
            ${title}
          </h3>
          <p class="product-author">${author} • ${prod.pages} Pages HD</p>

          <p class="product-pitch">
            ${subtitle}
          </p>

          <ul class="product-perks">
            ${perksList}
          </ul>

          <div class="product-pricing-row">
            <div class="price-box">
              <span class="old-price" data-price-eur="${prod.oldPriceEur}">${formatPrice(prod.oldPriceEur)}</span>
              <span class="current-price" data-price-eur="${prod.priceEur}">${formatPrice(prod.priceEur)}</span>
            </div>
            <div class="card-actions-group">
              <button type="button" class="btn btn-primary btn-sm shadow-glow" onclick="redirectToChariow('${prod.id}')">
                <i class="fa-solid fa-lock"></i> ${buyBtnText}
              </button>
              <button type="button" class="btn btn-outline btn-sm" onclick="${detailAction}">
                ${detailsBtnText}
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderEnglishCatalog() {
  const container = document.getElementById('dynamicEnglishCatalogGrid');
  if (!container) return;

  const prods = Object.values(products);

  container.innerHTML = prods.map(prod => {
    const title = prod.titles.en || prod.titles.fr;
    const subtitle = prod.subtitle.en || prod.subtitle.fr;
    const author = prod.author.en || prod.author.fr;
    const cover = prod.covers.en || prod.covers.fr;
    const perksList = (prod.perks.en || prod.perks.fr).map(pk => `
      <li><i class="fa-solid fa-circle-check"></i> ${pk}</li>
    `).join('');

    const detailAction = prod.hasDedicatedSalesPage 
      ? `navigateTo('${prod.salesPageRoute}-en')`
      : `openBookModal('${prod.id}')`;

    const catName = categories[prod.category] ? categories[prod.category].names.en : 'Guide';

    return `
      <article class="product-card" data-product-id="${prod.id}_en">
        <div class="card-badge-container">
          <span class="${prod.badgeClass}">English Edition</span>
          <span class="cat-tag ${prod.categoryTag}">${catName}</span>
        </div>
        
        <div class="product-cover-container" onclick="${detailAction}">
          <img src="${cover}" alt="${title}" class="product-cover-img" loading="lazy">
          <div class="cover-hover-overlay">
            <span class="btn btn-sm btn-light"><i class="fa-solid fa-eye"></i> View English Details</span>
          </div>
        </div>

        <div class="product-card-details">
          <div class="card-rating">
            <div class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <span class="rating-text">${prod.rating}/5 (${prod.reviewsCount}+ reviews)</span>
          </div>

          <h3 class="product-title" onclick="${detailAction}">
            ${title}
          </h3>
          <p class="product-author">${author} • ${prod.pages} Pages HD</p>

          <p class="product-pitch">
            ${subtitle}
          </p>

          <ul class="product-perks">
            ${perksList}
          </ul>

          <div class="product-pricing-row">
            <div class="price-box">
              <span class="old-price" data-price-eur="${prod.oldPriceEur}">${formatPrice(prod.oldPriceEur)}</span>
              <span class="current-price" data-price-eur="${prod.priceEur}">${formatPrice(prod.priceEur)}</span>
            </div>
            <div class="card-actions-group">
              <button type="button" class="btn btn-primary btn-sm shadow-glow" onclick="redirectToChariow('${prod.id}_en')">
                <i class="fa-solid fa-lock"></i> Buy Now
              </button>
              <button type="button" class="btn btn-outline btn-sm" onclick="${detailAction}">
                Details
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// UNIVERSAL BOOK DETAIL MODAL (QUICK VIEW & CHAPTERS)
// ==========================================================================
function openBookModal(productId) {
  const baseKey = String(productId).replace('_en', '');
  const prod = products[baseKey] || products[productId];
  if (!prod) return;

  const modal = document.getElementById('bookDetailModal');
  const modalContent = document.getElementById('bookModalDynamicContent');
  if (!modal || !modalContent) return;

  const lang = state.currentLang;
  const title = prod.titles[lang] || prod.titles.fr;
  const subtitle = prod.subtitle[lang] || prod.subtitle.fr;
  const author = prod.author[lang] || prod.author.fr;
  const cover = prod.covers[lang] || prod.covers.fr;
  const catName = categories[prod.category] ? categories[prod.category].names[lang] : 'Guide';

  const chaptersHtml = prod.chapters ? prod.chapters.map(ch => `
    <li class="modal-chapter-item">
      <span class="ch-num">${ch.num || '•'}</span>
      <div class="ch-text">
        <strong>${ch.title}</strong>
        <p style="margin-top:2px; font-size:0.82rem; color:var(--text-muted);">${ch.desc}</p>
      </div>
    </li>
  `).join('') : '';

  const bonusesHtml = prod.bonuses ? prod.bonuses.map(b => `
    <span class="modal-bonus-chip"><i class="fa-solid fa-gift"></i> ${b}</span>
  `).join('') : '';

  const buyBtnText = lang === 'en' 
    ? `Download Ebook Now (${formatPrice(prod.priceEur)})`
    : `Télécharger l'Ebook Immédiatement (${formatPrice(prod.priceEur)})`;

  modalContent.innerHTML = `
    <div class="book-modal-grid">
      <div class="book-modal-cover-pane">
        <span class="cat-tag ${prod.categoryTag}" style="margin-bottom:16px;">${catName}</span>
        <img src="${cover}" alt="${title}" class="book-modal-cover-img">
        <span class="${prod.badgeClass}" style="margin-bottom:12px;">${prod.badge}</span>
        <div class="book-modal-meta-specs">
          <span><i class="fa-solid fa-file-pdf"></i> PDF HD ${prod.pages} pages</span>
          <span><i class="fa-solid fa-star" style="color:#f59e0b;"></i> ${prod.rating}/5</span>
        </div>
      </div>

      <div class="book-modal-content-pane">
        <div class="modal-header-top">
          <h2 class="modal-book-title">${title}</h2>
          <p class="modal-book-author">${author}</p>
          <p class="modal-book-pitch">${subtitle}</p>
        </div>

        <h3 class="modal-section-title"><i class="fa-solid fa-list-check text-primary"></i> Sommaire & Structure Clé</h3>
        <ul class="modal-chapters-list">
          ${chaptersHtml}
        </ul>

        ${prod.bonuses ? `
          <h3 class="modal-section-title"><i class="fa-solid fa-wand-magic-sparkles text-gold"></i> Bonus Inclus Gratuitement</h3>
          <div class="modal-bonuses-row">
            ${bonusesHtml}
          </div>
        ` : ''}

        <div class="modal-checkout-footer">
          <div class="modal-pricing-box">
            <span class="modal-old-price">${formatPrice(prod.oldPriceEur)}</span>
            <span class="modal-curr-price">${formatPrice(prod.priceEur)}</span>
          </div>
          <button type="button" class="btn btn-primary modal-cta-btn shadow-glow" onclick="redirectToChariow('${prod.id}')">
            <i class="fa-solid fa-bolt"></i> ${buyBtnText}
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeBookModal() {
  const modal = document.getElementById('bookDetailModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// HERO COVER ROTATOR
// ==========================================================================
function switchHeroSlide(bookKey) {
  const prod = products[bookKey];
  if (!prod) return;

  const bannerImg = document.getElementById('heroDynamicBanner');
  if (bannerImg) {
    bannerImg.src = prod.banners[state.currentLang] || prod.banners.fr;
  }

  document.querySelectorAll('.hero-thumb-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target-book') === bookKey);
  });
}

// ==========================================================================
// UNIVERSAL SMART GUIDE FINDER (QUIZ)
// ==========================================================================
function selectQuizAnswer(questionNum, answerKey) {
  state.quizAnswers[questionNum] = answerKey;

  const currentStep = document.querySelector(`.quiz-step[data-step="${questionNum}"]`);
  if (currentStep) currentStep.classList.remove('active');

  if (questionNum < 3) {
    const nextStep = document.querySelector(`.quiz-step[data-step="${questionNum + 1}"]`);
    if (nextStep) nextStep.classList.add('active');
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  const ans1 = state.quizAnswers[1] || 'psychology';
  const ans2 = state.quizAnswers[2] || 'action';

  let targetProductKey = 'attached';
  if (ans1 === 'distance' || ans2 === 'distance') targetProductKey = 'distance';
  else if (ans1 === 'commit' || ans2 === 'commit') targetProductKey = 'commit';
  else if (ans1 === 'business' || ans1 === 'productivity' || ans1 === 'mindset') targetProductKey = 'attached';
  else targetProductKey = 'attached';

  const prod = products[targetProductKey] || products.attached;
  const lang = state.currentLang;

  const resultContainer = document.getElementById('quizResultBox');
  const cardContainer = document.getElementById('quizRecommendedCard');

  const btnText = lang === 'en' ? `Get This Ebook (${formatPrice(prod.priceEur)})` : `Commander ce guide (${formatPrice(prod.priceEur)})`;
  const readText = lang === 'en' ? `View Details` : `Découvrir le sommaire`;

  const detailAction = prod.hasDedicatedSalesPage 
    ? `navigateTo('${prod.salesPageRoute}${lang === 'en' ? '-en' : ''}')`
    : `openBookModal('${prod.id}')`;

  if (cardContainer && prod) {
    cardContainer.innerHTML = `
      <img src="${prod.covers[lang] || prod.covers.fr}" alt="${prod.titles[lang]}" class="rec-thumb" style="width:120px; border-radius:8px; box-shadow:var(--shadow-md);">
      <div class="rec-details" style="flex:1;">
        <span class="${prod.badgeClass}" style="margin-bottom:8px;">${prod.badge}</span>
        <h4>${prod.titles[lang]}</h4>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin:8px 0 14px;">${prod.subtitle[lang]}</p>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <button type="button" class="btn btn-primary btn-sm shadow-glow" onclick="redirectToChariow('${prod.id}')">
            <i class="fa-solid fa-lock"></i> ${btnText}
          </button>
          <button type="button" class="btn btn-outline btn-sm" onclick="${detailAction}">
            ${readText}
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

// ==========================================================================
// REVIEWS ENGINE
// ==========================================================================
function renderReviews(filter = 'all') {
  const container = document.getElementById('reviewsGrid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? reviewsData 
    : reviewsData.filter(r => r.category === filter || r.book === filter);

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
        <img src="${r.avatar}" alt="${r.name}" class="rev-avatar-img">
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

  const prod = products[item.book] || products.attached;
  if (!prod) return;

  const userEl = document.getElementById('toastUser');
  const bookEl = document.getElementById('toastBook');
  const imgEl = document.getElementById('toastCoverImg');

  if (userEl) userEl.textContent = item.name;
  if (bookEl) bookEl.textContent = prod.titles[state.currentLang] || prod.titles.fr;
  if (imgEl) imgEl.src = prod.covers[state.currentLang] || prod.covers.fr;

  toast.classList.add('show');
  setTimeout(hideToast, 5000);
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
  } else {
    bar.classList.remove('active');
  }
}

function handleStickyBuy() {
  if (state.currentView.includes('distance')) redirectToChariow('distance');
  else if (state.currentView.includes('commit')) redirectToChariow('commit');
  else redirectToChariow('attached');
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
  const heroSearchInput = document.getElementById('heroSearchInput');
  const searchModal = document.getElementById('searchModal');
  const closeBtn = document.getElementById('closeSearchModalBtn');
  const input = document.getElementById('liveSearchInput');
  const resultsList = document.getElementById('searchResultsList');

  const openSearch = (initialQuery = '') => {
    if (searchModal) {
      searchModal.classList.add('open');
      if (input) {
        input.value = initialQuery;
        input.focus();
        triggerSearch(initialQuery);
      }
    }
  };

  if (searchTrigger) {
    searchTrigger.addEventListener('click', () => openSearch(''));
  }

  if (heroSearchInput) {
    heroSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        openSearch(heroSearchInput.value);
      }
    });
    heroSearchInput.addEventListener('click', () => {
      openSearch(heroSearchInput.value);
    });
  }

  if (closeBtn && searchModal) {
    closeBtn.addEventListener('click', () => searchModal.classList.remove('open'));
  }

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.classList.remove('open');
    });
  }

  function triggerSearch(q) {
    const query = q.trim().toLowerCase();
    if (!query) {
      resultsList.innerHTML = '';
      return;
    }

    const matches = Object.values(products).filter(p => 
      p.titles.fr.toLowerCase().includes(query) || 
      p.titles.en.toLowerCase().includes(query) ||
      p.subtitle.fr.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsList.innerHTML = '<div style="padding:20px; color:var(--text-muted); text-align:center;">Aucun guide correspondant à votre recherche.</div>';
    } else {
      resultsList.innerHTML = matches.map(m => {
        const detailAction = m.hasDedicatedSalesPage 
          ? `navigateTo('${m.salesPageRoute}'); document.getElementById('searchModal').classList.remove('open');`
          : `openBookModal('${m.id}'); document.getElementById('searchModal').classList.remove('open');`;

        return `
          <div class="search-res-item" onclick="${detailAction}">
            <img src="${m.covers[state.currentLang] || m.covers.fr}" alt="${m.titles[state.currentLang]}">
            <div>
              <strong>${m.titles[state.currentLang]}</strong>
              <div style="font-size:0.78rem; color:var(--brand-primary); font-weight:700;">${formatPrice(m.priceEur)} • ${m.pages} Pages</div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  if (input && resultsList) {
    input.addEventListener('input', () => triggerSearch(input.value));
  }
}

// ==========================================================================
// SCROLL HELPERS
// ==========================================================================
function scrollToCatalog() {
  navigateTo('home');
  setTimeout(() => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 200);
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

function redirectToChariow(productId) {
  const isExplicitEn = String(productId).endsWith('_en');
  const baseKey = String(productId).replace('_en', '');
  const prod = products[baseKey] || products[productId];
  if (!prod) return;
  const targetLang = isExplicitEn ? 'en' : (state.currentLang || 'fr');
  const link = prod.checkoutLinks[targetLang] || prod.checkoutLinks.en || prod.checkoutLinks.fr;
  if (link) {
    window.open(link, '_blank');
  }
}

// ==========================================================================
// APP INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Init Catalog & Categories
  renderCategoryPills();
  renderCatalog('all');
  renderEnglishCatalog();

  // Init Reviews
  renderReviews('all');

  // Init default currency (EUR)
  setCurrency('EUR');

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
