const typeChart: Record<
  string,
  {
    strongAgainst: string[];
    weakAgainst: string[];
    resistantTo: string[];
    vulnerableTo: string[];
  }
> = {
  normal: {
    strongAgainst: [],
    weakAgainst: ["fighting", "rock", "steel"],
    resistantTo: ["ghost"],
    vulnerableTo: ["fighting"],
  },
  fighting: {
    strongAgainst: ["normal", "rock", "steel", "ice", "dark"],
    weakAgainst: ["flying", "poison", "psychic", "bug", "ghost", "fairy"],
    resistantTo: ["rock", "bug", "dark"],
    vulnerableTo: ["flying", "psychic", "fairy"],
  },
  flying: {
    strongAgainst: ["fighting", "bug", "grass"],
    weakAgainst: ["rock", "electric", "steel"],
    resistantTo: ["fighting", "bug", "grass", "ground"],
    vulnerableTo: ["rock", "electric", "ice"],
  },
  poison: {
    strongAgainst: ["grass", "fairy"],
    weakAgainst: ["ground", "rock", "poison", "ghost", "steel"],
    resistantTo: ["fighting", "poison", "grass", "fairy"],
    vulnerableTo: ["ground", "psychic"],
  },
  ground: {
    strongAgainst: ["poison", "rock", "steel", "fire", "electric"],
    weakAgainst: ["flying", "grass", "bug"],
    resistantTo: ["poison", "rock", "electric"],
    vulnerableTo: ["water", "grass", "ice"],
  },
  rock: {
    strongAgainst: ["flying", "bug", "fire", "ice"],
    weakAgainst: ["fighting", "ground", "steel"],
    resistantTo: ["normal", "flying", "poison", "fire"],
    vulnerableTo: ["fighting", "ground", "steel", "water", "grass"],
  },
  bug: {
    strongAgainst: ["grass", "psychic", "dark"],
    weakAgainst: [
      "fighting",
      "poison",
      "ghost",
      "steel",
      "fairy",
      "flying",
      "fire",
    ],
    resistantTo: ["fighting", "ground", "grass"],
    vulnerableTo: ["flying", "rock", "fire"],
  },
  ghost: {
    strongAgainst: ["ghost", "psychic"],
    weakAgainst: ["ghost", "dark", "normal"],
    resistantTo: ["poison", "bug", "normal", "fighting"],
    vulnerableTo: ["ghost", "dark"],
  },
  steel: {
    strongAgainst: ["rock", "ice", "fairy"],
    weakAgainst: ["steel", "fire", "water", "electric"],
    resistantTo: [
      "normal",
      "flying",
      "poison",
      "rock",
      "bug",
      "steel",
      "grass",
      "psychic",
      "ice",
      "dragon",
      "fairy",
    ],
    vulnerableTo: ["fighting", "ground", "fire"],
  },
  fire: {
    strongAgainst: ["bug", "steel", "grass", "ice"],
    weakAgainst: ["water", "rock", "dragon", "fire"],
    resistantTo: ["bug", "steel", "fire", "grass", "ice", "fairy"],
    vulnerableTo: ["ground", "rock", "water"],
  },
  water: {
    strongAgainst: ["ground", "rock", "fire", "electric"],
    weakAgainst: ["water", "grass", "dragon"],
    resistantTo: ["steel", "fire", "water", "ice"],
    vulnerableTo: ["grass", "electric"],
  },
  grass: {
    strongAgainst: ["ground", "rock", "water"],
    weakAgainst: [
      "flying",
      "poison",
      "bug",
      "steel",
      "grass",
      "dragon",
      "fire",
    ],
    resistantTo: ["ground", "water", "grass", "electric"],
    vulnerableTo: ["flying", "poison", "bug", "fire", "ice"],
  },
  electric: {
    strongAgainst: ["flying", "water"],
    weakAgainst: ["ground", "grass", "electric", "dragon"],
    resistantTo: ["flying", "steel", "electric"],
    vulnerableTo: ["ground"],
  },
  psychic: {
    strongAgainst: ["fighting", "poison"],
    weakAgainst: ["steel", "psychic", "dark"],
    resistantTo: ["fighting", "psychic"],
    vulnerableTo: ["bug", "ghost", "dark", "psychic"],
  },
  ice: {
    strongAgainst: ["flying", "ground", "grass", "dragon"],
    weakAgainst: ["steel", "fire", "water", "ice"],
    resistantTo: ["ice"],
    vulnerableTo: ["fighting", "rock", "steel", "fire"],
  },
  dragon: {
    strongAgainst: ["dragon"],
    weakAgainst: ["steel", "fairy"],
    resistantTo: ["fire", "water", "grass", "electric"],
    vulnerableTo: ["ice", "dragon", "fairy"],
  },
  dark: {
    strongAgainst: ["ghost", "psychic"],
    weakAgainst: ["fighting", "dark", "fairy"],
    resistantTo: ["ghost", "dark", "psychic"],
    vulnerableTo: ["fighting", "bug", "fairy"],
  },
  fairy: {
    strongAgainst: ["fairy", "dragon", "dark"],
    weakAgainst: ["poison", "steel", "fire"],
    resistantTo: ["fighting", "bug", "dark", "dragon"],
    vulnerableTo: ["poison", "steel"],
  },
};

export const getTypeWeakness = (
  primaryType: string,
  secondaryType?: string
): string[] => {
  primaryType = primaryType.toLowerCase();
  if (secondaryType) {
    secondaryType = secondaryType.toLowerCase();
  }

  if (
    !(primaryType in typeChart) ||
    (secondaryType && !(secondaryType in typeChart))
  ) {
    console.log("Invalid type(s) provided.");
    return [];
  }

  const weaknesses = new Set(typeChart[primaryType].vulnerableTo);
  const resistances = new Set(typeChart[primaryType].resistantTo);

  if (secondaryType) {
    typeChart[secondaryType].vulnerableTo.forEach((type) =>
      weaknesses.add(type)
    );
    typeChart[secondaryType].resistantTo.forEach((type) =>
      resistances.add(type)
    );
  }

  for (const weakness of [...weaknesses]) {
    if (weakness in typeChart) {
      const typeWeaknesses = new Set(typeChart[weakness].weakAgainst);
      console.log(weakness, typeWeaknesses);
      if (
        typeWeaknesses.has(primaryType) ||
        (secondaryType && typeWeaknesses.has(secondaryType))
      ) {
        weaknesses.delete(weakness);
      }
    }
  }

  const finalWeaknesses = Array.from(weaknesses).filter(
    (type) => !resistances.has(type)
  );

  return finalWeaknesses;
};
