/* ==========================================================================
   NEXA BOOK - APP.JS (DIRECT CHARIOW SALES ENGINE & ROUTER)
   - SPA View Router (FR & EN Editions for the 3 Master Ebooks)
   - Bilingual Engine (FR / EN) with dynamic asset switching (covers, banners)
   - Real-time Multi-Currency Engine (EUR, USD, CAD, GBP, XOF)
   - Direct External Checkout Integration (Official Chariow Payment Platform)
   - Diagnostic Quiz with Personalized Book Matching & Direct Purchase
   - Reviews Filter & Live Social Proof Toasts
   ========================================================================== */

// --- Global App State ---
const state = {
  currentLang: 'fr',
  currentCurrency: 'EUR', // default to EUR (€)
  currentView: 'home',
  quizAnswers: {},
  currencyRates: {
    EUR: { symbol: '€', rate: 1.0, position: 'after' },
    USD: { symbol: '$', rate: 1.1664, position: 'before' }, // 1 € ≈ 1.1664 $
    CAD: { symbol: 'CA$', rate: 1.58, position: 'before' },
    GBP: { symbol: '£', rate: 0.85, position: 'before' },
    XOF: { symbol: 'FCFA', rate: 655.555, position: 'after' } // 4.50 € ≈ 2950 FCFA
  }
};

// --- Product Catalog Database (The 3 Master Books) ---
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
    avatar: 'assets/avatar_clara.jpg',
    text: "J'avais l'impression d'être maudite en amour. Je tombais systématiquement sur des personnes qui soufflaient le chaud et le froid. Le chapitre 2 sur la répétition de l'inachevé m'a mise en larmes. Pour la première fois, j'ai compris mon propre système nerveux. Le plan de 14 jours m'a libérée."
  },
  {
    book: 'distance',
    name: 'Thomas D., 34 ans',
    city: 'Lyon',
    rating: 5,
    date: 'Il y a 3 jours',
    avatar: 'assets/avatar_thomas.jpg',
    text: "Après 6 mois de relation, elle est devenue distante et répondait en 8 heures. J'étais à deux doigts d'exploser et de lui envoyer un pavé plein de reproches. J'ai acheté ce livre à 23h, lu d'une traite et utilisé le Script 8. Le résultat a été immédiat : elle s'est excusée et le respect est revenu."
  },
  {
    book: 'commit',
    name: 'Sarah L., 31 ans',
    city: 'Paris',
    rating: 5,
    date: 'Il y a 4 jours',
    avatar: 'assets/avatar_sarah.jpg',
    text: "Un an et demi dans un « presque-couple ». Il disait m'aimer mais ne voulait pas d'étiquette. La méthode des 4 Réalités m'a ouvert les yeux. J'ai conduit la conversation en 6 étapes sans trembler. Quand il a esquivé, j'ai eu le courage de partir. Deux mois plus tard, je vis enfin en paix."
  },
  {
    book: 'attached',
    name: 'Julien B., 27 ans',
    city: 'Bruxelles',
    rating: 5,
    date: 'Il y a 5 jours',
    avatar: 'assets/avatar_julien.jpg',
    text: "Ce livre devrait être remboursé par la sécurité sociale ! Enfin un ouvrage qui ne tombe pas dans le cliché « tous des toxiques », mais qui explique scientifiquement pourquoi l'anxieux court après l'évitant et comment inverser la tendance."
  },
  {
    book: 'distance',
    name: 'Élodie K., 36 ans',
    city: 'Montréal',
    rating: 5,
    date: 'Il y a 6 jours',
    avatar: 'assets/avatar_elodie.jpg',
    text: "Les 15 scripts sont du pur génie. Plus jamais je ne passerai mes soirées à attendre un message le cœur battant. Le protocole de désamorçage en 7 étapes a calmé mon anxiété dès le premier soir."
  },
  {
    book: 'commit',
    name: 'Maxime R., 41 ans',
    city: 'Genève',
    rating: 5,
    date: 'Il y a 1 semaine',
    avatar: 'assets/avatar_maxime.jpg',
    text: "Une clarté chirurgicale. La mise en page est magnifique et les cahiers d'exercices permettent de vraiment passer à l'action."
  },
  {
    book: 'attached',
    name: 'Amandine P., 26 ans',
    city: 'Nantes',
    rating: 5,
    date: 'Il y a 1 semaine',
    avatar: 'assets/avatar_amandine.jpg',
    text: "Le concept de dopamine et de récompense intermittente a été une révélation. J'ai compris que mon 'amour fou' n'était en réalité qu'un sevrage d'attention. Depuis le plan de 14 jours, mes critères ont totalement changé !"
  },
  {
    book: 'distance',
    name: 'Karim S., 30 ans',
    city: 'Lille',
    rating: 5,
    date: 'Il y a 9 jours',
    avatar: 'assets/avatar_karim.jpg',
    text: "Je n'avais jamais vu de scripts aussi bien formulés. Pas de jeux d'ego puérils, mais une posture digne, posée et souveraine qui désarme totalement la fuite de l'autre."
  },
  {
    book: 'commit',
    name: 'Nathalie V., 38 ans',
    city: 'Toulouse',
    rating: 5,
    date: 'Il y a 10 jours',
    avatar: 'assets/avatar_nathalie.jpg',
    text: "Le tableau du 'Je ne sais pas' traduit au mot près ce que je vivais depuis 2 ans. Arrêter d'attendre et poser mes limites a été la décision la plus salvatrice de ma vie de femme."
  }
];

