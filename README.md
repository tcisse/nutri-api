# 🥗 Nutri API

API de nutrition pour le calcul calorique et la génération de menus personnalisés, basée sur des règles nutritionnelles strictes.

## 📦 Stack Technique

- **Node.js / Express** - Serveur HTTP
- **TypeScript** - Typage strict
- **Zod** - Validation des données
- **lowdb** - Base de données JSON (prévu pour le MVP)

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Lancer en mode développement
npm run dev

# Build production
npm run build
npm start
```

## 📡 Endpoints

### `GET /health`
Vérification de l'état du serveur.

**Réponse:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### `GET /api/info`
Informations sur l'API et les régions supportées.

### `POST /api/calculate`
Calcule les besoins caloriques et le budget portions.

**Body:**
```json
{
  "age": 30,
  "weight": 70,
  "height": 175,
  "gender": "male",
  "activity": "moderate",
  "goal": "maintain"
}
```

**Paramètres:**
| Champ | Type | Description |
|-------|------|-------------|
| `age` | number | Âge (15-100 ans) |
| `weight` | number | Poids en kg (30-300) |
| `height` | number | Taille en cm (100-250) |
| `gender` | string | `"male"` ou `"female"` |
| `activity` | string | Niveau d'activité (voir ci-dessous) |
| `goal` | string | `"lose"`, `"maintain"` ou `"gain"` |

**Niveaux d'activité:**
- `sedentary` - Sédentaire (peu ou pas d'exercice)
- `light` - Légèrement actif (1-3 jours/semaine)
- `moderate` - Modérément actif (3-5 jours/semaine)
- `active` - Très actif (6-7 jours/semaine)
- `extra_active` - Extrêmement actif

**Réponse:**
```json
{
  "success": true,
  "data": {
    "bmr": 1680,
    "tdee": 2604,
    "targetCalories": 2604,
    "roundedCalories": 2600,
    "portionBudget": {
      "starch": 12,
      "fruit": 4,
      "milk": 3,
      "veg": 5,
      "protein": 7,
      "fat": 8
    },
    "descriptions": {
      "activity": "Modérément actif (exercice modéré 3-5 jours/semaine)",
      "goal": "Maintien du poids"
    }
  }
}
```

### `POST /api/generate-menu`
Génère un menu journalier basé sur le budget portions.

**Body:**
```json
{
  "portionBudget": {
    "starch": 9,
    "fruit": 4,
    "milk": 3,
    "veg": 5,
    "protein": 6,
    "fat": 6
  },
  "preferredRegion": "senegal"
}
```

**Régions supportées:**
`general`, `senegal`, `mali`, `benin`, `togo`, `ghana`, `cote_ivoire`, `cameroun`, `guinea`, `burkina`, `niger`, `congo`, `nigeria`

## 🔬 Règles Métier

### Formule Mifflin-St Jeor (BMR)
- **Homme:** `(10 × poids) + (6.25 × taille) - (5 × âge) + 5`
- **Femme:** `(10 × poids) + (6.25 × taille) - (5 × âge) - 161`

### Facteurs d'activité
| Niveau | Facteur |
|--------|---------|
| Sédentaire | 1.2 |
| Léger | 1.375 |
| Modéré | 1.55 |
| Actif | 1.725 |
| Extra actif | 1.9 |

### Ajustement selon l'objectif
- **Perte:** -300 kcal
- **Maintien:** 0 kcal
- **Prise:** +300 kcal

### Arrondi calorique
Les calories sont arrondies à la **centaine la plus proche** :
- 1440 → 1400
- 1460 → 1500

## 📁 Structure du Projet

```
nutri-api/
├── src/
│   ├── constants/       # Tables de lookup (portions, aliments)
│   ├── controllers/     # Logique des endpoints
│   ├── middlewares/     # Error handler, validation
│   ├── routes/          # Définition des routes
│   ├── schemas/         # Schémas Zod
│   ├── services/        # Logique métier
│   ├── types/           # Types TypeScript
│   └── index.ts         # Point d'entrée
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 License

ISC
