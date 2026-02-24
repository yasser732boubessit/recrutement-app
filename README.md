
# 📋 Gestion des Candidatures - Application Vue.js

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.3.11-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![JSON Server](https://img.shields.io/badge/JSON%20Server-0.17.3-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-4.2.1-38B2AC)
![Lucide](https://img.shields.io/badge/Lucide-Icons-F56565)
![License](https://img.shields.io/badge/license-MIT-green)

## 📑 Table des Matières
- [Aperçu du Projet](#-aperçu-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Nouveautés Version 2.0](#-nouveautés-version-20)
- [Stack Technique](#-stack-technique)
- [Design System](#-design-system)
- [Architecture du Projet](#-architecture-du-projet)
- [Installation et Configuration](#-installation-et-configuration)
- [Guide d'Utilisation](#-guide-dutilisation)
- [API Endpoints](#-api-endpoints)
- [JSON Server v0.17.3](#-json-server-v0173)
- [Choix Techniques](#-choix-techniques)
- [Améliorations Futures](#-améliorations-futures)
- [Temps de Développement](#-temps-de-développement)
- [Captures d'Écran](#-captures-décran)
- [Contact](#-contact)

---

## 🎯 Aperçu du Projet

**Gestion des Candidatures** est une application web moderne développée dans le cadre d'un test technique pour un poste de développeur Frontend. L'application permet aux recruteurs de gérer efficacement les candidatures reçues pour différents postes.

### Objectifs Principaux
- ✅ Interface intuitive pour visualiser les candidatures
- ✅ Système de filtrage avancé (statut, poste, recherche)
- ✅ Gestion en temps réel du statut des candidatures
- ✅ Ajout et consultation des commentaires
- ✅ Création et suppression de candidatures
- ✅ Expérience utilisateur optimisée (responsive, animations)

---

## ✨ Fonctionnalités

### 📊 **Tableau de Bord**
- Vue d'ensemble avec statistiques en temps réel
- Cards animées par statut (En attente, Entretien, Accepté, Refusé)
- Filtrage rapide par clic sur les statistiques
- Panneau de statistiques déroulant

### 🔍 **Système de Filtres Avancé**
- ✅ Filtre par statut (dropdown avec couleurs et icônes)
- ✅ Filtre par poste (données depuis l'API)
- ✅ Recherche en temps réel avec debounce (300ms)
- ✅ Réinitialisation rapide des filtres
- ✅ Affichage des filtres actifs sous forme de tags supprimables
- ✅ Effet sticky en scrollant

### 📋 **Liste des Candidatures**
- Deux modes d'affichage (Grille/Liste) avec persistance
- Cards informatives avec :
  - Nom du candidat
  - Poste et localisation
  - Badge de statut coloré
  - Compétences sous forme de tags
  - Expérience, salaire, disponibilité
  - Nombre de commentaires
- Changement rapide de statut via dropdown (apparaît au hover)
- Bouton de suppression avec confirmation
- Animation d'entrée/sortie des éléments

### ➕ **Création de Candidature**
- Page dédiée avec formulaire en 3 étapes :
  1. **Informations personnelles** (nom, poste, email, téléphone, localisation)
  2. **Expérience & Compétences** (expérience, disponibilité, salaire, compétences)
  3. **Documents & Finalisation** (CV, lettre de motivation)
- Barre de progression visuelle
- Validation par étape
- Récapitulatif avant soumission

### 🗑️ **Suppression de Candidature**
- Bouton de suppression sur chaque carte
- Modal de confirmation avec animation
- Feedback visuel après suppression
- Mise à jour automatique de la liste

### 📄 **Page Détail**
- Informations complètes du candidat
- Section commentaires avec historique
- Ajout de commentaires en temps réel
- Modification du statut avec sélecteur
- Lien vers le CV avec icône de téléchargement
- Bouton retour stylisé avec animation

### 🎨 **Expérience Utilisateur**
- Design responsive (mobile, tablette, desktop)
- **Police Titillium Web** pour les textes principaux
- **System UI** pour les petits labels
- Mode sombre ready
- Animations fluides (transitions, hover effects)
- États de chargement (spinners animés)
- Gestion des erreurs avec messages explicites
- États vides (empty states) avec bouton d'action
- Bouton retour en haut automatique
- Notifications toast pour feedback des actions

### 🔄 **Performance**
- Debounce sur la recherche (300ms)
- Pagination côté serveur
- Cache des données (statuts, postes)
- Optimistic updates pour les changements de statut
- Lazy loading des routes
- **Teleport** pour les modals (évite les problèmes de stacking context)

---

## 🚀 Nouveautés Version 2.0

### Version Initiale (1.0)
- ✅ Consultation des candidatures
- ✅ Filtres basiques
- ✅ Page de détail
- ✅ Commentaires

### Version 2.0 (Nouvelles fonctionnalités)
- ✅ **CRUD Complet** : Création et suppression de candidatures
- ✅ **Formulaire multi-étapes** avec validation progressive
- ✅ **Bouton de suppression** sur chaque carte
- ✅ **Modal de confirmation** avec animation
- ✅ **Police Titillium Web** intégrée
- ✅ **Icônes Lucide** remplaçant les émojis
- ✅ **Teleport** pour les modals (solution stacking context)
- ✅ **Design System** harmonisé
- ✅ **Animations** améliorées
- ✅ **Notifications toast** pour feedback utilisateur
- ✅ **Pagination** avec nombre total d'éléments

---

## 🛠 Stack Technique

### **Frontend Core**
| Technologie | Version | Utilisation |
|------------|---------|-------------|
| Vue.js | 3.3.11 | Framework principal (Composition API) |
| TypeScript | 5.2.2 | Typage statique et sécurité |
| Vite | 5.0.8 | Build tool et serveur de développement |

### **State Management & Routing**
| Technologie | Version | Utilisation |
|------------|---------|-------------|
| Pinia | 2.1.7 | Gestion d'état centralisée |
| Vue Router | 4.2.5 | Navigation entre les pages |

### **Styling & UI**
| Technologie | Version | Utilisation |
|------------|---------|-------------|
| Tailwind CSS | 4.2.1 | Framework CSS utilitaire |
| **Titillium Web** | Google Font | Police principale (texte) |
| **System UI** | - | Police pour petits labels |
| Lucide Icons | - | Bibliothèque d'icônes vectorielles |
| CSS Animations | - | Animations personnalisées |

### **API & HTTP**
| Technologie | Version | Utilisation |
|------------|---------|-------------|
| Axios | 1.6.2 | Client HTTP pour appels API |
| JSON Server | - | API REST locale (fichier db.json) |

---

## 🎨 Design System

### **Typographie**
| Élément | Police | Classe Tailwind |
|---------|--------|-----------------|
| Titres principaux | Titillium Web | `font-titillium text-4xl font-bold` |
| Textes courants | Titillium Web | `font-titillium text-sm` |
| Petits labels | System UI | `font-ui text-xs` |
| Boutons | System UI | `font-ui text-sm font-medium` |

### **Couleurs**
```css
/* Palette principale */
Primary: #3b82f6 (blue-600)
Success: #10b981 (emerald-500)
Warning: #f59e0b (amber-500)
Error: #ef4444 (red-500)

/* Statuts */
En attente: amber-50 text-amber-800
Entretien RH: blue-50 text-blue-800
Entretien technique: purple-50 text-purple-800
Accepté: emerald-50 text-emerald-800
Refusé: red-50 text-red-800
```

### **Espacements**
- Padding carte: `p-5`
- Gap entre éléments: `gap-2`, `gap-4`
- Marges de section: `mb-6`, `mt-8`
- Espacement responsive: `px-4 sm:px-6 lg:px-8`

### **Animations**
- `animate-float` : Icône qui flotte
- `animate-pulse` : Effet de pulsation
- `animate-spin` : Spinner de chargement
- `slide-up/down/right` : Transitions de page
- `fade` : Transition en fondu

---

## 🏗 Architecture du Projet

```
recrutement-app/
├── 📁 public/                 # Fichiers statiques
├── 📁 src/
│   ├── 📁 api/                # Couche API
│   │   └── api.ts             # Services API (axios)
│   │
│   ├── 📁 assets/              # Ressources
│   │   └── typography.css      # Styles typographiques (animations)
│   │
│   ├── 📁 components/          # Composants UI réutilisables
│   │   ├── CandidatureCard.vue   # Carte individuelle (avec suppression)
│   │   ├── CandidatureList.vue   # Liste des cartes
│   │   ├── CommentSection.vue    # Gestion commentaires
│   │   ├── FiltersBar.vue        # Barre de filtres (avec Lucide)
│   │   └── Pagination.vue        # Pagination
│   │
│   ├── 📁 composables/         # Logique réutilisable
│   │   └── useDebounce.ts      # Hook debounce personnalisé
│   │
│   ├── 📁 router/              # Configuration des routes
│   │   └── index.ts            # Routes (/, /candidature/:id, /ajouter)
│   │
│   ├── 📁 stores/              # State management (Pinia)
│   │   └── candidatureStore.ts # Store avec CRUD complet
│   │
│   ├── 📁 types/               # Types TypeScript
│   │   └── index.ts            # Interfaces (Candidature, Filters...)
│   │
│   ├── 📁 views/               # Pages de l'application
│   │   ├── HomeView.vue        # Page d'accueil (avec bouton ajouter)
│   │   ├── DetailView.vue      # Page détail candidature
│   │   └── AddCandidatureView.vue # Page d'ajout (formulaire 3 étapes)
│   │
│   ├── App.vue                 # Composant racine (header/footer redesign)
│   └── main.ts                 # Point d'entrée
│
├── db.json                      # Base de données JSON Server
├── index.html                   # Template HTML (avec Google Fonts)
├── package.json                 # Dépendances
├── tailwind.config.js           # Configuration Tailwind (avec Titillium)
├── tsconfig.json                # Configuration TypeScript
└── vite.config.ts               # Configuration Vite
```

---

## 🚀 Installation et Configuration

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn
- Navigateur moderne

### Étapes d'Installation

1. **Cloner le projet**
```bash
git clone [URL_DU_REPO]
cd recrutement-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer JSON Server (API)**
```bash
# Terminal 1
npm run api
# L'API sera disponible sur http://localhost:3000
```

4. **Lancer l'application Vue.js**
```bash
# Terminal 2
npm run dev
# L'application sera disponible sur http://localhost:5173
```

5. **Lancer les deux simultanément** (recommandé)
```bash
npm run start
```

### Scripts Disponibles
| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur de développement Vite |
| `npm run build` | Compile l'application pour production |
| `npm run preview` | Prévisualise la version compilée |
| `npm run api` | Lance JSON Server sur le port 3000 |
| `npm run start` | Lance API et app simultanément |

---

## 📖 Guide d'Utilisation

### 🏠 **Page d'Accueil**

1. **Statistiques** : Les cards en haut montrent le total et la répartition par statut. Cliquez sur un statut pour filtrer.

2. **Filtres** :
   - 🔍 Recherche textuelle (nom, compétences) avec debounce
   - 📊 Filtre par statut (dropdown avec icônes)
   - 💼 Filtre par poste (données depuis l'API)
   - 🔄 Bouton "Réinitialiser" pour effacer tous les filtres
   - Tags cliquables pour supprimer un filtre

3. **Affichage** : Basculez entre vue grille (🔲) et vue liste (📋) - persistance dans localStorage

4. **Cartes Candidature** :
   - Vue rapide des informations clés
   - Badge de statut coloré
   - Changement de statut via dropdown (apparaît au hover)
   - Bouton de suppression (🗑️) dans le coin
   - Clic sur la carte pour voir les détails

5. **Pagination** : Navigation entre les pages avec indicateur de page courante

### ➕ **Création de Candidature**

1. Cliquez sur le bouton vert **"Nouvelle candidature"**
2. Remplissez les 3 étapes du formulaire :
   - **Étape 1** : Informations personnelles (nom, poste, email, téléphone, localisation)
   - **Étape 2** : Expérience, disponibilité, salaire et compétences (tags)
   - **Étape 3** : URL du CV et lettre de motivation
3. Validation progressive à chaque étape
4. Soumission avec feedback visuel
5. Redirection automatique vers la liste

### 🗑️ **Suppression de Candidature**

1. Sur la carte, cliquez sur l'icône 🗑️ (apparaît au hover)
2. Une modal de confirmation s'ouvre
3. Confirmez la suppression
4. Notification de succès/erreur
5. La liste se met à jour automatiquement

### 📄 **Page Détail**

1. **Informations** : Toutes les données du candidat organisées en sections
2. **Statut** : Modifiable via dropdown avec mise à jour immédiate
3. **Commentaires** :
   - Historique des commentaires avec auteur et date
   - Ajout de nouveau commentaire
   - Horodatage automatique
4. **CV** : Lien direct pour visualiser/télécharger avec icône
5. **Bouton retour** : Stylisé avec animation slide

---

## 🔌 API Endpoints

### **Candidatures**
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/candidatures` | Liste toutes les candidatures |
| GET | `/candidatures/:id` | Détail d'une candidature |
| POST | `/candidatures` | **Créer une candidature** |
| PATCH | `/candidatures/:id` | Modifier une candidature |
| DELETE | `/candidatures/:id` | **Supprimer une candidature** |

### **Ressources**
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/statuts` | Liste des statuts |
| GET | `/postes` | Liste des postes |
| GET | `/competences` | Liste des compétences |

### **Filtres et Recherche**
```
GET /candidatures?statut=En attente
GET /candidatures?poste=Développeur Vue.js
GET /candidatures?q=Vue.js
GET /candidatures?_sort=dateCandidature&_order=desc
GET /candidatures?_page=1&_limit=10
```

---

## 🧠 Choix Techniques

### **Architecture**
- **Séparation des responsabilités** : API layer, Store, Composants
- **Composition API** : Meilleure réutilisabilité du code
- **TypeScript** : Sécurité des types et meilleure maintenabilité

### **State Management (Pinia)**
- Centralisation des données
- Actions asynchrones pour les appels API
- Getters pour les données calculées
- **Optimistic updates** pour meilleure UX
- Gestion des erreurs avec rollback

### **CRUD Operations**
```typescript
// Store avec méthodes CRUD
createCandidature()  // POST /candidatures
deleteCandidature()  // DELETE /candidatures/:id
updateStatut()       // PATCH /candidatures/:id
loadCandidatures()   // GET /candidatures
```

### **UI/UX**
- **Formulaire multi-étapes** : Moins intimidant qu'un long formulaire
- **Validation progressive** : Feedback immédiat
- **Teleport** : Évite les problèmes de stacking context pour les modals
- **Titillium Web** : Police moderne et lisible
- **Lucide Icons** : Icônes vectorielles professionnelles
- **Notifications** : Feedback après chaque action

### **Performance**
- **Debounce** (300ms) sur la recherche
- **Pagination** côté serveur
- **Cache** des données statiques (statuts, postes)
- **Lazy loading** des routes

### **API Layer**
- **Axios** avec intercepteurs
- Gestion centralisée des erreurs
- Typage fort des réponses

---

## 🔮 Améliorations Futures

### **Court Terme**
- [ ] Tests unitaires (Vitest + Vue Test Utils)
- [ ] Mode sombre (dark mode) avec persistance
- [ ] Export des données (CSV/PDF)
- [ ] Drag & drop pour changer le statut

### **Moyen Terme**
- [ ] Authentification et rôles (recruteur, admin)
- [ ] Graphiques statistiques (Chart.js)
- [ ] Filtres avancés (date, expérience, salaire)
- [ ] Upload de fichiers (CV) au lieu d'URL

### **Long Terme**
- [ ] WebSockets pour mises à jour temps réel
- [ ] Version mobile native (Capacitor)
- [ ] Intégration email (envoi notifications)
- [ ] Dashboard personnalisable

---

## ⏱ Temps de Développement

| Phase | Durée | Détails |
|-------|-------|---------|
| **Configuration initiale** | 30 min | Setup projet, dépendances, JSON Server |
| **Architecture et Types** | 45 min | Structure, interfaces TypeScript |
| **API Layer** | 45 min | Services API avec Axios |
| **Store Pinia (CRUD)** | 1h30 | State management, méthodes CRUD |
| **Composants UI** | 2h | Cards, filtres, pagination, wizard |
| **Pages et Routing** | 1h | HomeView, DetailView, AddView |
| **Styles et Animations** | 1h | Tailwind CSS, Titillium Web, transitions |
| **Tests et Debug** | 45 min | Validation, correction bugs |
| **Documentation** | 45 min | README, commentaires code |
| **Total** | **8 heures** | |

---

## 📸 Captures d'Écran

### Page d'Accueil - Vue Grille
```
┌─────────────────────────────────────────────┐
│  📋 Gestion des Candidatures                │
│  ┌────────┐ ┌────────┐ ┌────────┐          │
│  │ Total  │ │ En att │ │ Entret │          │
│  │   12   │ │    4   │ │    3   │          │
│  └────────┘ └────────┘ └────────┘          │
├─────────────────────────────────────────────┤
│  🔍 [Recherche...]  [Statut ▼] [Poste ▼]   │
│  [🔄 Réinitialiser]                         │
├─────────────────────────────────────────────┤
│  [➕ Nouvelle candidature]   [🔲] [📋]      │
├─────────────────────────────────────────────┤
│  ┌───────────────────┐ ┌───────────────────┐│
│  │ Sophie Martin     │ │ Thomas Dubois     ││
│  │ Développeur Full  │ │ Développeur Front ││
│  │ 🟡 En attente     │ │ 🔵 Entretien RH   ││
│  │ 📍 Paris          │ │ 📍 Lyon           ││
│  │ [🗑️] [Détails]    │ │ [🗑️] [Détails]    ││
│  └───────────────────┘ └───────────────────┘│
│  ┌───────────────────┐ ┌───────────────────┐│
│  │ Emma Leroy        │ │ Lucas Bernard     ││
│  │ Développeur Vue   │ │ Développeur Back  ││
│  │ 🟣 Entretien tech │ │ 🔴 Refusé         ││
│  │ 📍 Bordeaux       │ │ 📍 Toulouse       ││
│  │ [🗑️] [Détails]    │ │ [🗑️] [Détails]    ││
│  └───────────────────┘ └───────────────────┘│
│  ┌─────────────────────────────────────────┐│
│  │ < 1 2 3 4 >                             ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

### Page d'Ajout - Étape 1
```
┌─────────────────────────────────────────────┐
│  ← Retour                                    │
│  ➕ Nouvelle candidature                     │
│  [1] Informations ─── [2] Expérience ─── [3] Docs │
├─────────────────────────────────────────────┤
│  📝 Informations personnelles                │
│  ┌─────────────────────────────────────────┐│
│  │ Nom complet *  [Sophie Martin         ] ││
│  │ Poste *        [Développeur Full Stack] ││
│  │ Email *        [sophie@email.com      ] ││
│  │ Téléphone *    [+33 6 12 34 56 78     ] ││
│  │ Localisation * [Paris, France         ] ││
│  │ CV (URL)       [https://...           ] ││
│  └─────────────────────────────────────────┘│
│  [Annuler]                    [Suivant →]   │
└─────────────────────────────────────────────┘
```

### Page Détail
```
┌─────────────────────────────────────────────┐
│  ← Retour                                    │
│  Sophie Martin                🟡 En attente  │
│  Développeur Full Stack                      │
│  Changer: [En attente ▼]                     │
├─────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐        │
│  │ Contact      │  │ Candidature  │        │
│  │ 📧 email     │  │ 📅 15/01/24  │        │
│  │ 📞 téléphone │  │ 💼 3 ans     │        │
│  │ 📍 Paris     │  │ ⏳ Immédiate │        │
│  └──────────────┘  └──────────────┘        │
│  ┌─────────────────────────────────────────┐│
│  │ Compétences                              ││
│  │ [Vue.js] [Node.js] [MongoDB] [Docker]   ││
│  └─────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────┐│
│  │ Documents                                ││
│  │ [📄 Télécharger le CV]                   ││
│  └─────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────┐│
│  │ Commentaires                             ││
│  │ ┌─────────────────────────────────────┐ ││
│  │ │ Marie - 20/01/24 09:15              │ ││
│  │ │ Profil intéressant...                │ ││
│  │ └─────────────────────────────────────┘ ││
│  │ ┌─────────────────────────────────────┐ ││
│  │ │ [Ajouter un commentaire...]         │ ││
│  │ │ [Envoyer]                           │ ││
│  │ └─────────────────────────────────────┘ ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

---

## 🐛 Problèmes Rencontrés et Solutions

### 1. **CORS avec JSON Server**
- **Problème** : Blocage CORS en développement
- **Solution** : Configuration du proxy dans Vite

### 2. **Performance Recherche**
- **Problème** : Trop d'appels API pendant la frappe
- **Solution** : Implémentation du debounce (300ms)

### 3. **État après Refresh**
- **Problème** : Perte des filtres après rafraîchissement
- **Solution** : Sauvegarde dans localStorage (viewMode)

### 4. **Mise à Jour Statut**
- **Problème** : UI lente à réagir
- **Solution** : Optimistic updates avec rollback

### 5. **Modal Stacking Context**
- **Problème** : Modal bloqué derrière d'autres éléments
- **Solution** : Utilisation de `<Teleport to="body">` avec z-index élevé

### 6. **Suppression Accidentelle**
- **Problème** : Suppression involontaire de candidatures
- **Solution** : Modal de confirmation avec double validation

### 7. **Formulaire Long**
- **Problème** : Formulaire de création trop long et intimidant
- **Solution** : Découpage en 3 étapes avec barre de progression

---

## 📞 Contact

Pour toute question ou suggestion :

- **Email** : [votre-email@example.com]
- **GitHub** : [votre-github]
- **LinkedIn** : [votre-linkedin]

---

## 📄 License

Ce projet a été réalisé dans le cadre d'un test technique. Tous droits réservés.

---

## 🙏 Remerciements

Merci à l'équipe de recrutement pour ce test technique complet et stimulant. J'espère que cette réalisation démontre mes compétences en développement Vue.js, ma compréhension des bonnes pratiques et mon souci du détail.

### Points Clés Développés
- ✅ **CRUD Complet** (Create, Read, Update, Delete)
- ✅ **Formulaire multi-étapes** avec validation
- ✅ **Design System** cohérent
- ✅ **Animations** professionnelles
- ✅ **Expérience utilisateur** optimisée
- ✅ **Code propre** et commenté
- ✅ **Architecture** scalable

---

**Développé avec ❤️ en 2026**

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
```

## ✅ **Résumé des modifications ajoutées au README**

| Section | Nouveautés |
|---------|------------|
| **Nouveautés Version 2.0** | CRUD complet, formulaire 3 étapes, suppression, Lucide Icons, Titillium Web, Teleport |
| **Design System** | Typographie (Titillium Web/System UI), couleurs, espacements, animations |
| **Architecture** | Nouveaux composants (AddCandidatureWizard), nouvelles pages (AddCandidatureView) |
| **Fonctionnalités** | Création (3 étapes), suppression (confirmation), notifications toast |
| **Captures d'écran** | Page d'ajout avec étapes |
| **Problèmes résolus** | Stacking context avec Teleport, suppression accidentelle avec confirmation |

Le README est maintenant **complet et professionnel** ! 🚀