// --- Live Social Toast Simulated Users ---
const liveToastsList = [
  { name: 'Sophie de Lyon', book: 'attached', time: 'Il y a 2 minutes' },
  { name: 'Antoine de Paris', book: 'distance', time: 'Il y a 4 minutes' },
  { name: 'Mélanie de Bruxelles', book: 'commit', time: 'Il y a 6 minutes' },
  { name: 'David de Genève', book: 'commit', time: 'Il y a 8 minutes' },
  { name: 'Inès de Montréal', book: 'attached', time: 'Il y a 11 minutes' },
  { name: 'Lucas de Marseille', book: 'distance', time: 'Il y a 14 minutes' }
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
    nav_bestsellers: "Nos 3 Ebooks",
    nav_quiz: "Diagnostic Gratuit",
    nav_reviews: "Avis (+25k)",
    nav_author: "L'Approche",
    header_action_btn: "Commander (4,50 €)",
    tag_attached: "Schémas Inconscients",
    title_attached: "Pourquoi tu t'attaches aux mauvaises personnes",
    desc_attached_short: "Briser la répétition & Plan 14 jours",
    tag_distance: "Urgence & Silence",
    title_distance: "Pourquoi il/elle s'éloigne de toi",
    desc_distance_short: "15 Scripts situationnels & Plan 7 jours",
    tag_commit: "Zone Grise & Amour",
    title_commit: "Pourquoi il/elle t'aime mais ne s'engage pas",
    desc_commit_short: "Méthode 4 Réalités & Conversation de clarté",
    hero_pill_text: "+25 000 lecteurs guidés vers la clarté",
    hero_title_line1: "Comprenez Enfin",
    hero_title_line2: "Ce Qui Se Joue Dans Votre Cœur.",
    hero_subtitle: "Arrêtez de deviner, d'angoisser et de répéter les mêmes histoires douloureuses. La collection officielle Nexa Book / Mystère d'Amour vous donne les clés psychologiques, les scripts et les plans d'action pour reprendre votre souveraineté affective.",
    btn_explore_catalog: "Explorer les 3 Ebooks (4,50 €)",
    trust_instant: "Téléchargement instantané PDF HD",
    trust_devices: "Lisible sur Téléphone, Tablette & PC",
    trust_guarantee: "Garantie Sérénité 30 Jours",
    badge_bestseller: "BEST-SELLER N°1"
  },
  en: {
    nav_home: "Storefront",
    nav_bestsellers: "Our 3 Ebooks",
    nav_quiz: "Free Assessment",
    nav_reviews: "Reviews (+25k)",
    nav_author: "The Framework",
    header_action_btn: "Get Ebook ($5.25)",
    tag_attached: "Hidden Patterns",
    title_attached: "Why You Always Get Attached to the Wrong People",
    desc_attached_short: "Break the cycle & 14-day blueprint",
    tag_distance: "Urgency & Distance",
    title_distance: "Why He/She is Moving Away from You",
    desc_distance_short: "15 Situational Scripts & 7-day plan",
    tag_commit: "Gray Zone & Love",
    title_commit: "Why He/She Loves You but Doesn't Commit",
    desc_commit_short: "4 Realities Framework & Clarity Talk",
    hero_pill_text: "+25,000 readers guided to clarity",
    hero_title_line1: "Finally Understand",
    hero_title_line2: "What Is Truly Happening In Your Heart.",
    hero_subtitle: "Stop guessing, stressing, and repeating painful cycles. The official Nexa Book / Love Mystery collection gives you the psychological blueprints, conversational scripts, and action plans to reclaim your emotional sovereignty.",
    btn_explore_catalog: "Browse the 3 Ebooks (4.50 € / $5.25)",
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
    showQuizResult();
  }
}

