# RB Studio — Site Vitrine

Site vitrine professionnel pour **RB Studio** (Romain Bedouet), développeur web et graphiste basé sur la côte Loire-Atlantique.

## Structure du projet

```
/
├── index.html              # Page principale (one-page)
├── assets/
│   ├── css/
│   │   └── styles.css      # Styles CSS complets
│   ├── js/
│   │   └── main.js         # JavaScript (menu, FAQ, scroll...)
│   └── img/                # Dossier pour les images (vide)
└── README.md               # Ce fichier
```

## Remplacer les images placeholders

Les images utilisent actuellement le service `placehold.co`. Pour les remplacer :

### 1. Préparer vos images

Placez vos images dans le dossier `/assets/img/` avec des noms clairs :

```
/assets/img/
├── hero-mockup.jpg         # Image principale hero (900x700)
├── portrait.jpg            # Portrait photo (400x400)
├── projet-boulangerie.jpg  # Capture projet démo 1 (1200x800)
├── projet-restaurant.jpg   # Capture projet démo 2 (1200x800)
└── og-image.jpg            # Image OpenGraph (1200x630)
```

### 2. Remplacer les chemins dans index.html

Cherchez et remplacez les URLs `https://placehold.co/...` par vos chemins locaux :

```html
<!-- Avant -->
<img src="https://placehold.co/900x700/E0E7FF/6366F1?text=Votre+site+web" ...>

<!-- Après -->
<img src="assets/img/hero-mockup.jpg" ...>
```

### Images à remplacer

| Emplacement | Dimensions recommandées | Fichier suggéré |
|-------------|------------------------|-----------------|
| Hero (mockup site) | 900x700 | `hero-mockup.jpg` |
| Portrait (À propos) | 400x400 | `portrait.jpg` |
| Projet Boulangerie | 1200x800 | `projet-boulangerie.jpg` |
| Projet Restaurant | 1200x800 | `projet-restaurant.jpg` |
| OpenGraph (meta) | 1200x630 | `og-image.jpg` |

### 3. Optimisation des images

