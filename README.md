# FishEye
Plateforme de portfolio pour photographes professionnels. Chaque photographe dispose d'une page dédiée présentant ses médias (photos et vidéos), avec un système de likes, un filtre de tri et un formulaire de contact.

## Stack technique
- **Framework** : Next.js 16 (App Router)
- **UI** : React 19, Tailwind CSS v4
- **Base de données** : SQLite via [Turso](https://turso.tech) + Prisma ORM
- **Langage** : JavaScript / JSX

## Branches

- `main` — version déployée sur Vercel avec Turso (SQLite cloud)
- `prisma` — version alternative utilisant Prisma ORM avec SQLite local

> Sur la branch `prisma`, installer les dépendances supplémentaires :
> ```bash
> # Renommer le fichier d'environnement
> cp .env.example .env
> # Installer les dépendances Prisma
> npm install prisma@6.19.2 @prisma/client@6.19.2
> npx prisma generate
> ```

## Fonctionnalités
- Galerie de photographes avec navigation vers leur page dédiée
- Affichage des médias (images et vidéos) avec chargement lazy
- Tri des médias par **popularité**, **date** ou **titre**
- Système de likes persisté en `localStorage` (sans compte utilisateur)
- Lightbox plein écran avec navigation clavier (`←` `→` `Escape`)
- Formulaire de contact avec validation côté client
- Pages d'erreur et 404 personnalisées
- Accessibilité : navigation clavier, focus trap, ARIA, lecteurs d'écran

## Installation
### Prérequis
- Node.js >= 20.9.0
- Un compte [Turso](https://turso.tech) avec une base de données créée

### Variables d'environnement
Copier le fichier d'exemple et le remplir :
```bash
cp .env.example .env
```

**Option 1 — En local (recommandé, sans compte Turso)**
Le projet inclut un fichier SQLite `dev.db` prêt à l'emploi :
```env
TURSO_DATABASE_URL=file:./dev.db
```

**Option 2 — Avec Turso (cloud)**
Créer un compte sur [turso.tech](https://turso.tech), puis :
```bash
turso db create fisheye
turso db tokens create fisheye
```
```env
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token
```
**Option 3 — Avec Prisma (branch `prisma`)**
La branch `prisma` utilise Prisma ORM avec SQLite en local :
```env
DATABASE_URL=file:./prisma/dev.db
```

### Lancer le projet
```bash
# Installer les dépendances
npm install
# (Option 2 uniquement) Peupler la base Turso avec les données de test
npx prisma db seed
# Lancer le serveur de développement
npm run dev
```
Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Scripts disponibles
| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile le projet pour la production |
| `npm run start` | Lance le serveur de production |
| `npm run lint` | Vérifie la qualité du code |
| `npx prisma db seed` | Initialise la base de données avec les données de test |

## Structure du projet


```
src/
├── app/                        # Pages et logique serveur (Next.js App Router)
│   ├── page.jsx                # Page d'accueil — liste des photographes
│   ├── photographer/[id]/      # Page dynamique d'un photographe
│   ├── actions.jsx             # Server Actions (likes)
│   ├── prisma-db.js        # Couche d'accès à la base de données
│   ├── errors.jsx              # Classes d'erreurs personnalisées
│   ├── error.jsx               # Error Boundary
│   └── not-found.jsx           # Page 404
└── components/
    ├── Filter/                 # Dropdown de tri accessible
    ├── Lightbox/               # Visionneuse plein écran
    ├── PhotographerCard/       # Carte photographe (page d'accueil)
    ├── PhotographerContact/    # Modal de contact avec validation
    ├── PhotographerInfo/       # En-tête de la page photographe
    ├── PhotographerMedia/      # Carte média avec système de likes
    ├── PhotographerMediaListClient/ # Grille de médias
    ├── PhotographerPageClient/ # Orchestrateur de la page photographe
    ├── PhotographerStats/      # Barre de statistiques (likes + tarif)
    └── Spinner/                # Indicateur de chargement
```

## Accessibilité

Le projet respecte les bonnes pratiques WCAG :

- Navigation 100% clavier (Tab, Shift+Tab, Escape, flèches)
- Focus trap dans les modales (Lightbox, Contact)
- Annonces `aria-live` pour les lecteurs d'écran
- Rôles ARIA sur les composants interactifs (`dialog`, `listbox`, `option`)
- Hiérarchie de titres `h1`/`h2` cohérente par page
- Focus visible sur tous les éléments interactifs