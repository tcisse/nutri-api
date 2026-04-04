/**
 * Plan Alimentaire Sénégal — 28 jours
 * Source: Plan Alimentaire 100% Africain, Version Sénégalaise
 */

import type { DayPlan } from "./mealPlanDatabase.js";

export const SENEGAL_MEAL_PLAN: DayPlan[] = [
  // ===================== SEMAINE 1 =====================
  {
    day: 1, weekDay: "Lundi", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches pain baguette" },
        { name: "2 oeufs durs" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "Ceebu jen allégé (1 tasse riz + 100g thiof airfryer)" },
        { name: "légumes cuits: carottes + chou (2cc huile)" },
      ],
      snack: [
        { name: "1 verre lait caillé" },
        { name: "1 banane" },
      ],
      dinner: [
        { name: "1 tasse couscous de mil" },
        { name: "sauce légumes (oignon + tomates + 1cc huile)" },
        { name: "50g poulet bouilli sans peau" },
      ],
    },
  },
  {
    day: 2, weekDay: "Mardi", week: 1,
    meals: {
      breakfast: [
        { name: "Fondé: 1 tasse couscous mil + 1 verre lait caillé + 1cc miel" },
        { name: "1 petite banane" },
      ],
      lunch: [
        { name: "Yassa poulet allégé: 50g poulet (airfryer)" },
        { name: "oignons braisés (1cc huile) + moutarde + citron" },
        { name: "1 tasse riz" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "6 pcs acajou ou 10 pcs arachide" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "soupe kandia allégé (gombo + 50g poisson fumé + 1cc huile)" },
      ],
    },
  },
  {
    day: 3, weekDay: "Mercredi", week: 1,
    meals: {
      breakfast: [
        { name: "1,5 tasse corn flakes" },
        { name: "1/3 tasse lait écrémé" },
        { name: "50g poulet airfryer" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "Mafé allégé: 1 boule couscous" },
        { name: "sauce arachide (1csp pâte arachide + tomate + oignon + 1cc huile)" },
        { name: "50g poulet bouilli" },
      ],
      snack: [
        { name: "1 épi de maïs bouilli" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "sauce gombo + 50g poisson fumé (airfryer) + 1cc huile" },
      ],
    },
  },
  {
    day: 4, weekDay: "Jeudi", week: 1,
    meals: {
      breakfast: [
        { name: "25g flocons d'avoine" },
        { name: "1 tasse lait écrémé" },
        { name: "6 pcs acajou" },
        { name: "1 banane" },
      ],
      lunch: [
        { name: "1 tasse fonio" },
        { name: "sauce légumes (carottes + oignon + poivron + 1cc huile)" },
        { name: "50g poulet bouilli" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "2 cookies banane" },
      ],
      dinner: [
        { name: "Salade: 1/3 avocat + 2 oeufs durs" },
        { name: "2 tomates + 1 feuille laitue" },
        { name: "2csp mayo allégée" },
      ],
    },
  },
  {
    day: 5, weekDay: "Vendredi", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "omelette 2 oeufs (1cc huile)" },
        { name: "1 tomate + 1 pomme" },
      ],
      lunch: [
        { name: "Yassa poisson allégé: 100g thiof (airfryer)" },
        { name: "oignons (1cc huile) + citron" },
        { name: "1 tasse riz" },
      ],
      snack: [
        { name: "Thiakry: 2csp couscous mil + 1 yaourt nature + 1cc miel" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "sauce tomate (1cc huile) + 1 oeuf" },
        { name: "1 tasse chou" },
      ],
    },
  },
  {
    day: 6, weekDay: "Samedi", week: 1,
    meals: {
      breakfast: [
        { name: "1 mangue en dés" },
        { name: "1 yaourt nature" },
        { name: "1csp granola" },
      ],
      lunch: [
        { name: "1 tasse riz gras (min huile)" },
        { name: "légumes (chou + carottes)" },
        { name: "50g poisson airfryer" },
      ],
      snack: [
        { name: "Bouye: 1 verre boisson baobab (peu sucré) ou 1 orange" },
      ],
      dinner: [
        { name: "130g igname bouilli" },
        { name: "2 oeufs brouillés aux légumes (oignon + tomates + 2cc huile)" },
      ],
    },
  },
  {
    day: 7, weekDay: "Dimanche", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "1/2 boite sardines" },
        { name: "1csp mayo allégée + 1 pomme" },
      ],
      lunch: [
        { name: "Ceebu jen allégé: 1 tasse riz" },
        { name: "légumes africains (carottes + chou + aubergine)" },
        { name: "50g poisson airfryer" },
      ],
      snack: [
        { name: "1 yaourt nature + 1 orange" },
      ],
      dinner: [
        { name: "1 tasse couscous de mil" },
        { name: "légumes (oignon + tomates + poivron)" },
        { name: "50g poulet airfryer sans peau" },
      ],
    },
  },
  // ===================== SEMAINE 2 =====================
  {
    day: 8, weekDay: "Lundi", week: 2,
    meals: {
      breakfast: [
        { name: "3 tranches pain" },
        { name: "omelette 2 oeufs (1cc huile)" },
        { name: "1 tasse lait écrémé" },
      ],
      lunch: [
        { name: "1 tasse riz + haricots niébé (1cc huile)" },
        { name: "50g viande bouillie" },
      ],
      snack: [
        { name: "1 yaourt nature + 1 banane" },
      ],
      dinner: [
        { name: "1/2 tasse maïs doux" },
        { name: "1/2 concombre + 2 carottes" },
        { name: "1cc mayo" },
      ],
    },
  },
  {
    day: 9, weekDay: "Mardi", week: 2,
    meals: {
      breakfast: [
        { name: "Fondé: 1 tasse couscous mil + 1/2 lait Peak + 1cc miel" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "Mafé allégé: 1 tasse riz" },
        { name: "sauce arachide légère (1csp pâte ara + tomate + oignon + 1cc huile)" },
        { name: "50g poulet" },
      ],
      snack: [
        { name: "1 tranche pain + 2 oeufs + 1csp mayo allégée" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "soupe kandia allégé (gombo + 50g crevettes cuites + 1cc huile)" },
      ],
    },
  },
  {
    day: 10, weekDay: "Mercredi", week: 2,
    meals: {
      breakfast: [
        { name: "2 oeufs frits (2cc huile)" },
        { name: "2 tranches pain + 1 pomme" },
      ],
      lunch: [
        { name: "1 tasse fonio" },
        { name: "sauce légumes (carottes + oignon + poivron)" },
        { name: "50g poisson bouilli" },
      ],
      snack: [
        { name: "1 mangue + 10 pcs acajou + 1 yaourt nature" },
      ],
      dinner: [
        { name: "2 tranches pain" },
        { name: "omelette 2 oeufs aux légumes + 2cc huile" },
      ],
    },
  },
  {
    day: 11, weekDay: "Jeudi", week: 2,
    meals: {
      breakfast: [
        { name: "1 banane poêlée (1cc huile)" },
        { name: "1 tasse légumes (tomates + oignon)" },
      ],
      lunch: [
        { name: "Yassa poulet allégé: 50g poulet airfryer" },
        { name: "oignons (1cc huile) + citron + 1 tasse riz" },
        { name: "1 pomme" },
      ],
      snack: [
        { name: "1csp granola + 1 pomme + 1 yaourt + 1 banane" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "sauce feuilles (moringa ou bissap vert + 2cc huile)" },
        { name: "50g poisson fumé" },
      ],
    },
  },
  {
    day: 12, weekDay: "Vendredi", week: 2,
    meals: {
      breakfast: [
        { name: "1 yaourt nature + 10 pcs arachide + 1 pomme" },
      ],
      lunch: [
        { name: "1 tasse fonio" },
        { name: "sauce légumes verts" },
        { name: "50g viande bouillie" },
      ],
      snack: [
        { name: "1 tasse granola + 2cc miel + 1 banane + 1 yaourt nature" },
      ],
      dinner: [
        { name: "Thiébou yapp allégé: 1 tasse riz" },
        { name: "50g viande bouillie + légumes (oignon + tomates + 1cc huile)" },
      ],
    },
  },
  {
    day: 13, weekDay: "Samedi", week: 2,
    meals: {
      breakfast: [
        { name: "130g igname vapeur" },
        { name: "2 oeufs + légumes (carottes + chou) + 1cc huile" },
        { name: "1 orange" },
      ],
      lunch: [
        { name: "3/8 tasse gari" },
        { name: "1 queue de poisson airfryer" },
        { name: "1 tasse gombo + 1cc huile" },
      ],
      snack: [
        { name: "1/2 yaourt + 1csp granola + 6 pcs acajou" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "légumes (oignon + tomates + piments)" },
        { name: "50g poulet airfryer sans peau" },
      ],
    },
  },
  {
    day: 14, weekDay: "Dimanche", week: 2,
    meals: {
      breakfast: [
        { name: "1/2 tasse flocons d'avoine" },
        { name: "1 banane + 1 oeuf" },
        { name: "1/3 tasse lait écrémé" },
      ],
      lunch: [
        { name: "3 pommes de terre" },
        { name: "2 oeufs + légumes (tomates + oignon + poivron) + 2cc huile" },
      ],
      snack: [
        { name: "1 biscuit < 100 cal" },
      ],
      dinner: [
        { name: "1 tasse couscous de mil" },
        { name: "oeufs brouillés + légumes au choix" },
      ],
    },
  },
  // ===================== SEMAINE 3 =====================
  {
    day: 15, weekDay: "Lundi", week: 3,
    meals: {
      breakfast: [
        { name: "2 tranches pain + oeuf au plat + laitue" },
        { name: "1 tasse lait écrémé + 1 pomme" },
      ],
      lunch: [
        { name: "Ceebu jen allégé: 1 tasse riz" },
        { name: "légumes (carottes + chou + aubergine + 2cc huile)" },
        { name: "50g poisson airfryer" },
      ],
      snack: [
        { name: "1 sachet lait écrémé + 1 pomme" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "sauce tomate (1cc huile) + 50g poulet airfryer" },
        { name: "1 tasse chou" },
      ],
    },
  },
  {
    day: 16, weekDay: "Mardi", week: 3,
    meals: {
      breakfast: [
        { name: "3 pommes de terre bouillies" },
        { name: "oeuf au plat + 1 tasse lait écrémé" },
      ],
      lunch: [
        { name: "1 tasse fonio" },
        { name: "sauce légumes (carottes + oignon + poivron)" },
        { name: "50g poulet airfryer" },
      ],
      snack: [
        { name: "2 cookies banane" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "soupe kandia allégé (gombo + 50g poisson + 1cc huile)" },
      ],
    },
  },
  {
    day: 17, weekDay: "Mercredi", week: 3,
    meals: {
      breakfast: [
        { name: "Fondé: 1 tasse couscous mil + 1 tasse lait écrémé + 1cc miel" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "Mafé allégé: 1 tasse riz + sauce arachide légère" },
        { name: "50g poulet airfryer sans peau" },
      ],
      snack: [
        { name: "1 morceau gâteau banane" },
      ],
      dinner: [
        { name: "Yassa poisson allégé: 100g poisson airfryer" },
        { name: "oignons (1cc huile) + citron" },
        { name: "1 tasse couscous de mil" },
      ],
    },
  },
  {
    day: 18, weekDay: "Jeudi", week: 3,
    meals: {
      breakfast: [
        { name: "1 tasse avoine + 1 tasse lait écrémé" },
        { name: "1 banane + 50g poisson (airfryer)" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "sauce tomate (1cc huile) + légumes" },
        { name: "50g poulet bouilli sans peau" },
      ],
      snack: [
        { name: "1 verre lait caillé + 1cc miel" },
      ],
      dinner: [
        { name: "1 tasse fonio" },
        { name: "légumes (oignon + tomates + poivron)" },
        { name: "50g thon" },
      ],
    },
  },
  {
    day: 19, weekDay: "Vendredi", week: 3,
    meals: {
      breakfast: [
        { name: "150g patates douces + 50g poisson + légumes" },
        { name: "5ml huile + 1/3 tasse lait écrémé" },
      ],
      lunch: [
        { name: "1/2 tasse haricots niébé + 1cc huile" },
        { name: "25g gari + 50g poulet" },
      ],
      snack: [
        { name: "2 biscuits banane: 2 bananes + 1 oeuf (airfryer 180C 9 min)" },
      ],
      dinner: [
        { name: "2 pommes de terre + soupe légumes" },
        { name: "100g poulet airfryer sans peau" },
      ],
    },
  },
  {
    day: 20, weekDay: "Samedi", week: 3,
    meals: {
      breakfast: [
        { name: "1/2 tasse maïs doux + 150g blanc poulet" },
        { name: "1 banane + légumes + 2csp mayo allégée" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "légumes (poivron + oignon + tomates)" },
        { name: "omelette 2 oeufs (2cc huile)" },
      ],
      snack: [
        { name: "2 galettes: 2csp yaourt + 2/3csp farine blé (airfryer 180C 9 min)" },
      ],
      dinner: [
        { name: "Salade: chou + laitue + 1/2 tasse haricots" },
        { name: "1/2 tasse maïs doux + 1 oeuf dur" },
      ],
    },
  },
  {
    day: 21, weekDay: "Dimanche", week: 3,
    meals: {
      breakfast: [
        { name: "Smoothie 3 fruits (mangue + banane + citron)" },
        { name: "100g poulet sans peau airfryer" },
      ],
      lunch: [
        { name: "1 tasse couscous de mil" },
        { name: "sauce légumes (tomates + oignon + piment) + 1 oeuf" },
      ],
      snack: [
        { name: "1 yaourt nature + 1csp granola + 1 orange" },
      ],
      dinner: [
        { name: "1 tasse riz + soupe kandia allégé" },
        { name: "50g poisson airfryer" },
      ],
    },
  },
  // ===================== SEMAINE 4 =====================
  {
    day: 22, weekDay: "Lundi", week: 4,
    meals: {
      breakfast: [
        { name: "2 petites tasses patates douces" },
        { name: "50g poisson + 1 pomme" },
      ],
      lunch: [
        { name: "Ceebu jen allégé: 1 tasse riz + légumes" },
        { name: "50g poisson airfryer" },
      ],
      snack: [
        { name: "1 yaourt nature + 1 orange" },
      ],
      dinner: [
        { name: "1 tasse maïs doux + 2 tranches pain" },
        { name: "omelette 2 oeufs + 2cc huile" },
      ],
    },
  },
  {
    day: 23, weekDay: "Mardi", week: 4,
    meals: {
      breakfast: [
        { name: "1,5 tasse corn flakes + 1csp lait écrémé" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse fonio + sauce légumes" },
        { name: "50g thon airfryer" },
      ],
      snack: [
        { name: "1 yaourt nature + 1cc beurre cacahuètes + 1 orange" },
      ],
      dinner: [
        { name: "1/3 avocat + 2 tranches pain" },
        { name: "1/3 tasse haricots + 1 oeuf" },
      ],
    },
  },
  {
    day: 24, weekDay: "Mercredi", week: 4,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "omelette 2 oeufs (2cc huile) + 1 pomme" },
      ],
      lunch: [
        { name: "Yassa poulet allégé: 50g poulet airfryer" },
        { name: "oignons (1cc huile) + citron + 1 tasse riz" },
      ],
      snack: [
        { name: "1/2 Cerelac + 1 fruit" },
      ],
      dinner: [
        { name: "1 tasse avoine + 1 tasse lait écrémé" },
        { name: "1 banane + 50g poisson" },
      ],
    },
  },
  {
    day: 25, weekDay: "Jeudi", week: 4,
    meals: {
      breakfast: [
        { name: "2 tranches pain + 2 oeufs durs" },
        { name: "1/2 boite sardines + 1cc mayo + 1 pomme" },
      ],
      lunch: [
        { name: "1 tasse riz + légumes + 1 oeuf" },
        { name: "5ml huile + 1 fruit" },
      ],
      snack: [
        { name: "1 tasse pop corn (2cc huile)" },
      ],
      dinner: [
        { name: "3 pommes de terre" },
        { name: "oeufs brouillés aux légumes + 2cc huile" },
      ],
    },
  },
  {
    day: 26, weekDay: "Vendredi", week: 4,
    meals: {
      breakfast: [
        { name: "1,5 tasse corn flakes + 1/3 tasse lait écrémé" },
        { name: "50g poulet airfryer + 1 pomme" },
      ],
      lunch: [
        { name: "1 tasse riz + sauce tomate (2cc huile) + 1 oeuf" },
      ],
      snack: [
        { name: "1 yaourt nature + 6 pcs acajou ou 10 pcs arachide" },
      ],
      dinner: [
        { name: "1/3 avocat + 2 tranches pain + 2 oeufs durs" },
      ],
    },
  },
  {
    day: 27, weekDay: "Samedi", week: 4,
    meals: {
      breakfast: [
        { name: "1 mangue en dés + 1 yaourt nature + 10 pcs acajou" },
      ],
      lunch: [
        { name: "Mafé allégé: 1 tasse couscous" },
        { name: "sauce arachide légère + 50g poisson airfryer" },
      ],
      snack: [
        { name: "1 épi de maïs bouilli" },
      ],
      dinner: [
        { name: "1 tasse fonio" },
        { name: "légumes (tomates + oignon + piments)" },
        { name: "50g poulet airfryer + curry + thym" },
      ],
    },
  },
  {
    day: 28, weekDay: "Dimanche", week: 4,
    meals: {
      breakfast: [
        { name: "25g flocons d'avoine" },
        { name: "2 yaourts + 6 pcs acajou + 1 banane" },
      ],
      lunch: [
        { name: "1 tasse riz + sauce gombo" },
        { name: "50g poulet bouilli" },
      ],
      snack: [
        { name: "1 biscuit coaster + 1 yaourt nature" },
      ],
      dinner: [
        { name: "Salade: 1/3 avocat + laitue" },
        { name: "2csp mayo allégée + 2 tomates + 2 oeufs" },
      ],
    },
  },
];

export const getSenegalDayPlan = (dayIndex: number): DayPlan => {
  const idx = ((dayIndex - 1) % 28);
  return SENEGAL_MEAL_PLAN[idx];
};
