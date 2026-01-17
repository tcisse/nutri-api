Agis comme un Lead Backend Developer expert en Node.js et Express.
Je veux créer une API pour une application de nutrition basée sur des règles mathématiques strictes issues d'un guide nutritionnel.

### STACK TECHNIQUE
- Node.js / Express
- Langage : TypeScript (strict mode)
- Base de données simplifiée pour le MVP : Utilise un fichier local `data.json` ou `lowdb` pour stocker les règles et les utilisateurs (pas de MongoDB pour l'instant).
- Validation : Zod

### OBJECTIF DU PROJET
L'API doit recevoir les données d'un utilisateur (poids, taille, etc.), calculer ses besoins caloriques, et générer un plan alimentaire structuré basé sur des tableaux de correspondance précis.

### RÈGLES MÉTIER (CRITIQUE)
1. CALCUL CALORIQUE :
   - Utilise la formule Mifflin-St Jeor.
   - Applique le facteur d'activité.
   - Applique l'objectif (-300 kcal pour perte, +300 pour prise).
   - IMPORTANT : Arrondis le résultat à la centaine la plus proche (ex: 1440 -> 1400, 1460 -> 1500).

2. LOGIQUE DES PORTIONS (BUDGET) :
   - Une fois les calories arrondies trouvées, tu dois regarder dans une table de correspondance statique pour trouver le nombre de portions.
   - NE CALCULE PAS les portions mathématiquement, utilise la "Table de Lookup" ci-dessous.

3. LOGIQUE DE DISPATCHING :
   - Une fois les portions totales connues (ex: 7 Féculents), répartis-les selon le modèle : Petit-Déjeuner, Déjeuner, Dîner, Collation.

### DATA CONTEXT (Les Tableaux du Guide)
Voici les données brutes à intégrer en dur dans le code (constantes) :

// TABLEAU A : Budget Portions par Calories [Source: Guide PDF]
const PORTION_RULES = {
  1200: { starch: 5, fruit: 3, milk: 2, veg: 2, protein: 4, fat: 3 },
  1300: { starch: 6, fruit: 3, milk: 2, veg: 2, protein: 4, fat: 3 },
  1400: { starch: 6, fruit: 3, milk: 2, veg: 2, protein: 5, fat: 4 },
  1500: { starch: 7, fruit: 3, milk: 2, veg: 3, protein: 5, fat: 4 },
  1600: { starch: 7, fruit: 3, milk: 3, veg: 3, protein: 5, fat: 4 },
  1800: { starch: 8, fruit: 3, milk: 3, veg: 4, protein: 6, fat: 5 },
  2000: { starch: 9, fruit: 4, milk: 3, veg: 5, protein: 6, fat: 6 },
  2200: { starch: 11, fruit: 4, milk: 3, veg: 5, protein: 6, fat: 7 },
  2500: { starch: 13, fruit: 4, milk: 3, veg: 5, protein: 8, fat: 8 }
  // (Interpole les valeurs manquantes si nécessaire de manière logique)
};

// TABLEAU B : Matrice de Répartition (Exemple basé sur le modèle standard)
const DISPATCH_PRIORITY = {
  // Ordre de priorité pour remplir les repas si le nombre de portions change
  lunch: { starch: "high", protein: "high", veg: "medium" },
  breakfast: { starch: "medium", protein: "medium", fruit: "high" },
  dinner: { starch: "low", protein: "low", veg: "high" } // Le dîner doit rester léger
};

// ANNEXE A : Exemple d'Aliments (Seed Data)
const FOOD_DATABASE = [
  { id: "f1", name: "Riz cuit", group: "starch", portion: "1/3 tasse", unit_g: 50, tags: ["general", "senegal"] },
  { id: "f2", name: "Igname bouillie", group: "starch", portion: "75g", unit_g: 75, tags: ["benin", "togo"] },
  { id: "f3", name: "Banane Plantain", group: "starch", portion: "65g", unit_g: 65, tags: ["cote_ivoire", "benin"] },
  { id: "p1", name: "Poulet (sans peau)", group: "protein", portion: "28g", unit_g: 28, tags: ["general"] },
  { id: "p2", name: "Poisson Tilapia", group: "protein", portion: "28g", unit_g: 28, tags: ["general"] },
  { id: "v1", name: "Gombo", group: "veg", portion: "1/2 tasse", unit_g: 80, tags: ["general"] },
  { id: "v2", name: "Épinards (Gboma)", group: "veg", portion: "1/2 tasse", unit_g: 80, tags: ["benin"] }
];

### TÂCHES À RÉALISER MAINTENANT
1. Initialise le projet (package.json, tsconfig).
2. Crée le serveur Express de base.
3. Implémente l'endpoint `POST /api/calculate` qui prend {age, weight, height, gender, activity} et retourne le plan calorique et le budget portions.
4. Implémente l'endpoint `POST /api/generate-menu` qui prend le budget portions et retourne un menu JSON détaillé avec des aliments choisis aléatoirement dans la liste.

Commence par la structure des dossiers et les fichiers de configuration.