# Configuration MySQL Coolify

## ⚠️ URL Interne vs Externe

Votre URL MySQL: `mysql://mysql:gJUKUWFEGkj0IJ4AJEjE386GeBdTH0x2FenPuoN022iW1R2Toxwg4pVfXJZZDzTB@assw4k08sokso0csocs88ggs:3306/default`

Cette URL est **interne** à Coolify. Elle fonctionne uniquement depuis les conteneurs déployés sur Coolify, **pas depuis votre machine locale**.

## 🔧 Options de Configuration

### Option 1: Migrations sur Coolify (Recommandé)

Déployez d'abord sur Coolify, puis les migrations se feront automatiquement au démarrage.

**1. Scripts disponibles dans `package.json`:**

```json
{
  "scripts": {
    "deploy": "npx prisma migrate deploy && npm start",
    "deploy:first": "npx prisma migrate deploy && npx prisma db seed && npm start",
    "postinstall": "npx prisma generate"
  }
}
```

- `deploy` : Pour les déploiements normaux (migrations uniquement)
- `deploy:first` : Pour le PREMIER déploiement (migrations + seed admin)

**2. Sur Coolify, configurer:**
- Build Command: `npm install && npm run build`
- Start Command: `npm run deploy` (ou `npm run deploy:first` pour le 1er déploiement)

**3. Variables d'environnement Coolify:**
```env
PORT=3001
NODE_ENV=production
JWT_SECRET=votre-secret-securise
DATABASE_URL=mysql://mysql:gJUKUWFEGkj0IJ4AJEjE386GeBdTH0x2FenPuoN022iW1R2Toxwg4pVfXJZZDzTB@assw4k08sokso0csocs88ggs:3306/default
ALLOWED_ORIGINS=https://votre-domaine.com
ADMIN_EMAIL=admin@votre-domaine.com
ADMIN_PASSWORD=mot-de-passe-securise
```

### Option 2: URL Publique (Pour dev local)

Si vous avez besoin de développer localement avec la BDD Coolify:

**1. Vérifier si Coolify expose un port public:**
- Dans Coolify → Votre BDD MySQL → Configuration
- Chercher "Public Port" ou "Expose Port"

**2. Si oui, l'URL publique sera:**
```
mysql://mysql:PASSWORD@votre-serveur-coolify.com:PORT_PUBLIC/default
```

**3. Utiliser cette URL dans `.env` local:**
```env
DATABASE_URL="mysql://mysql:PASSWORD@ip-publique:port/default"
```

### Option 3: Dual Configuration (Recommandé pour dev)

Gardez SQLite en local et MySQL en production:

**`.env` (local - SQLite):**
```env
DATABASE_URL="file:./dev.db"
```

**Sur Coolify (production - MySQL):**
```env
DATABASE_URL="mysql://mysql:gJUKUWFEGkj0IJ4AJEjE386GeBdTH0x2FenPuoN022iW1R2Toxwg4pVfXJZZDzTB@assw4k08sokso0csocs88ggs:3306/default"
```

**Modifier `schema.prisma` pour supporter les deux:**
```prisma
datasource db {
  provider = "mysql"  // Ou "sqlite" en local
  url      = env("DATABASE_URL")
}
```

## 🚀 Déploiement sur Coolify

### 1. Préparer le projet

```bash
# S'assurer que schema.prisma utilise mysql
cd nutri-api

# Vérifier que .env.example contient les bonnes infos
cat .env.example
```

### 2. Créer le service sur Coolify

1. **New Resource** → **Application** → **Public Repository**
2. Git Repository: `votre-repo-github`
3. Branch: `main`
4. Build Pack: **Nixpacks** (auto-détecte Node.js)

### 3. Configuration Build

**Build Command:**
```bash
cd nutri-api && npm install && npm run build
```

**Start Command:**

Pour le **PREMIER déploiement** (crée les tables + admin):
```bash
cd nutri-api && npm run deploy:first
```

Pour les **déploiements suivants** (migrations uniquement):
```bash
cd nutri-api && npm run deploy
```

**⚠️ Important**: Après le premier déploiement réussi, changez le Start Command pour utiliser `npm run deploy` (sans `:first`)

### 4. Variables d'environnement

Dans Coolify → Environment Variables:

```env
PORT=3001
NODE_ENV=production
JWT_SECRET=GENERER_UN_NOUVEAU_SECRET_32_CHARS
DATABASE_URL=fda;jfdalkjfdsald;ffld;s
ALLOWED_ORIGINS=https://votre-frontend.com
ADMIN_EMAIL=admin@votre-domaine.com
ADMIN_PASSWORD=mot-de-passe-admin-fort
```

### 5. Premier déploiement

1. Pour le **PREMIER déploiement**, utilisez Start Command: `npm run deploy:first`

2. Cliquez sur **Deploy**

3. Vérifiez les logs pour:
   - ✅ `npm install` réussi
   - ✅ `prisma migrate deploy` crée les tables
   - ✅ `prisma db seed` crée l'admin
   - ✅ Serveur démarre sur le port

4. **IMPORTANT**: Après le premier déploiement réussi:
   - Allez dans Coolify → Configuration
   - Changez Start Command pour: `npm run deploy`
   - Cela évite de ré-exécuter le seed à chaque déploiement

### 6. Vérifier

```bash
# Tester l'API
curl https://votre-api.coolify.app/health

# Devrait retourner:
{"status":"OK","timestamp":"..."}
```

## 🔄 Workflow Complet

### Développement Local (SQLite)

```bash
# 1. Modifier schema.prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

# 2. .env local
DATABASE_URL="file:./dev.db"

# 3. Développer
npm run dev
```

### Production Coolify (MySQL)

```bash
# 1. Modifier schema.prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

# 2. Commit & Push
git add .
git commit -m "Configure MySQL for production"
git push origin main

# 3. Coolify auto-deploy
# Les migrations se font automatiquement
```

## 📝 Commandes Utiles Coolify

```bash
# Dans le terminal Coolify (SSH)

# Voir les tables créées
npx prisma studio

# Vérifier les migrations
npx prisma migrate status

# Seed la base
npx prisma db seed

# Reset la base (ATTENTION: supprime les données)
npx prisma migrate reset --force

# Logs en temps réel
pm2 logs
```

## 🆘 Dépannage

### Erreur: Can't reach database server

- L'URL interne ne fonctionne pas en local
- Utilisez SQLite en local ou demandez l'URL publique

### Migrations ne s'appliquent pas

```bash
# Sur Coolify, forcer les migrations
npx prisma migrate deploy --force
```

### Tables vides après déploiement

```bash
# Seed la base
npx prisma db seed
```

### Reset complet

```bash
# ATTENTION: Supprime toutes les données
npx prisma migrate reset --force
npx prisma db seed
```

## ✅ Checklist Production Coolify

- [ ] `schema.prisma` → provider = "mysql"
- [ ] Variables d'environnement configurées
- [ ] JWT_SECRET changé (32+ caractères)
- [ ] ADMIN_PASSWORD sécurisé
- [ ] ALLOWED_ORIGINS avec domaine frontend
- [ ] Build Command inclut les migrations
- [ ] Premier déploiement réussi
- [ ] Base de données seedée
- [ ] Endpoint `/health` répond OK
- [ ] Test inscription/connexion utilisateur
- [ ] Test connexion admin

Vous êtes prêt! 🚀
