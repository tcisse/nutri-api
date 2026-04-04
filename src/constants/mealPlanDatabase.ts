/**
 * Plan Alimentaire Togo — 28 jours
 * Source: Plan Alimentaire 100% Africain, Version Togolaise
 * Objectif: -5 kg en 1 mois · Programme de 30 jours · Alimentation 100% africaine et équilibrée
 *
 * Les jours 29–31 (mois longs) répètent les jours 1–3.
 */

export interface MealItem {
  name: string; // Description complète de l'aliment (quantité + nom)
  notes?: string;
}

export interface DayMeals {
  breakfast: MealItem[];
  lunch: MealItem[];
  snack: MealItem[];
  dinner: MealItem[];
}

export interface DayPlan {
  day: number;     // 1–28
  weekDay: string; // "Lundi", "Mardi", etc.
  week: number;    // 1–4
  meals: DayMeals;
}

export const MEAL_PLAN: DayPlan[] = [
  // ===================== SEMAINE 1 =====================
  {
    day: 1, weekDay: "Lundi", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "2 omelettes (2cc huile)" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "130g plantain bouilli" },
        { name: "1 œuf au plat" },
        { name: "1 blanc d'œuf" },
        { name: "5ml huile" },
        { name: "légumes" },
        { name: "1 fruit" },
      ],
      snack: [
        { name: "1 tasse pop corn (2cc huile)" },
      ],
      dinner: [
        { name: "3 pièces igname bouilli" },
        { name: "œufs brouillés aux légumes (oignon, gingembre, tomates, ail)" },
        { name: "2cc huile" },
      ],
    },
  },
  {
    day: 2, weekDay: "Mardi", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "2 œufs durs" },
        { name: "50g poisson fumé" },
        { name: "1cc mayo" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "sauce tomate (2cc huile)" },
        { name: "1 œuf" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "6 pcs noix de cajou ou 10 pcs arachide" },
      ],
      dinner: [
        { name: "1/3 avocat" },
        { name: "2 tranches pain" },
        { name: "2 œufs durs" },
      ],
    },
  },
  {
    day: 3, weekDay: "Mercredi", week: 1,
    meals: {
      breakfast: [
        { name: "1,5 tasse corn flakes" },
        { name: "1/3 tasse lait écrémé" },
        { name: "cuisse poulet sans peau (airfryer)" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 plastique akpan" },
        { name: "soupe de gboma (2cc huile de palme)" },
        { name: "50g poisson fumé" },
      ],
      snack: [
        { name: "1 épi de maïs bouilli" },
      ],
      dinner: [
        { name: "1 morceau abolo" },
        { name: "légumes sardine (tomates, oignon, piments)" },
        { name: "2cc huile" },
        { name: "curry, thym" },
      ],
    },
  },
  {
    day: 4, weekDay: "Jeudi", week: 1,
    meals: {
      breakfast: [
        { name: "1 yaourt nature" },
        { name: "10 pcs noix de cajou" },
      ],
      lunch: [
        { name: "feuilles gboma" },
        { name: "50g poulet bouilli" },
      ],
      snack: [
        { name: "1 yaourt nature" },
      ],
      dinner: [
        { name: "2csp mayo allégée" },
        { name: "2 tomates en dés" },
        { name: "2 œufs" },
      ],
    },
  },
  {
    day: 5, weekDay: "Vendredi", week: 1,
    meals: {
      breakfast: [
        { name: "25g flocons d'avoine" },
        { name: "1 yaourt" },
        { name: "6 pcs noix de cajou" },
        { name: "1 petite banane" },
      ],
      lunch: [
        { name: "3 pièces taro bouilli" },
        { name: "2 œufs brouillés aux légumes" },
        { name: "2cc huile" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "2 cookies" },
      ],
      dinner: [
        { name: "1/2 concombre" },
        { name: "1 thon" },
        { name: "2 œufs" },
        { name: "légumes (tomates, oignon)" },
        { name: "2 tranches pain" },
      ],
    },
  },
  {
    day: 6, weekDay: "Samedi", week: 1,
    meals: {
      breakfast: [
        { name: "1 pomme" },
        { name: "1 petite banane" },
        { name: "1 yaourt nature" },
        { name: "1csp granola" },
      ],
      lunch: [
        { name: "plantain braisé" },
        { name: "légumes (oignon, tomates, piment)" },
        { name: "2cc huile" },
        { name: "1 œuf" },
      ],
      snack: [
        { name: "biscuit 25g" },
        { name: "1 yaourt nature" },
      ],
      dinner: [
        { name: "1 banane frite (airfryer)" },
        { name: "légumes (carottes, oignon)" },
        { name: "50g blanc de poulet" },
      ],
    },
  },
  {
    day: 7, weekDay: "Dimanche", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "50g poisson fumé" },
        { name: "1csp mayo allégée" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "soupe gboma (2cc huile de palme)" },
        { name: "1 œuf" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "1 mangue" },
      ],
      dinner: [
        { name: "1 tasse pâte de maïs" },
        { name: "légumes (oignon, tomates, poivron)" },
        { name: "1 pilon poulet airfryer sans peau" },
      ],
    },
  },

  // ===================== SEMAINE 2 =====================
  {
    day: 8, weekDay: "Lundi", week: 2,
    meals: {
      breakfast: [
        { name: "3 tranches pain" },
        { name: "thé/café (2csp lait écrémé + 1cc miel)" },
        { name: "omelette 2 œufs (1cc huile)" },
      ],
      lunch: [
        { name: "1 tasse haricots" },
        { name: "1cc huile de palme" },
        { name: "2 tranches pain" },
        { name: "50g viande bouillie" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "1 banane" },
      ],
      dinner: [
        { name: "1/2 tasse maïs doux" },
        { name: "1/2 concombre" },
        { name: "2 carottes" },
        { name: "1cc mayo entière" },
      ],
    },
  },
  {
    day: 9, weekDay: "Mardi", week: 2,
    meals: {
      breakfast: [
        { name: "3 tranches papaye" },
        { name: "1/2 tasse lait + 1cc miel" },
        { name: "1,5 tasse corn flakes" },
      ],
      lunch: [
        { name: "1 plastique akpan" },
        { name: "50g poulet bouilli" },
        { name: "légumes (carottes, oignon, poivron vert et rouge)" },
      ],
      snack: [
        { name: "1 tranche pain" },
        { name: "2 œufs" },
        { name: "1csp mayo allégée" },
      ],
      dinner: [
        { name: "soupe de poisson (voir recette)" },
      ],
    },
  },
  {
    day: 10, weekDay: "Mercredi", week: 2,
    meals: {
      breakfast: [
        { name: "2 œufs frits (2cc huile)" },
        { name: "2 tranches pain" },
        { name: "1/2 tasse lait" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "3 pièces patate douce" },
        { name: "2 œufs brouillés aux légumes (tomates, oignon, poivron)" },
        { name: "2cc huile" },
      ],
      snack: [
        { name: "1 mangue" },
        { name: "10 pcs noix de cajou" },
        { name: "1 yaourt nature" },
      ],
      dinner: [
        { name: "2 tranches pain" },
        { name: "2 omelettes aux légumes" },
        { name: "2cc huile" },
      ],
    },
  },
  {
    day: 11, weekDay: "Jeudi", week: 2,
    meals: {
      breakfast: [
        { name: "1 banane frite airfryer (2cc huile)" },
        { name: "1 tasse légumes (tomates, poivron, oignon)" },
      ],
      lunch: [
        { name: "riz au ragoût (min huile)" },
        { name: "salade de chou" },
        { name: "poulet grillé" },
        { name: "1 pomme" },
      ],
      snack: [
        { name: "1csp granola" },
        { name: "1 pomme" },
        { name: "1 yaourt" },
        { name: "1 petite banane" },
      ],
      dinner: [
        { name: "1 morceau abolo" },
        { name: "soupe feuilles adémé (peu d'huile)" },
        { name: "50g poisson fumé" },
        { name: "1csp huile palme" },
      ],
    },
  },
  {
    day: 12, weekDay: "Vendredi", week: 2,
    meals: {
      breakfast: [
        { name: "1 yaourt nature" },
        { name: "10 pcs arachide" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 plastique akpan" },
        { name: "ndolé (peu d'huile)" },
        { name: "50g viande de bœuf bouillie" },
      ],
      snack: [
        { name: "1 tasse granola" },
        { name: "2cc miel" },
        { name: "1 banane poêlée" },
        { name: "1 yaourt" },
        { name: "pépites chocolat noir" },
      ],
      dinner: [
        { name: "1 tasse pâte de maïs" },
        { name: "sauce tomate" },
        { name: "50g poisson fumé" },
      ],
    },
  },
  {
    day: 13, weekDay: "Samedi", week: 2,
    meals: {
      breakfast: [
        { name: "130g plantain vapeur" },
        { name: "2 œufs" },
        { name: "1 tasse légumes (carottes, chou)" },
        { name: "1 orange" },
        { name: "1cc huile" },
      ],
      lunch: [
        { name: "1 morceau abolo" },
        { name: "1 queue de poisson" },
        { name: "1 tasse soupe gboma" },
        { name: "1cc huile de palme" },
      ],
      snack: [
        { name: "1/2 yaourt nature" },
        { name: "1csp granola" },
        { name: "6 pcs noix de cajou" },
      ],
      dinner: [
        { name: "1 tasse pâte de maïs" },
        { name: "légumes (oignon, tomates, piments)" },
        { name: "1 queue de poisson" },
      ],
    },
  },
  {
    day: 14, weekDay: "Dimanche", week: 2,
    meals: {
      breakfast: [
        { name: "1/2 tasse flocons d'avoine" },
        { name: "1 banane" },
        { name: "1 œuf" },
        { name: "1/3 tasse lait écrémé" },
      ],
      lunch: [
        { name: "3 pommes de terre" },
        { name: "1 œuf" },
        { name: "légumes (tomates, oignon, poivron)" },
      ],
      snack: [
        { name: "1 biscuit (moins de 100 cal)" },
      ],
      dinner: [
        { name: "1 tasse haricots" },
        { name: "œufs brouillés" },
        { name: "légumes au choix" },
      ],
    },
  },

  // ===================== SEMAINE 3 =====================
  {
    day: 15, weekDay: "Lundi", week: 3,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "œuf au plat" },
        { name: "2 feuilles laitue" },
        { name: "1 tasse lait écrémé" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "soupe de poisson (voir recette)" },
      ],
      snack: [
        { name: "1 sachet lait écrémé" },
        { name: "1 pomme" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "1 tasse légumes (chou, carotte)" },
        { name: "1 pilon poulet airfryer sans peau" },
      ],
    },
  },
  {
    day: 16, weekDay: "Mardi", week: 3,
    meals: {
      breakfast: [
        { name: "3 petites pommes de terre bouillies" },
        { name: "œuf au plat" },
        { name: "1 tasse lait écrémé" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "1 tasse chou" },
        { name: "50g poulet (airfryer)" },
      ],
      snack: [
        { name: "2 cookies à la banane (voir recette)" },
      ],
      dinner: [
        { name: "1 bol légumes feuilles eru (2cc huile)" },
        { name: "50g poisson fumé" },
      ],
    },
  },
  {
    day: 17, weekDay: "Mercredi", week: 3,
    meals: {
      breakfast: [
        { name: "1 plastique akpan" },
        { name: "1/2 boîte thon" },
        { name: "1 tasse lait écrémé" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "légumes (carottes, chou, 1cc mayo)" },
        { name: "1/2 tasse riz" },
        { name: "1/2 tasse haricots" },
        { name: "1 pilon poulet airfryer sans peau" },
      ],
      snack: [
        { name: "1 morceau gâteau à la banane (voir recette)" },
      ],
      dinner: [
        { name: "poulet braisé (2cc huile)" },
        { name: "1 tasse pâte de maïs" },
        { name: "1 bol légumes (tomates, oignon)" },
      ],
    },
  },
  {
    day: 18, weekDay: "Jeudi", week: 3,
    meals: {
      breakfast: [
        { name: "1 tasse avoine" },
        { name: "1 tasse lait écrémé" },
        { name: "1 petite banane" },
        { name: "1 morceau poisson (airfryer)" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "sauce tomate (1cc huile)" },
        { name: "1 tasse légumes" },
        { name: "1 pilon poulet bouilli sans peau" },
      ],
      snack: [
        { name: "1 tasse lait" },
        { name: "1csp matcha" },
      ],
      dinner: [
        { name: "3 morceaux taro bouilli" },
        { name: "jus légumes (tomates, oignon, queue poisson airfryer ou 2cc huile)" },
      ],
    },
  },
  {
    day: 19, weekDay: "Vendredi", week: 3,
    meals: {
      breakfast: [
        { name: "150g patates douces" },
        { name: "50g poisson" },
        { name: "1 tasse légumes mélangés + 5ml huile" },
        { name: "1/3 tasse lait écrémé" },
      ],
      lunch: [
        { name: "1/2 tasse haricots" },
        { name: "1cc huile arachide" },
        { name: "1 morceau abolo" },
        { name: "50g viande bouillie" },
      ],
      snack: [
        { name: "2 biscuits banane (2 bananes + 1csp beurre cacahuètes + 2 œufs, airfryer 180°C/9min)" },
      ],
      dinner: [
        { name: "2 petites pommes de terre" },
        { name: "soupe aux épices togolaises (gingembre, piment, ail)" },
        { name: "100g crevettes cuites" },
      ],
    },
  },
  {
    day: 20, weekDay: "Samedi", week: 3,
    meals: {
      breakfast: [
        { name: "1/2 tasse maïs doux" },
        { name: "150g blanc poulet" },
        { name: "1 banane" },
        { name: "légumes (chou, carottes)" },
        { name: "2csp mayo allégée" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "légumes (poivron rouge, vert, oignon)" },
        { name: "omelette 2 œufs (2cc huile)" },
      ],
      snack: [
        { name: "2 galettes (2csp yaourt + 2/3csp farine de blé, airfryer 180°C/9min)" },
      ],
      dinner: [
        { name: "salade : chou, laitue, 1/2 boîte haricots, 1/2 tasse maïs doux, 1 fruit en dés, 1 œuf dur" },
      ],
    },
  },
  {
    day: 21, weekDay: "Dimanche", week: 3,
    meals: {
      breakfast: [
        { name: "smoothie 4 fruits ou salade de fruits" },
        { name: "100g poulet sans peau (airfryer)" },
      ],
      lunch: [
        { name: "1 tasse pâtes alimentaires" },
        { name: "légumes (tomates, piment, oignon, poivron)" },
        { name: "1 œuf" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "1csp granola" },
        { name: "quelques fruits rouges" },
      ],
      dinner: [
        { name: "1 petit plantain rôti" },
        { name: "sauce légumes (oignon, tomates)" },
        { name: "5ml huile" },
      ],
    },
  },

  // ===================== SEMAINE 4 =====================
  {
    day: 22, weekDay: "Lundi", week: 4,
    meals: {
      breakfast: [
        { name: "2 petites tasses patates douces" },
        { name: "50g poisson" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "légumes (chou, carottes)" },
        { name: "1 queue poisson (airfryer)" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "quelques fruits rouges" },
      ],
      dinner: [
        { name: "2 tasses pastèque" },
        { name: "2 tranches pain" },
        { name: "omelette 2 œufs aux légumes" },
        { name: "2cc huile" },
      ],
    },
  },
  {
    day: 23, weekDay: "Mardi", week: 4,
    meals: {
      breakfast: [
        { name: "1,5 tasse corn flakes" },
        { name: "1csp lait écrémé" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 plastique akpan" },
        { name: "légumes (poivron, tomates, oignon, 1cc huile)" },
        { name: "1 morceau thon" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "1cc beurre cacahuètes" },
        { name: "granola" },
      ],
      dinner: [
        { name: "2/3 tasse yaourt allégé" },
        { name: "1 orange" },
        { name: "2 tranches pain" },
        { name: "1/3 avocat" },
        { name: "1 œuf" },
      ],
    },
  },
  {
    day: 24, weekDay: "Mercredi", week: 4,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "2 omelettes (2cc huile)" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "plantain braisé (airfryer)" },
        { name: "2 œufs brouillés aux légumes (tomates, oignon)" },
      ],
      snack: [
        { name: "1/2 tasse céréales" },
        { name: "1 fruit" },
      ],
      dinner: [
        { name: "1 tasse avoine" },
        { name: "1 tasse lait écrémé" },
        { name: "1 petite banane" },
        { name: "1 morceau poisson moyen" },
      ],
    },
  },
  {
    day: 25, weekDay: "Jeudi", week: 4,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "2 œufs durs" },
        { name: "50g poisson fumé" },
        { name: "1cc mayo" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "130g plantain bouilli" },
        { name: "1 œuf au plat" },
        { name: "1 blanc d'œuf" },
        { name: "5ml huile" },
        { name: "légumes" },
        { name: "1 fruit" },
      ],
      snack: [
        { name: "1 tasse pop corn (2cc huile)" },
      ],
      dinner: [
        { name: "3 pièces igname bouilli" },
        { name: "œufs brouillés aux légumes (oignon, gingembre, tomates, ail)" },
        { name: "2cc huile" },
      ],
    },
  },
  {
    day: 26, weekDay: "Vendredi", week: 4,
    meals: {
      breakfast: [
        { name: "1,5 tasse corn flakes" },
        { name: "1/3 tasse lait écrémé" },
        { name: "cuisse poulet sans peau (airfryer)" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "sauce tomate (2cc huile)" },
        { name: "1 œuf" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "6 pcs noix de cajou ou 10 pcs arachide" },
      ],
      dinner: [
        { name: "1/3 avocat" },
        { name: "2 tranches pain" },
        { name: "2 œufs durs" },
      ],
    },
  },
  {
    day: 27, weekDay: "Samedi", week: 4,
    meals: {
      breakfast: [
        { name: "1 mangue en dés" },
        { name: "1 yaourt nature" },
        { name: "10 pcs noix de cajou" },
      ],
      lunch: [
        { name: "1 plastique akpan" },
        { name: "soupe ndolé (2cc huile de palme)" },
        { name: "50g poisson fumé" },
      ],
      snack: [
        { name: "1 épi de maïs bouilli" },
      ],
      dinner: [
        { name: "1 morceau abolo" },
        { name: "légumes sardine (tomates, oignon, piments)" },
        { name: "2cc huile" },
        { name: "curry, thym" },
      ],
    },
  },
  {
    day: 28, weekDay: "Dimanche", week: 4,
    meals: {
      breakfast: [
        { name: "25g flocons d'avoine" },
        { name: "1 yaourt" },
        { name: "6 pcs noix de cajou" },
        { name: "1 petite banane" },
      ],
      lunch: [
        { name: "1 plastique akpan" },
        { name: "soupe feuilles adémé" },
        { name: "50g poulet bouilli" },
      ],
      snack: [
        { name: "1 biscuit" },
        { name: "1 yaourt nature" },
      ],
      dinner: [
        { name: "salade : 1/3 avocat, laitue, 2csp mayo allégée, 2 tomates en dés, 2 œufs" },
      ],
    },
  },
];

