# 💎 NEXA BOOK — Librairie Digitale d'Excellence & Éditions Stratégiques

Boutique e-commerce haute conversion et librairie numérique universelle conçue pour publier et vendre **tout type d'ouvrages numériques** : Psychologie, Business, Productivité & Focus, Finances & Mindset, Relations & Clarté.

---

## ✨ Fonctionnalités & Architecture Multi-Genres

- **Direction Artistique Universelle & Prestigieuse :** Palette élégante *Obsidian Slate / Royal Sapphire / Champagne Gold* adaptée à tous les genres d'ouvrages.
- **Moteur de Catégories Dynamique :** Filtrage instantané par pills (`Psychologie`, `Business`, `Productivité`, `Finances`, `Relations`) avec compteurs automatiques.
- **Barre de Recherche Multi-Critères :** Recherche en direct par titre, catégorie, mot-clé ou auteur.
- **Modale Universelle de Détails & Sommaire :** Permet à n'importe quel livre du catalogue d'afficher son résumé, son sommaire complet chapitre par chapitre, ses bonus inclus et son bouton d'achat direct Chariow.
- **Pages de Vente Dédiées Long-Form en 14 Étapes :** Conservées pour les bestsellers phares avec capsules vidéo YouTube, ateliers et avis dédiés.
- **100% Bilingue (Français 🇫🇷 & English 🇬🇧) :** Bascule instantanée du catalogue, des devises et des fiches produits.
- **Conversion Multi-Devises en Temps Réel :** `XOF (FCFA)`, `EUR (€)`, `USD ($)`, `CAD ($)`, `GBP (£)` au tarif uniforme de **2 950 FCFA ≈ 4,50 € ≈ $5.25**.
- **Tunnel de Paiement Chariow Intégré :** Liens directs vers les checkouts sécurisés par livre.
- **Guide Finder Interactif (Quiz) :** Diagnostic en 3 questions orientant l'utilisateur vers le livre idéal selon son objectif.

---

## 📖 Comment ajouter un nouveau livre dans la boutique ?

Grâce au moteur dynamique de `app.js`, vous pouvez ajouter un nouveau livre en **30 secondes** sans toucher au code HTML :

1. Déposez la photo de couverture dans le dossier `assets/` (ex: `cover_mon_livre.jpg`).
2. Ouvrez [app.js](file:///c:/Users/samue/Downloads/ebook/app.js) et ajoutez l'objet du livre dans le tableau `products` :

```javascript
{
  id: 'mon_nouveau_livre',
  title: 'Titre de Votre Nouveau Livre',
  category: 'business', // ou 'psychology', 'productivity', 'mindset', 'relations'
  author: 'Nexa Book Éditions',
  pages: 75,
  badge: 'Nouveau',
  badgeClass: 'featured',
  rating: 4.95,
  reviewsCount: '320+ avis',
  pitch: 'Résumé percutant de votre ouvrage...',
  perks: [
    'Méthode étape par étape',
    'Fiches d action & Checklists',
    'Modèles prêts à l emploi'
  ],
  chapters: [
    { num: '01', title: 'Fondations et diagnostic initial' },
    { num: '02', title: 'Mise en place de la stratégie' },
    { num: '03', title: 'Plan d action et passage aux résultats' }
  ],
  bonus: 'Fiche d action + Tableau de bord offert',
  cover: 'assets/cover_mon_livre.jpg',
  priceEur: 4.50,
  priceXof: 2950,
  priceUsd: 5.25,
  chariowUrl: 'https://nuxshwfj.mychariow.shop/prd_VOTRE_ID_CHARIOW',
  lang: 'fr'
}
```

Le livre apparaîtra **immédiatement** dans le catalogue, dans les filtres de catégories, dans la recherche et dans la modale de commande !

---

## 🚀 Lancement Local

```bash
# Avec Python
python -m http.server 3000

# Ou avec Node.js
npx serve .
```
Ouvrez ensuite votre navigateur sur `http://localhost:3000`.

---

© 2026 Nexa Book & Éditions Digitales d'Excellence. Tous droits réservés.
