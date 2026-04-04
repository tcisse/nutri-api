/**
 * Plan Alimentaire Burkina Faso — 28 jours
 * Source: Plan Alimentaire 100% Africain - Burkina Faso
 * Objectif: -5 kg en 1 mois · Programme de 30 jours · Alimentation 100% africaine et équilibrée
 */

import type { DayPlan } from "./mealPlanDatabase.js";

export const BURKINA_MEAL_PLAN: DayPlan[] = [
  // ===================== SEMAINE 1 =====================
  {
    day: 1, weekDay: "Lundi", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "2 oeufs durs" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 boule de Tô (200g)" },
        { name: "sauce arachide legere (2cc huile)" },
        { name: "50g poulet bouilli sans peau" },
      ],
      snack: [
        { name: "1 verre lait caille" },
        { name: "1 banane" },
      ],
      dinner: [
        { name: "1 tasse haricots niebe bouilli" },
        { name: "legumes (tomates + oignon + 1cc huile de palme)" },
        { name: "1 oeuf" },
      ],
    },
  },
  {
    day: 2, weekDay: "Mardi", week: 1,
    meals: {
      breakfast: [
        { name: "1,5 tasse corn flakes" },
        { name: "1/3 tasse lait ecreme" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse riz gras (min huile)" },
        { name: "legumes (chou + carottes)" },
        { name: "50g poisson braise" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "6 pcs acajou ou 10 pcs arachide" },
      ],
      dinner: [
        { name: "1 boule Tô" },
        { name: "sauce feuilles baobab (1cc huile)" },
        { name: "50g viande bouillie" },
      ],
    },
  },
  {
    day: 3, weekDay: "Mercredi", week: 1,
    meals: {
      breakfast: [
        { name: "1 tasse bouillie de mil (ben-saalga)" },
        { name: "1cc miel" },
        { name: "1 petite banane" },
      ],
      lunch: [
        { name: "1 tasse couscous de mil" },
        { name: "sauce legumes (tomates + oignon + poivron)" },
        { name: "50g poulet grille (airfryer)" },
      ],
      snack: [
        { name: "1 epi de mais bouilli" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "sauce gombo (1cc huile de palme)" },
        { name: "50g poisson fume" },
      ],
    },
  },
  {
    day: 4, weekDay: "Jeudi", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "omelette 2 oeufs (1cc huile)" },
        { name: "1 tomate" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 boule Tô" },
        { name: "sauce legumes verts (feuilles de moringa 1cc huile)" },
        { name: "50g thon" },
      ],
      snack: [
        { name: "1 verre lait caille" },
        { name: "1 mangue" },
      ],
      dinner: [
        { name: "Salade : 1/3 avocat" },
        { name: "2 oeufs durs" },
        { name: "2 tomates" },
        { name: "1 feuille laitue" },
        { name: "2csp mayo allegee" },
      ],
    },
  },
  {
    day: 5, weekDay: "Vendredi", week: 1,
    meals: {
      breakfast: [
        { name: "25g flocons d'avoine" },
        { name: "1 tasse lait ecreme" },
        { name: "6 pcs acajou" },
        { name: "1 banane" },
      ],
      lunch: [
        { name: "1 tasse haricots niebe" },
        { name: "2 tranches pain" },
        { name: "50g poulet bouilli sans peau" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "2 cookies banane" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "friture tomate (1cc huile)" },
        { name: "1 oeuf" },
        { name: "1 tasse legumes" },
      ],
    },
  },
  {
    day: 6, weekDay: "Samedi", week: 1,
    meals: {
      breakfast: [
        { name: "1 mangue en des" },
        { name: "1 yaourt nature" },
        { name: "1csp granola" },
      ],
      lunch: [
        { name: "poisson braise entier (medium)" },
        { name: "1 tasse couscous de mil" },
        { name: "1 tasse legumes (chou + carottes + 1cc huile)" },
      ],
      snack: [
        { name: "Dêguê : 3csp couscous mil + 1 verre lait caille + 1cc miel" },
      ],
      dinner: [
        { name: "130g igname bouillie" },
        { name: "2 oeufs brouilles aux legumes (oignon + tomates + 2cc huile)" },
      ],
    },
  },
  {
    day: 7, weekDay: "Dimanche", week: 1,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "1/2 boite sardines" },
        { name: "1csp mayo allegee" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse riz gras (min huile)" },
        { name: "sauce legumes africains (feuilles moringa + poivron)" },
        { name: "1 oeuf" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "1 orange" },
      ],
      dinner: [
        { name: "1 tasse couscous de mil" },
        { name: "legumes (oignon + tomates + poivron)" },
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
        { name: "1 tasse lait ecreme" },
      ],
      lunch: [
        { name: "1 tasse haricots niebe" },
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
        { name: "1,5 tasse bouillie de mil" },
        { name: "1cc miel" },
        { name: "1/2 lait Peak" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 boule Tô" },
        { name: "sauce arachide legere (1cc huile)" },
        { name: "50g poisson fume" },
      ],
      snack: [
        { name: "1 tranche pain" },
        { name: "2 oeufs" },
        { name: "1csp mayo allegee" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "sauce gombo (1cc huile palme)" },
        { name: "50g poulet bouilli sans peau" },
      ],
    },
  },
  {
    day: 10, weekDay: "Mercredi", week: 2,
    meals: {
      breakfast: [
        { name: "2 oeufs frits (2cc huile)" },
        { name: "2 tranches pain" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse couscous de mil" },
        { name: "sauce legumes (carottes + oignon + poivron)" },
        { name: "50g viande bouillie" },
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
        { name: "1 petite banane poele (1cc huile)" },
        { name: "1 tasse legumes (tomates + oignon)" },
      ],
      lunch: [
        { name: "1 tasse riz gras (min huile)" },
        { name: "salade chou" },
        { name: "50g poulet grille" },
        { name: "1 pomme" },
      ],
      snack: [
        { name: "1csp granola" },
        { name: "1 pomme" },
        { name: "1 yaourt" },
        { name: "1 petite banane" },
      ],
      dinner: [
        { name: "1 boule Tô" },
        { name: "sauce feuilles oseille (2cc huile)" },
        { name: "50g poisson fume" },
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
        { name: "1 boule Tô" },
        { name: "sauce baobab (1cc huile)" },
        { name: "50g viande bouillie" },
      ],
      snack: [
        { name: "1 tasse granola" },
        { name: "2cc miel" },
        { name: "1 banane" },
        { name: "1 yaourt nature" },
      ],
      dinner: [
        { name: "1 tasse haricots niebe" },
        { name: "oignon + tomates" },
        { name: "50g poisson fume" },
        { name: "1cc huile palme" },
      ],
    },
  },
  {
    day: 13, weekDay: "Samedi", week: 2,
    meals: {
      breakfast: [
        { name: "130g igname vapeur" },
        { name: "2 oeufs" },
        { name: "1 tasse legumes (carottes + chou)" },
        { name: "1cc huile" },
      ],
      lunch: [
        { name: "3/8 tasse gari" },
        { name: "1 queue de poisson braise" },
        { name: "1 tasse gombo" },
        { name: "1cc huile de palme" },
      ],
      snack: [
        { name: "1/2 yaourt nature" },
        { name: "1csp granola" },
        { name: "6 pcs acajou" },
      ],
      dinner: [
        { name: "1 tasse riz" },
        { name: "legumes (oignon + tomates + piments)" },
        { name: "50g poulet airfryer sans peau" },
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
        { name: "2 oeufs" },
        { name: "legumes (tomates + oignon + poivron)" },
        { name: "2cc huile" },
      ],
      snack: [
        { name: "1 biscuit (moins de 100 cal)" },
      ],
      dinner: [
        { name: "1 tasse haricots niebe" },
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
        { name: "2 tranches pain" },
        { name: "oeuf au plat" },
        { name: "2 feuilles laitue" },
        { name: "1 tasse lait ecreme" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse riz gras (min huile)" },
        { name: "1 tasse legumes" },
        { name: "50g poulet airfryer sans peau" },
      ],
      snack: [
        { name: "1 sachet lait ecreme" },
        { name: "1 pomme" },
      ],
      dinner: [
        { name: "1 boule Tô" },
        { name: "sauce legumes (moringa + oignon + 2cc huile)" },
        { name: "50g poisson fume" },
      ],
    },
  },
  {
    day: 16, weekDay: "Mardi", week: 3,
    meals: {
      breakfast: [
        { name: "3 petites pommes de terre" },
        { name: "oeuf au plat" },
        { name: "1 tasse lait ecreme" },
      ],
      lunch: [
        { name: "1 tasse couscous de mil" },
        { name: "sauce legumes (oignons + poivron + carottes)" },
        { name: "50g poulet airfryer" },
      ],
      snack: [
        { name: "2 cookies banane (voir recette)" },
      ],
      dinner: [
        { name: "1 tasse haricots niebe" },
        { name: "crincrin (ou feuilles moringa)" },
        { name: "50g poisson fume" },
        { name: "1csp huile palme" },
      ],
    },
  },
  {
    day: 17, weekDay: "Mercredi", week: 3,
    meals: {
      breakfast: [
        { name: "1,5 tasse bouillie de mil" },
        { name: "1cc miel" },
        { name: "1 pomme" },
        { name: "1 tasse lait ecreme" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "1 tasse chou" },
        { name: "1/2 tasse haricots" },
        { name: "50g poulet airfryer sans peau" },
      ],
      snack: [
        { name: "1 morceau gateau banane (voir recette)" },
      ],
      dinner: [
        { name: "poisson braise (medium)" },
        { name: "1 tasse couscous de mil" },
        { name: "1 tasse legumes (tomates + oignon)" },
      ],
    },
  },
  {
    day: 18, weekDay: "Jeudi", week: 3,
    meals: {
      breakfast: [
        { name: "1 tasse avoine" },
        { name: "1 tasse lait ecreme" },
        { name: "1 banane" },
        { name: "50g poisson (airfryer)" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "sauce tomate (1cc huile)" },
        { name: "1 tasse legumes" },
        { name: "50g poulet bouilli sans peau" },
      ],
      snack: [
        { name: "1 verre lait caille" },
        { name: "1csp miel" },
      ],
      dinner: [
        { name: "130g igname bouillie" },
        { name: "sauce gombo (1cc huile palme)" },
        { name: "50g poisson fume" },
      ],
    },
  },
  {
    day: 19, weekDay: "Vendredi", week: 3,
    meals: {
      breakfast: [
        { name: "150g patates douces" },
        { name: "50g poisson" },
        { name: "1 tasse legumes" },
        { name: "5ml huile" },
        { name: "1/3 tasse lait ecreme" },
      ],
      lunch: [
        { name: "1/2 tasse haricots niebe" },
        { name: "1cc huile arachide" },
        { name: "25g gari" },
        { name: "50g poulet" },
      ],
      snack: [
        { name: "2 biscuits banane : 2 bananes + 1 oeuf (airfryer 180°C 9 min)" },
      ],
      dinner: [
        { name: "2 petites pommes de terre" },
        { name: "sauce legumes" },
        { name: "100g poulet airfryer sans peau" },
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
        { name: "legumes (chou + carottes)" },
        { name: "2csp mayo allegee" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "legumes (poivron + oignon)" },
        { name: "omelette 2 oeufs (2cc huile)" },
      ],
      snack: [
        { name: "2 galettes : 2csp yaourt + 2/3csp farine ble (airfryer 180°C 9 min)" },
      ],
      dinner: [
        { name: "Salade : chou + laitue" },
        { name: "1/2 tasse haricots" },
        { name: "1/2 tasse mais doux" },
        { name: "1 oeuf dur" },
      ],
    },
  },
  {
    day: 21, weekDay: "Dimanche", week: 3,
    meals: {
      breakfast: [
        { name: "Smoothie 3 fruits locaux (mangue + banane + orange)" },
        { name: "100g poulet sans peau airfryer" },
      ],
      lunch: [
        { name: "1 tasse couscous de mil" },
        { name: "sauce legumes (tomates + piment + oignon)" },
        { name: "1 oeuf" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "1csp granola" },
        { name: "1 orange" },
      ],
      dinner: [
        { name: "1 tasse haricots niebe" },
        { name: "sauce legumes" },
        { name: "50g poulet bouilli" },
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
        { name: "1 tasse riz gras (min huile)" },
        { name: "legumes (chou + carottes)" },
        { name: "50g poisson braise" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "1 orange" },
      ],
      dinner: [
        { name: "1 tasse mais doux" },
        { name: "2 tranches pain" },
        { name: "omelette 2 oeufs aux legumes + 2cc huile" },
      ],
    },
  },
  {
    day: 23, weekDay: "Mardi", week: 4,
    meals: {
      breakfast: [
        { name: "1,5 tasse bouillie de mil" },
        { name: "1cc miel" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 tasse couscous de mil" },
        { name: "sauce legumes" },
        { name: "50g thon (airfryer)" },
      ],
      snack: [
        { name: "1 yaourt nature" },
        { name: "1cc beurre cacahuetes" },
        { name: "1 orange" },
      ],
      dinner: [
        { name: "1/2 tasse haricots niebe" },
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
        { name: "2 tranches pain" },
        { name: "omelette 2 oeufs (2cc huile)" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "1 boule Tô" },
        { name: "sauce legumes verts (moringa + oignon + 2cc huile)" },
        { name: "50g poulet bouilli" },
      ],
      snack: [
        { name: "1/2 Cerelac" },
        { name: "1 fruit" },
      ],
      dinner: [
        { name: "1 tasse avoine" },
        { name: "1 tasse lait ecreme" },
        { name: "1 petite banane" },
        { name: "50g poisson moyen" },
      ],
    },
  },
  {
    day: 25, weekDay: "Jeudi", week: 4,
    meals: {
      breakfast: [
        { name: "2 tranches pain" },
        { name: "2 oeufs durs" },
        { name: "1/2 boite sardines" },
        { name: "1cc mayo" },
        { name: "1 pomme" },
      ],
      lunch: [
        { name: "130g igname bouillie" },
        { name: "1 oeuf au plat" },
        { name: "1 blanc oeuf" },
        { name: "5ml huile" },
        { name: "legumes" },
        { name: "1 fruit" },
      ],
      snack: [
        { name: "1 tasse pop corn (2cc huile)" },
      ],
      dinner: [
        { name: "3 pieces igname" },
        { name: "oeufs brouilles aux legumes (oignon + gingembre + tomates + ail)" },
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
        { name: "50g poulet airfryer" },
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
        { name: "2 tranches pain" },
        { name: "2 oeufs durs" },
      ],
    },
  },
  {
    day: 27, weekDay: "Samedi", week: 4,
    meals: {
      breakfast: [
        { name: "1 mangue en des" },
        { name: "1 yaourt nature" },
        { name: "10 pcs acajou" },
      ],
      lunch: [
        { name: "1 boule Tô" },
        { name: "sauce gombo (2cc huile rouge)" },
        { name: "50g poisson airfryer ou fume" },
      ],
      snack: [
        { name: "1 epi de mais bouilli" },
      ],
      dinner: [
        { name: "130g igname vapeur" },
        { name: "sauce sardine legumes (tomates + oignon + piments + 2cc huile + curry)" },
      ],
    },
  },
  {
    day: 28, weekDay: "Dimanche", week: 4,
    meals: {
      breakfast: [
        { name: "25g flocons d'avoine" },
        { name: "2 yaourts" },
        { name: "6 pcs acajou" },
        { name: "1 banane" },
      ],
      lunch: [
        { name: "1 tasse riz" },
        { name: "sauce legumes (carottes + oignon + poivron)" },
        { name: "50g poulet bouilli" },
      ],
      snack: [
        { name: "1 biscuit coaster" },
        { name: "1 yaourt nature" },
      ],
      dinner: [
        { name: "Salade : 1/3 avocat + laitue" },
        { name: "2csp mayo allegee" },
        { name: "2 tomates" },
        { name: "2 oeufs durs" },
      ],
    },
  },
];

export const getBurkinaDayPlan = (dayIndex: number): DayPlan => {
  const idx = ((dayIndex - 1) % 28);
  return BURKINA_MEAL_PLAN[idx];
};