/**
 * Retourne le plan du jour (1-based, avec wrapping pour les jours > 28)
 */
export const getDayPlan = (dayIndex: number): DayPlan => {
  const idx = ((dayIndex - 1) % 28);
  return MEAL_PLAN[idx];
};

// Multi-country support
// Import lazily to avoid circular deps — each country file imports DayPlan from here
let _gabonPlan: DayPlan[] | null = null;
let _camerounPlan: DayPlan[] | null = null;
let _senegalPlan: DayPlan[] | null = null;
let _maliPlan: DayPlan[] | null = null;
let _burkinaPlan: DayPlan[] | null = null;
let _beninCIPlan: DayPlan[] | null = null;

async function loadGabonPlan(): Promise<DayPlan[]> {
  if (!_gabonPlan) {
    const m = await import("./mealPlanGabon.js");
    _gabonPlan = m.GABON_MEAL_PLAN;
  }
  return _gabonPlan;
}

async function loadCamerounPlan(): Promise<DayPlan[]> {
  if (!_camerounPlan) {
    const m = await import("./mealPlanCameroun.js");
    _camerounPlan = m.CAMEROUN_MEAL_PLAN;
  }
  return _camerounPlan;
}

async function loadSenegalPlan(): Promise<DayPlan[]> {
  if (!_senegalPlan) {
    const m = await import("./mealPlanSenegal.js");
    _senegalPlan = m.SENEGAL_MEAL_PLAN;
  }
  return _senegalPlan;
}

