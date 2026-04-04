/**
 * Plan Alimentaire Bénin & Côte d'Ivoire — 28 jours
 * Source: Plan Alimentaire 100% Africain - Benin & Cote d'Ivoire
 * Objectif: -5 kg en 1 mois · Programme de 30 jours · Alimentation 100% africaine et équilibrée
 */

import type { DayPlan } from "./mealPlanDatabase.js";

export const BENIN_CI_MEAL_PLAN: DayPlan[] = [
  // ===================== SEMAINE 1 =====================
  {
    day: 1, weekDay: "Lundi", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches de pain" },
        { name: "2 omelettes (2cc d'huile)" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "130g banane bouillie" },
        { name: "1 oeuf au plat" },
        { name: "1 blanc d'oeuf" },
        { name: "5ml huile" },
        { name: "legumes" },
        { name: "1 fruit" },
      ],
      snack: [
        { name: "1 tasse pop corn (2cc huile)" },
      ],
      dinner: [
        { name: "3 pieces igname" },
        { name: "oeufs brouilles aux legumes (oignon, gingembre, tomates, ail)" },
        { name: "2cc huile" },
      ],
    },
  },
  {
    day: 2, weekDay: "Mardi", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches de pain" },
        { name: "2 oeufs durs" },
        { name: "1/2 boite sardines" },
        { name: "1cc mayo" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "sauce tomate (2cc huile)" },
        { name: "1 oeuf" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "6 pcs acajou ou 10 pcs arachide" },
      ],
      dinner: [
        { name: "1/3 avocat" },
        { name: "2 tranches de pain" },
        { name: "2 oeufs durs" },
      ],
    },
  },
  {
    day: 3, weekDay: "Mercredi", week: 1,
    meals: {
      breakfast: [
        { name: "1,5 tasse corn flakes" },
        { name: "1/3 tasse lait ecreme" },
        { name: "cuisse poulet sans peau (airfryer)" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse pate noire/eba/foufou" },
        { name: "soupe gombo (2cc huile rouge)" },
        { name: "50g poisson (airfryer ou fume)" },
      ],
      snack: [
        { name: "1 epi de mais bouilli" },
      ],
      dinner: [
        { name: "1 banane plantain vapeur" },
        { name: "legumes sardine (tomates + oignon + piments)" },
        { name: "2cc huile + curry + thym" },
      ],
    },
  },
  {
    day: 4, weekDay: "Jeudi", week: 1,
    meals: {
      breakfast: [
        { name: "1 mangue en des" },
        { name: "1 yaourt nature 25g" },
        { name: "10 pcs acajou" },
      ],
      lunch: [
        { name: "1 baton de manioc" },
        { name: "sauce legumes" },
        { name: "50g poulet bouilli" },
      ],
      snack: [
        { name: "1 biscuit coaster" },
        { name: "1 yaourt nature" },
      ],
      dinner: [
        { name: "Salade : 1/3 avocat" },
        { name: "1 feuille laitue" },
        { name: "2csp mayo allegee" },
        { name: "2 tomates en des" },
        { name: "2 oeufs" },
      ],
    },
  },
  {
    day: 5, weekDay: "Vendredi", week: 1,
    meals: {
      breakfast: [
        { name: "25g flocons d'avoine" },
        { name: "2 yaourts 25g" },
        { name: "6 pcs acajou" },
        { name: "1 petite banane" },
      ],
      lunch: [
        { name: "3 pieces igname" },
        { name: "2 oeufs brouilles aux legumes" },
        { name: "2cc huile" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "2 cookies" },
      ],
      dinner: [
        { name: "1/2 concombre" },
        { name: "1 thon" },
        { name: "2 oeufs" },
        { name: "legumes (tomates, oignon)" },
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
        { name: "1 yaourt nature 25g" },
        { name: "1csp granola" },
      ],
      lunch: [
        { name: "Banane braisee" },
        { name: "legumes (oignon, tomates, piment)" },
        { name: "2cc huile" },
        { name: "1 oeuf" },
      ],
      snack: [
        { name: "Krajack 25g" },
        { name: "1 yaourt nature" },
      ],
      dinner: [
        { name: "1 banane frite (airfryer)" },
        { name: "legumes (carottes, oignon)" },
        { name: "50g blanc de poulet" },
      ],
    },
  },
  {
    day: 7, weekDay: "Dimanche", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches de pain" },
        { name: "1/2 boite sardines" },
        { name: "1csp mayo allegee" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "legumes africains (amanvive, tchayo, gboman, poivron)" },
        { name: "2cc huile rouge" },
        { name: "1 oeuf" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "1 mangue" },
      ],
      dinner: [
        { name: "1 tasse couscous" },
        { name: "legumes (oignon, tomates, poivron)" },
        { name: "1/2 sardine ou 1 pilon poulet airfryer sans peau" },
      ],
    },
  },

  // ===================== SEMAINE 2 =====================
  {
    day: 8, weekDay: "Lundi", week: 2,
    meals: {
      breakfast: [
        { name: "3 tranches de pain" },
        { name: "1 Lipton + 2csp lait ecreme + 1cc miel" },
        { name: "omelette 2 oeufs (1cc huile)" },
      ],
      lunch: [
        { name: "1 tasse haricot" },
        { name: "1cc huile de palme" },
        { name: "2 tranches pain" },
        { name: "50g viande bouillie" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "1 banane" },
      ],
      dinner: [
        { name: "1/2 tasse mais doux" },
        { name: "1/2 concombre" },
        { name: "2 carottes" },
        { name: "1cc mayo entiere" },
      ],
    },
  },
  {
    day: 9, weekDay: "Mardi", week: 2,
    meals: {
      breakfast: [
        { name: "3 tranches de papaye" },
        { name: "1/2 lait Peak" },
        { name: "1cc miel" },
        { name: "1,5 cup corn flakes" },
      ],
      lunch: [
        { name: "3/8 tasse Gari" },
        { name: "50g poulet bouilli" },
        { name: "legumes (carottes, oignon, poivron vert et rouge)" },
      ],
      snack: [
        { name: "1 tranche pain" },
        { name: "2 oeufs" },
        { name: "1csp mayo allegee" },
      ],
      dinner: [
        { name: "Soupe de aileron (poulet, tomates, oignon, ail, gingembre, poivron, epices)" },
      ],
    },
  },
  {
    day: 10, weekDay: "Mercredi", week: 2,
    meals: {
      breakfast: [
        { name: "2 oeufs frits (2cc huile)" },
        { name: "2 tranches de pain" },
        { name: "1/2 lait Peak" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "3 pieces patate douce" },
        { name: "2 oeufs brouilles aux legumes (tomates, oignon, poivron)" },
        { name: "2cc huile" },
      ],
      snack: [
        { name: "1 mangue" },
        { name: "10 pcs acajou" },
        { name: "1 yaourt nature" },
      ],
      dinner: [
        { name: "2 tranches pain" },
        { name: "2 omelettes aux legumes + 2cc huile" },
      ],
    },
  },
  {
    day: 11, weekDay: "Jeudi", week: 2,
    meals: {
      breakfast: [
        { name: "1 banane frite airfryer (2cc huile)" },
        { name: "1 tasse legumes (tomates + poivron + oignon)" },
      ],
      lunch: [
        { name: "Riz au ragout (min huile)" },
        { name: "salade de chou" },
        { name: "poulet grille" },
        { name: "1 pomme" },
      ],
      snack: [
        { name: "1csp granola" },
        { name: "1 pomme" },
        { name: "1 yaourt" },
        { name: "1 petite banane" },
      ],
      dinner: [
        { name: "1 pate d'akassa/pate noire" },
        { name: "crincrin" },
        { name: "3 morceaux Kpanman" },
        { name: "50g poisson fume" },
        { name: "1csp huile palme" },
      ],
    },
  },
  {
    day: 12, weekDay: "Vendredi", week: 2,
    meals: {
      breakfast: [
        { name: "1 yaourt nature 25g" },
        { name: "10 pcs arachide" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "Pate noire + crincrin (peu d'huile)" },
        { name: "50g viande de boeuf bouillie" },
      ],
      snack: [
        { name: "1 tasse granola + 2cc miel" },
        { name: "1 banane poele" },
        { name: "1 yaourt nature + pepites chocolat noir" },
      ],
      dinner: [
        { name: "Monyo (tomate + oignon + 50g poisson fume)" },
        { name: "1 plastique d'akassa" },
      ],
    },
  },
  {
    day: 13, weekDay: "Samedi", week: 2,
    meals: {
      breakfast: [
        { name: "130g plantain vapeur" },
        { name: "2 oeufs" },
        { name: "1 tasse legumes (carottes + chou)" },
        { name: "1 orange" },
        { name: "1cc huile" },
      ],
      lunch: [
        { name: "3/8 tasse Gari (Eba)" },
        { name: "1 queue de poisson" },
        { name: "1 tasse gombo" },
        { name: "1cc huile de palme" },
      ],
      snack: [
        { name: "1/2 yaourt nature" },
        { name: "1csp granola" },
        { name: "6 pcs acajou" },
      ],
      dinner: [
        { name: "1 tasse Eba" },
        { name: "legumes (oignon, tomates, piments)" },
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
        { name: "1 oeuf" },
        { name: "1/3 tasse lait ecreme" },
      ],
      lunch: [
        { name: "3 pommes de terre" },
        { name: "1 oeuf" },
        { name: "legumes (tomates, oignon, poivron)" },
      ],
      snack: [
        { name: "1 biscuit (moins de 100 cal)" },
      ],
      dinner: [
        { name: "1 tasse petit pois" },
        { name: "oeufs brouilles" },
        { name: "legumes au choix" },
      ],
    },
  },

  // ===================== SEMAINE 3 =====================
  {
    day: 15, weekDay: "Lundi", week: 3,
    meals: {
      breakfast: [
        { name: "2 tranches de pain" },
        { name: "oeuf au plat" },
        { name: "2 feuilles laitue" },
        { name: "1 tasse lait ecreme" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "Soupe de aileron (voir recette)" },
      ],
      snack: [
        { name: "1 sachet lait ecreme" },
        { name: "1 pomme" },
      ],
      dinner: [
        { name: "1 tasse riz au gras" },
        { name: "1 tasse legumes (chou + carotte)" },
        { name: "1 pilon poulet airfryer sans peau" },
      ],
    },
  },
  {
    day: 16, weekDay: "Mardi", week: 3,
    meals: {
      breakfast: [
        { name: "3 petites pommes de terre bouillies" },
        { name: "oeuf au plat" },
        { name: "1 tasse lait ecreme" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "1 tasse chou" },
        { name: "50g poulet (airfryer)" },
      ],
      snack: [
        { name: "2 Cookies a la banane (voir recette)" },
      ],
      dinner: [
        { name: "1 bol legumes : man (2cc huile)" },
        { name: "50g poisson fume" },
      ],
    },
  },
  {
    day: 17, weekDay: "Mercredi", week: 3,
    meals: {
      breakfast: [
        { name: "1 petite banane plantain bouillie" },
        { name: "1/2 boite thon" },
        { name: "1 tasse lait ecreme" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "legumes (carottes + chou + 1cc mayo)" },
        { name: "1/2 tasse riz" },
        { name: "1/2 tasse haricot" },
        { name: "1 pilon poulet airfryer sans peau" },
      ],
      snack: [
        { name: "1 morceau gateau a la banane (voir recette)" },
      ],
      dinner: [
        { name: "Tchoukouya de poulet (2cc huile)" },
        { name: "1 tasse Atieke" },
        { name: "1 bol legumes (tomates, oignon)" },
      ],
    },
  },
  {
    day: 18, weekDay: "Jeudi", week: 3,
    meals: {
      breakfast: [
        { name: "1 tasse avoine" },
        { name: "1 tasse lait ecreme" },
        { name: "1 petite banane" },
        { name: "1 morceau poisson (airfryer)" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "friture tomate (1cc huile)" },
        { name: "1 tasse legumes" },
        { name: "1 pilon poulet bouilli sans peau" },
      ],
      snack: [
        { name: "1 tasse lait" },
        { name: "1csp matcha" },
      ],
      dinner: [
        { name: "3 Ablo" },
        { name: "jus legumes (tomates + oignon + queue poisson airfryer ou 2cc huile)" },
      ],
    },
  },
  {
    day: 19, weekDay: "Vendredi", week: 3,
    meals: {
      breakfast: [
        { name: "150g patates douces" },
        { name: "56g poisson" },
        { name: "1 tasse legumes melanges" },
        { name: "5ml huile" },
        { name: "1/3 tasse lait ecreme" },
      ],
      lunch: [
        { name: "1/2 tasse haricot" },
        { name: "1cc huile arachide" },
        { name: "25g Gari" },
        { name: "50g viande" },
      ],
      snack: [
        { name: "2 biscuits : 2 bananes + 1csp beurre de cacahuetes + 2 oeufs (airfryer 180°C / 9 min)" },
      ],
      dinner: [
        { name: "2 petites pommes de terre ou 100g banane plantain" },
        { name: "soupe au poivre" },
        { name: "100g crevettes cuites" },
      ],
    },
  },
  {
    day: 20, weekDay: "Samedi", week: 3,
    meals: {
      breakfast: [
        { name: "1/2 tasse mais doux" },
        { name: "150g blanc poulet" },
        { name: "1 banane" },
        { name: "legumes (chou, carottes, laitue)" },
        { name: "2csp mayo allegee" },
      ],
      lunch: [
        { name: "1 tasse Indomie" },
        { name: "legumes (poivron rouge + vert + oignon)" },
        { name: "omelette 2 oeufs (2cc huile)" },
      ],
      snack: [
        { name: "2 galettes : 2csp yaourt + 2/3csp farine de ble (airfryer 180°C / 9 min)" },
      ],
      dinner: [
        { name: "Salade (chou + laitue + 1/2 boite haricots + 1/2 tasse mais doux + 1 fruit en des + 1 oeuf dur)" },
      ],
    },
  },
  {
    day: 21, weekDay: "Dimanche", week: 3,
    meals: {
      breakfast: [
        { name: "Smoothie 4 fruits ou salade de fruits" },
        { name: "100g poulet sans peau (airfryer)" },
      ],
      lunch: [
        { name: "1 tasse pates alimentaires" },
        { name: "legumes (tomates + piment + oignon + poivron)" },
        { name: "1 oeuf" },
      ],
      snack: [
        { name: "1 yaourt nature 25g" },
        { name: "1csp granola" },
        { name: "1csp myrtille" },
        { name: "3 fraises" },
      ],
      dinner: [
        { name: "1 petit roti plantain" },
        { name: "escargots sauce (poivre + legumes)" },
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
        { name: "1 tasse riz villageois (2cc huile)" },
        { name: "legumes (chou + carottes)" },
        { name: "1 queue poisson (airfryer)" },
      ],
      snack: [
        { name: "1 yaourt nature 25g" },
        { name: "3 fraises" },
        { name: "1csp myrtille" },
      ],
      dinner: [
        { name: "2 tasses pasteque" },
        { name: "2 tranches pain" },
        { name: "omelette 2 oeufs aux legumes + 2cc huile" },
      ],
    },
  },
  {
    day: 23, weekDay: "Mardi", week: 4,
    meals: {
      breakfast: [
        { name: "1,5 tasse corn flakes" },
        { name: "1csp lait ecreme" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse Atieke" },
        { name: "legumes (poivron + tomates + oignon + 1cc huile)" },
        { name: "1 morceau thon" },
      ],
      snack: [
        { name: "1 yaourt nature 25g" },
        { name: "1cc beurre de cacahuetes" },
        { name: "1csp myrtille" },
        { name: "1csp granola" },
      ],
      dinner: [
        { name: "2/3 tasse yaourt allege" },
        { name: "1 orange" },
        { name: "2 tranches pain" },
        { name: "1/3 avocat" },
        { name: "1 oeuf" },
      ],
    },
  },
  {
    day: 24, weekDay: "Mercredi", week: 4,
    meals: {
      breakfast: [
        { name: "2 tranches de pain" },
        { name: "2 omelettes (2cc d'huile)" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "Alloco de banane (airfryer)" },
        { name: "2 oeufs brouilles aux legumes (tomates, oignon)" },
      ],
      snack: [
        { name: "1/2 Cerelac" },
        { name: "1 fruit" },
      ],
      dinner: [
        { name: "1 tasse avoine crue" },
        { name: "1 tasse lait ecreme" },
        { name: "1 petite banane" },
        { name: "1 morceau poisson moyen" },
      ],
    },
  },
  {
    day: 25, weekDay: "Jeudi", week: 4,
    meals: {
      breakfast: [
        { name: "2 tranches de pain" },
        { name: "2 oeufs durs" },
        { name: "1/2 boite sardines" },
        { name: "1cc mayo" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "130g banane bouillie" },
        { name: "1 oeuf au plat" },
        { name: "1 blanc d'oeuf" },
        { name: "5ml huile" },
        { name: "legumes" },
        { name: "1 fruit" },
      ],
      snack: [
        { name: "1 tasse pop corn (2cc huile)" },
      ],
      dinner: [
        { name: "3 pieces igname" },
        { name: "oeufs brouilles aux legumes (oignon, gingembre, tomates, ail)" },
        { name: "2cc huile" },
      ],
    },
  },
  {
    day: 26, weekDay: "Vendredi", week: 4,
    meals: {
      breakfast: [
        { name: "1,5 tasse corn flakes" },
        { name: "1/3 tasse lait ecreme" },
        { name: "cuisse poulet sans peau (airfryer)" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "sauce tomate (2cc huile)" },
        { name: "1 oeuf" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "6 pcs acajou ou 10 pcs arachide" },
      ],
      dinner: [
        { name: "1/3 avocat" },
        { name: "2 tranches de pain" },
        { name: "2 oeufs durs" },
      ],
    },
  },
  {
    day: 27, weekDay: "Samedi", week: 4,
    meals: {
      breakfast: [
        { name: "1 mangue en des" },
        { name: "1 yaourt nature 25g" },
        { name: "10 pcs acajou" },
      ],
      lunch: [
        { name: "1 tasse pate noire/eba/foufou" },
        { name: "soupe gombo (2cc huile rouge)" },
        { name: "50g poisson (airfryer ou fume)" },
      ],
      snack: [
        { name: "1 epi de mais bouilli" },
      ],
      dinner: [
        { name: "1 banane plantain vapeur" },
        { name: "legumes sardine (tomates + oignon + piments)" },
        { name: "2cc huile + curry + thym" },
      ],
    },
  },
  {
    day: 28, weekDay: "Dimanche", week: 4,
    meals: {
      breakfast: [
        { name: "25g flocons d'avoine" },
        { name: "2 yaourts 25g" },
        { name: "6 pcs acajou" },
        { name: "1 petite banane" },
      ],
      lunch: [
        { name: "1 baton de manioc" },
        { name: "sauce legumes" },
        { name: "50g poulet bouilli" },
      ],
      snack: [
        { name: "1 biscuit coaster" },
        { name: "1 yaourt nature" },
      ],
      dinner: [
        { name: "Salade : 1/3 avocat" },
        { name: "1 feuille laitue" },
        { name: "2csp mayo allegee" },
        { name: "2 tomates en des" },
        { name: "2 oeufs" },
      ],
    },
  },
];

export const getBeninCIDayPlan = (dayIndex: number): DayPlan => {
  const idx = ((dayIndex - 1) % 28);
  return BENIN_CI_MEAL_PLAN[idx];
};