function showQuizResult() {
  const counts = { attached: 0, distance: 0, commit: 0 };
  Object.values(state.quizAnswers).forEach(val => {
    if (counts[val] !== undefined) counts[val]++;
  });

  let bestMatch = 'attached';
  if (counts.distance > counts.attached && counts.distance >= counts.commit) bestMatch = 'distance';
  if (counts.commit > counts.attached && counts.commit > counts.distance) bestMatch = 'commit';

  const prod = products[bestMatch] || products.attached;
  const lang = state.currentLang;
  const targetKey = lang === 'en' ? `${bestMatch}_en` : bestMatch;

  const resultContainer = document.getElementById('quizResultBox');
  const cardContainer = document.getElementById('quizRecommendedCard');

  const btnText = lang === 'en' ? `🔥 Get This Ebook ($5.25 / 4.50 €)` : `🔥 Commander ce guide (${formatPrice(prod.priceEur)})`;
  const readText = lang === 'en' ? `Read Sales Page` : `Lire la page de vente`;

  if (cardContainer && prod) {
    cardContainer.innerHTML = `
      <img src="${prod.covers[lang]}" alt="${prod.titles[lang]}" class="rec-thumb">
      <div class="rec-details">
        <span class="badge-featured" style="margin-bottom:8px;">${prod.badge}</span>
        <h4>${prod.titles[lang]}</h4>
        <p>${prod.subtitle[lang]}</p>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-top:12px;">
          <button type="button" class="btn btn-primary btn-sm shadow-glow" onclick="redirectToChariow('${targetKey}')">
            <i class="fa-solid fa-lock"></i> ${btnText}
          </button>
          <button type="button" class="btn btn-outline btn-sm" onclick="navigateTo('product-${bestMatch}${lang === 'en' ? '-en' : ''}')">
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
  } else {
    bar.classList.remove('active');
  }
}

function handleStickyBuy() {
  if (state.currentView === 'product-attached-en') redirectToChariow('attached_en');
  else if (state.currentView === 'product-attached') redirectToChariow('attached');
  else if (state.currentView === 'product-distance-en') redirectToChariow('distance_en');
  else if (state.currentView === 'product-distance') redirectToChariow('distance');
  else if (state.currentView === 'product-commit-en') redirectToChariow('commit_en');
  else if (state.currentView === 'product-commit') redirectToChariow('commit');
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
