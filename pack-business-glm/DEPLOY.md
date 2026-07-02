# Mise en ligne du site — ivoire-monade.shop

Le site (`pack-business-glm/site/`) est **100% statique** : aucun build, aucune dépendance.
Il est prêt à déployer tel quel.

## Ce qui est déjà préparé
- `site/index.html` — la page de vente (marque Ivoire Monade, paiements Wave/Orange, bulle flottante).
- `site/robots.txt`, `site/sitemap.xml` — SEO, pointant sur `https://ivoire-monade.shop/`.
- `site/CNAME` — domaine personnalisé (utilisé par GitHub Pages).
- `netlify.toml` (racine) — dossier de publication configuré pour Netlify.

## Option A — Netlify (le plus simple)
1. Va sur https://app.netlify.com → **Add new site → Import from Git** (ou **Deploy manually** en glissant le dossier `pack-business-glm/site/`).
2. Netlify lit `netlify.toml` : dossier publié = `pack-business-glm/site`.
3. **Domain settings → Add custom domain** → `ivoire-monade.shop`.
4. Chez ton registrar (où tu as acheté le domaine), ajoute les enregistrements DNS que Netlify t'indique (souvent un `CNAME` vers `xxxx.netlify.app` + le domaine apex).

## Option B — Cloudflare Pages / Vercel
Même principe : connecte le dépôt, dossier de sortie = `pack-business-glm/site`, puis ajoute le domaine.

## ⚠️ L'étape que je ne peux pas faire à ta place
La connexion du domaine `ivoire-monade.shop` demande l'accès à **ton compte registrar (DNS)** et à
**ton compte d'hébergement**. Je n'ai pas ces accès — et il ne faut **jamais** coller ces
identifiants dans un chat. Cette dernière étape (ajouter les enregistrements DNS) est à faire par
toi, une seule fois ; tout le reste est prêt.