async function loadMaliPlan(): Promise<DayPlan[]> {
  if (!_maliPlan) {
    const m = await import("./mealPlanMali.js");
    _maliPlan = m.MALI_MEAL_PLAN;
  }
  return _maliPlan;
}

async function loadBurkinaPlan(): Promise<DayPlan[]> {
  if (!_burkinaPlan) {
    const m = await import("./mealPlanBurkina.js");
    _burkinaPlan = m.BURKINA_MEAL_PLAN;
  }
  return _burkinaPlan;
}

async function loadBeninCIPlan(): Promise<DayPlan[]> {
  if (!_beninCIPlan) {
    const m = await import("./mealPlanBeninCI.js");
    _beninCIPlan = m.BENIN_CI_MEAL_PLAN;
  }
  return _beninCIPlan;
}

export async function getPlanForCountry(country: string): Promise<DayPlan[]> {
  switch (country) {
    case "gabon":
      return loadGabonPlan();
    case "cameroun":
      return loadCamerounPlan();
    case "senegal":
      return loadSenegalPlan();
    case "mali":
      return loadMaliPlan();
    case "burkina":
      return loadBurkinaPlan();
    case "benin":
    case "cote_ivoire":
      return loadBeninCIPlan();
    default:
      // Togo plan is the default for all other countries
      return MEAL_PLAN;
  }
}

export async function getDayPlanForCountry(country: string, dayIndex: number): Promise<DayPlan> {
  const plan = await getPlanForCountry(country);
  const idx = ((dayIndex - 1) % 28);
  return plan[idx];
}