Avant mise en ligne, optimisez vos images :
- Format : WebP ou JPEG optimisé
- Compression : 80% qualité (bon compromis)
- Outils gratuits : [Squoosh](https://squoosh.app/), [TinyPNG](https://tinypng.com/)

---

## Changer la palette de couleurs

Les couleurs sont définies via des variables CSS dans `/assets/css/styles.css`. Modifiez la section `:root` :

```css
:root {
    /* Couleurs principales */
    --color-bg: #F8FAFC;            /* Fond principal (pastel clair) */
    --color-bg-alt: #FFF7ED;        /* Fond alternatif (sections) */
    --color-text: #0F172A;          /* Texte principal (anthracite) */
    --color-text-muted: #64748B;    /* Texte secondaire */

    /* Accent principal (bleu-violet) */
    --color-primary: #6366F1;       /* Couleur d'accent */
    --color-primary-light: #818CF8; /* Hover/light */
    --color-primary-dark: #4F46E5;  /* Active/dark */
    --color-primary-bg: #E0E7FF;    /* Background léger */

    /* Accents secondaires */
    --color-success: #22C55E;       /* Vert (validation, badges) */
    --color-warning: #F97316;       /* Orange (labels, alertes) */
}
```

### Exemples de palettes alternatives

**Bleu océan :**
```css
--color-primary: #0EA5E9;
--color-primary-light: #38BDF8;
--color-primary-dark: #0284C7;
--color-primary-bg: #E0F2FE;
```

**Vert nature :**
```css
--color-primary: #10B981;
--color-primary-light: #34D399;
--color-primary-dark: #059669;
--color-primary-bg: #D1FAE5;
```

---

## Changer les informations de contact

### Email

Cherchez et remplacez dans `index.html` :
```
romainbedouetdev@gmail.com
```

Emplacements :
- Hero (contact rapide)
- Section Contact (lien + formulaire action)
- JSON-LD schema

### Téléphone

Cherchez et remplacez :
```
06 06 06 06 06      (format affiché)
+33606060606        (format href tel:)
```

Emplacements :
- Hero (contact rapide)
- Section Contact
- JSON-LD schema
- FAQ (question sur l'appel)

### Dans le JavaScript

Modifiez également l'email dans `/assets/js/main.js` (formulaire mailto) :
```javascript
window.location.href = `mailto:votre-email@example.com?subject=${subject}&body=${body}`;
```

---

## Déployer sur GitHub Pages

### 1. Créer un dépôt GitHub

1. Allez sur [github.com/new](https://github.com/new)
2. Nommez le dépôt (ex: `rbstudio` ou `votre-username.github.io`)
3. Public (obligatoire pour GitHub Pages gratuit)

### 2. Pousser le code

```bash
# Initialiser git (si pas déjà fait)
git init

# Ajouter les fichiers
git add .

# Premier commit
git commit -m "Initial commit - RB Studio site"

# Lier au dépôt distant
git remote add origin https://github.com/votre-username/rbstudio.git

# Pousser
git push -u origin main
```

### 3. Activer GitHub Pages

1. Allez dans **Settings** > **Pages**
2. Source : `Deploy from a branch`
3. Branch : `main` / `/ (root)`
4. **Save**

Votre site sera accessible à :
- `https://votre-username.github.io/rbstudio/` (si dépôt classique)
- `https://votre-username.github.io/` (si dépôt nommé `username.github.io`)

### 4. Domaine personnalisé (optionnel)

1. Achetez un domaine (ex: rbstudio.fr)
2. Dans **Settings** > **Pages** > **Custom domain** : `www.rbstudio.fr`
3. Configurez les DNS chez votre registrar :
   - CNAME : `www` → `votre-username.github.io`
   - A : `@` → IPs GitHub (voir doc officielle)

---

## Ajouter des pages projets

### Structure recommandée

```
/
├── index.html
├── projets/
│   ├── boulangerie.html
│   ├── restaurant.html
│   └── ...
├── assets/
│   ├── css/
│   │   └── styles.css      # Partagé
│   ├── js/
│   │   └── main.js         # Partagé
│   └── img/
│       └── projets/
│           ├── boulangerie/
│           │   ├── hero.jpg
│           │   └── ...
│           └── restaurant/
│               └── ...
└── README.md
```

### Template de page projet

Créez `/projets/boulangerie.html` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projet Boulangerie | RB Studio</title>
    <meta name="description" content="Site one-page pour une boulangerie artisanale. Horaires, produits, contact.">

    <!-- Réutiliser les mêmes polices et styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <!-- Header simplifié ou identique -->
    <header class="header">
        <div class="container header__container">
            <a href="../index.html" class="header__logo">RB Studio</a>
            <a href="../index.html#contact" class="btn btn--primary">Contact</a>
        </div>
    </header>

    <main id="main-content">
        <!-- Hero du projet -->
        <section class="hero" style="padding-top: calc(var(--header-height) + var(--space-12));">
            <div class="container">
                <span class="chip" style="margin-bottom: var(--space-4);">Projet de démonstration</span>
                <h1>Boulangerie Artisanale</h1>
                <p class="hero__subtitle">Site one-page • Horaires • Produits • Contact</p>
            </div>
        </section>

        <!-- Screenshots / Démo -->
        <section class="section">
            <div class="container">
                <img src="../assets/img/projets/boulangerie/hero.jpg" alt="Capture du site boulangerie">
                <!-- Ajouter plus de contenu -->
            </div>
        </section>

        <!-- CTA retour -->
        <section class="section section--alt">
            <div class="container" style="text-align: center;">
                <h2>Un projet similaire ?</h2>
                <p style="margin-bottom: var(--space-6);">Discutons de votre boulangerie, pâtisserie ou commerce.</p>
                <a href="../index.html#contact" class="btn btn--primary btn--lg">Demander un devis</a>
            </div>
        </section>
    </main>

    <!-- Footer identique -->
    <footer class="footer">
        <div class="container">
            <div class="footer__content">
                <p class="footer__copy">© <span id="year"></span> RB Studio — Romain Bedouet</p>
            </div>
        </div>
    </footer>

    <script src="../assets/js/main.js"></script>
</body>
</html>
```

### Mettre à jour les liens

Dans `index.html`, remplacez les liens des projets :

```html
<!-- Avant -->
<a href="#" class="btn btn--outline btn--sm">Voir le projet (bientôt)</a>

<!-- Après -->
<a href="projets/boulangerie.html" class="btn btn--outline btn--sm">Voir le projet</a>
```

---

## Caractéristiques techniques

- **HTML5** sémantique
- **CSS3** avec variables (custom properties)
- **JavaScript** vanilla (pas de dépendances)
- **Responsive** (mobile-first)
- **Accessible** (focus visible, labels, aria, skip-link)
- **SEO** optimisé (meta, OpenGraph, JSON-LD)
- **Performance** (pas de framework, fichiers légers)
- **Respect de `prefers-reduced-motion`**

---

## Licence

Projet créé pour RB Studio — Romain Bedouet.
# rbstudio
