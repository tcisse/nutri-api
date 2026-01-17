import type { Food } from "../types/index.js";

/**
 * ANNEXE A : Base de données des aliments
 * Source: Guide PDF nutritionnel
 * Aliments typiques d'Afrique de l'Ouest et généraux
 */
export const FOOD_DATABASE: Food[] = [
  // === FÉCULENTS (starch) ===
  {
    id: "f1",
    name: "Riz cuit (Blanc ou Brun)",
    group: "starch",
    portion: "1/3 tasse",
    tags: ["general", "senegal", "mali"],
  },
  {
    id: "f2",
    name: "Igname (Bouillie)",
    group: "starch",
    portion: "75g (1/2 tasse)",
    tags: ["benin", "togo", "nigeria"],
  },
  {
    id: "f3",
    name: "Banane Plantain (Non frite)",
    group: "starch",
    portion: "65g (1 petite)",
    tags: ["cote_ivoire", "cameroun", "benin"],
  },
  {
    id: "f4",
    name: "Pain Blanc/Complet",
    group: "starch",
    portion: "1 tranche",
    tags: ["general"],
  },
  {
    id: "f5",
    name: "Maïs (Épis ou Grains)",
    group: "starch",
    portion: "1/2 tasse",
    tags: ["general", "benin"],
  },
  {
    id: "f6",
    name: "Garri (Eba)",
    group: "starch",
    portion: "17g (avant eau)",
    tags: ["nigeria", "benin", "togo"],
  },
  {
    id: "f7",
    name: "Attiéké",
    group: "starch",
    portion: "1/2 tasse",
    tags: ["cote_ivoire"],
  },

  // === PROTÉINES (protein) ===
  {
    id: "p1",
    name: "Poulet (Sans peau)",
    group: "protein",
    portion: "28g",
    tags: ["general"],
  },
  {
    id: "p2",
    name: "Poisson (Tilapia/Chinchard)",
    group: "protein",
    portion: "28g (Taille boîte allumettes)",
    tags: ["general", "senegal", "benin"],
  },
  {
    id: "p3",
    name: "Oeuf entier",
    group: "protein",
    portion: "1 oeuf",
    tags: ["general"],
  },
  {
    id: "p4",
    name: "Viande de Boeuf (Maigre)",
    group: "protein",
    portion: "28g",
    tags: ["general", "mali"],
  },

  // === LÉGUMES (veg) ===
  {
    id: "v1",
    name: "Gombo (Sauce)",
    group: "veg",
    portion: "1/2 tasse",
    tags: ["general", "togo", "benin"],
  },
  {
    id: "v2",
    name: "Épinards / Gboma",
    group: "veg",
    portion: "1/2 tasse",
    tags: ["benin", "togo"],
  },
  {
    id: "v3",
    name: "Aubergine / Ndolé",
    group: "veg",
    portion: "1/2 tasse",
    tags: ["cameroun", "general"],
  },
  {
    id: "v4",
    name: "Haricots verts / Carottes",
    group: "veg",
    portion: "1/2 tasse",
    tags: ["general"],
  },

  // === FRUITS (fruit) ===
  {
    id: "fr1",
    name: "Orange",
    group: "fruit",
    portion: "1 petite",
    tags: ["general"],
  },
  {
    id: "fr2",
    name: "Papaye",
    group: "fruit",
    portion: "1 tasse cubes",
    tags: ["general"],
  },
  {
    id: "fr3",
    name: "Mangue",
    group: "fruit",
    portion: "1/2 petite",
    tags: ["general"],
  },

  // === MATIÈRES GRASSES (fat) ===
  {
    id: "fa1",
    name: "Huile (Arachide/Palme/Olive)",
    group: "fat",
    portion: "1 c.à.c",
    tags: ["general"],
  },
  {
    id: "fa2",
    name: "Avocat",
    group: "fat",
    portion: "1/8 avocat",
    tags: ["general"],
  },

  // === PRODUITS LAITIERS (milk) ===
  {
    id: "l1",
    name: "Lait en poudre (Écrémé)",
    group: "milk",
    portion: "2 c.à.s",
    tags: ["general"],
  },
  {
    id: "l2",
    name: "Yaourt nature",
    group: "milk",
    portion: "2/3 tasse",
    tags: ["general"],
  },
];

/**
 * Récupère les aliments par groupe alimentaire
 */
export const getFoodsByGroup = (group: string): Food[] => {
  return FOOD_DATABASE.filter((food) => food.group === group);
};

/**
 * Récupère les aliments par tag/région
 */
export const getFoodsByTag = (tag: string): Food[] => {
  return FOOD_DATABASE.filter((food) => food.tags.includes(tag));
};

/**
 * Récupère les aliments par groupe et tag
 */
export const getFoodsByGroupAndTag = (group: string, tag: string): Food[] => {
  return FOOD_DATABASE.filter(
    (food) => food.group === group && (food.tags.includes(tag) || food.tags.includes("general"))
  );
};

/**
 * Sélectionne un aliment aléatoire dans un groupe
 * @param group - Le groupe alimentaire
 * @param preferredTag - Tag/région préférée
 * @param excludeIds - IDs d'aliments à exclure (pour éviter les répétitions)
 */
export const getRandomFoodByGroup = (
  group: string, 
  preferredTag?: string,
  excludeIds: string[] = []
): Food | null => {
  let foods = getFoodsByGroup(group);

  // Filtrer par tag si spécifié
  if (preferredTag) {
    const taggedFoods = foods.filter(
      (food) => food.tags.includes(preferredTag) || food.tags.includes("general")
    );
    if (taggedFoods.length > 0) {
      foods = taggedFoods;
    }
  }

  // Exclure les aliments déjà utilisés
  if (excludeIds.length > 0) {
    const filteredFoods = foods.filter((food) => !excludeIds.includes(food.id));
    // Si on a encore des options, utiliser la liste filtrée
    // Sinon, garder la liste originale (mieux vaut répéter que ne rien avoir)
    if (filteredFoods.length > 0) {
      foods = filteredFoods;
    }
  }

  if (foods.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * foods.length);
  return foods[randomIndex];
};

/**
 * Récupère tous les tags/régions disponibles
 */
export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();
  FOOD_DATABASE.forEach((food) => {
    food.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};
