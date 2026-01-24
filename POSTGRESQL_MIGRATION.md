# Migration SQLite → PostgreSQL

## Pourquoi migrer ?

SQLite est parfait pour le développement mais **n'est pas recommandé pour la production** :
- Pas de connexions concurrentes
- Pas de scalabilité
- Fichier local (pas de backup automatique)

## Étapes de migration

### 1. Modifier `prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"  // Changer de "sqlite" à "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. Mettre à jour `.env`

```env
# Ancienne config SQLite (à commenter)
# DATABASE_URL="file:./dev.db"

# Nouvelle config PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/nutriplan?schema=public"
```

**Format PostgreSQL URL:**
```
postgresql://[user]:[password]@[host]:[port]/[database]?schema=public
```

Exemples:
- Local: `postgresql://postgres:password@localhost:5432/nutriplan?schema=public`
- Render: `postgresql://user:pass@dpg-xxxxx.render.com/dbname`
- Railway: `postgresql://postgres:pass@containers-us-west-xxx.railway.app:5432/railway`
- Supabase: `postgresql://postgres:pass@db.xxxxx.supabase.co:5432/postgres`

### 3. Installer les dépendances PostgreSQL

```bash
npm install @prisma/client
```

### 4. Générer le client Prisma

```bash
npx prisma generate
```

### 5. Créer la base de données

```bash
# Créer les tables
npx prisma migrate dev --name init

# Ou en production
npx prisma migrate deploy
```

### 6. Seed la base de données

```bash
npx prisma db seed
```

Cela va créer:
- L'admin par défaut (admin@goshop.com)
- Les données nécessaires

### 7. Vérifier

```bash
# Ouvrir Prisma Studio pour vérifier les données
npx prisma studio
```

## Services PostgreSQL gratuits/abordables

### 1. **Render** (Recommandé - Gratuit)
- Créer compte sur render.com
- New → PostgreSQL
- Copier l'URL de connexion interne
- Gratuit: 90 jours d'essai, puis $7/mois

### 2. **Railway** (Gratuit avec limites)
- railway.app
- New Project → Provision PostgreSQL
- Variables → DATABASE_URL
- $5 de crédits gratuits/mois

### 3. **Supabase** (Gratuit)
- supabase.com
- New Project
- Settings → Database → Connection string
- 500MB gratuit

### 4. **Neon** (Gratuit)
- neon.tech
- Serverless PostgreSQL
- 3GB gratuit

## Après migration

1. **Supprimer SQLite** (optionnel):
```bash
rm prisma/dev.db prisma/dev.db-journal
```

2. **Tester l'API**:
```bash
npm run dev
# Tester: http://localhost:3001/health
```

3. **Vérifier les endpoints**:
- POST /api/calculate
- POST /api/users
- POST /api/users/login

## Rollback (retour SQLite)

Si problème:

```prisma
// schema.prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

```env
# .env
DATABASE_URL="file:./dev.db"
```

```bash
npx prisma generate
npm run dev
```
