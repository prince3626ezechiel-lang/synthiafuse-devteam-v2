# Ivoire Monade — site Next.js (charte EON IVOIRE)

Site vitrine + vente du Pack Business, en **Next.js (App Router)** avec **export statique**,
**Framer Motion** pour le fond animé « nature », et respect des règles SEO :
un seul `<h1>` par page, HTML sémantique, `metadata` par page, `sitemap.ts`, `robots.ts`, canonical.

## Structure
```
app/
  layout.tsx          # métadonnées globales, Nav/Footer/Bulle
  page.tsx            # Accueil (hero + fond Framer Motion + 13 compétences)
  pack-business/      # Page produit + boutons Wave / Orange Money
  contact/            # Page contact
  sitemap.ts          # /sitemap.xml
  robots.ts           # /robots.txt
components/
  Nav, Footer, FloatingBubble   # serveur (texte rendu côté serveur)
  NatureBackground.tsx          # "use client" — animation Framer Motion (décoratif)
lib/site.ts           # marque, prix, contact, liens de paiement
public/CNAME          # domaine (utile pour GitHub Pages)
```

## Lancer en local
```bash
cd ivoire-monade
npm install
npm run dev        # http://localhost:3000
```

## Build statique
```bash
npm run build      # génère le dossier out/ (100% statique)
```

## Déployer
- **Vercel** : importe le repo, *Root Directory* = `ivoire-monade`. Build auto.
- **Netlify / Cloudflare Pages** : base = `ivoire-monade`, build = `npm run build`, publish = `ivoire-monade/out`.
- Puis **Domain → Add** `ivoire-monade.shop` et configure les DNS chez ton registrar.

> ⚠️ Non vérifié par build dans cet environnement (pas de `npm install` lancé ici).
> Lance `npm install && npm run build` en local ou laisse la plateforme de déploiement compiler.

## À personnaliser
- Dépose le vrai logo dans `public/logo.svg` et remplace le `<span className="emblem">` dans `components/Nav.tsx`.
- Vérifie que les liens Wave/Orange (`lib/site.ts`) collectent le bon montant (actuellement 25 000 FCFA).
- La marque affichée est « EON IVOIRE » (charte) ; le domaine reste `ivoire-monade.shop`.
