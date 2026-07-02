# Gestion des secrets — workflow GPG

Règle : **aucun secret en clair n'est versionné dans git.** Pas de `.env` committé, pas de
clé API dans le code. Seuls des fichiers **chiffrés** (`.gpg`) peuvent être versionnés.

## ⚠️ Règles de base

- Une **passphrase ne se tape jamais** dans un chat, un ticket, un commit, ou un message.
  Elle ne vit que dans ta tête / ton gestionnaire de mots de passe.
- Si une passphrase a été exposée (écrite quelque part hors de ton contrôle), elle est
  **brûlée** : change-la et re-chiffre.
- Le fichier `.env` en clair reste **local** et **gitignoré** (déjà le cas ici).

## Chiffrer un fichier de secrets (symétrique, en local)

```bash
# 1. Crée ton .env local (jamais committé)
#    MISTRAL_API_KEY=...
#    TELEGRAM_BOT_TOKEN=...

# 2. Chiffre-le. GPG te demandera la passphrase de façon interactive
#    (NE la mets PAS dans la ligne de commande).
gpg --symmetric --cipher-algo AES256 -o secrets.env.gpg .env

# 3. Seul secrets.env.gpg peut être versionné. Le .env en clair reste ignoré.
git add secrets.env.gpg
```

## Déchiffrer au moment de l'utilisation

```bash
gpg --decrypt secrets.env.gpg > .env    # GPG redemande la passphrase
# charge .env dans l'environnement, puis supprime le clair si tu veux :
# set -a; source .env; set +a
```

## Alternative recommandée pour une équipe / plusieurs machines

- **SOPS** (`getsops/sops`) + une clé **age** ou GPG : chiffre champ par champ, diff lisible.
- **git-crypt** : chiffrement transparent au commit/checkout.

Ces outils gèrent les clés proprement (pas de passphrase courte partagée), ce qui est plus sûr
qu'un `.gpg` symétrique à passphrase unique.

## Ce qui NE doit jamais arriver

- ❌ Passphrase écrite dans un chat / commit / message.
- ❌ `.env` en clair dans git.
- ❌ Fichier déchiffré (`.env`, `secrets.env`) versionné par erreur (voir `.gitignore`).
