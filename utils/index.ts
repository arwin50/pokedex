import { AxiosResponse } from "axios";
import { PokemonCardDetails, PokemonFullDetails } from "../types";

export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-cyan-300",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-700",
    ghost: "bg-indigo-800",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-400",
  };

  return typeColors[type.toLowerCase()] || "bg-gray-200";
};

export const extractPokemonCardDetails = (
  responses: AxiosResponse[]
): PokemonCardDetails[] => {
  return responses.map((res) => ({
    id: res.data.id,
    name: res.data.name,
    types: res.data.types as PokemonCardDetails["types"],
  }));
};

export const extractPokemonFullDetails = (
  res: AxiosResponse
): PokemonFullDetails => {
  return {
    id: res.data.id,
    name: res.data.name,
    height: res.data.height,
    weight: res.data.weight,
    types: res.data.types as PokemonCardDetails["types"],
    abilities: res.data.abilities.map((a: any) => a.ability.name),
    baseStats: {
      hp: res.data.stats[0].base_stat,
      attack: res.data.stats[1].base_stat,
      defense: res.data.stats[2].base_stat,
      specialAttack: res.data.stats[3].base_stat,
      specialDefense: res.data.stats[4].base_stat,
      speed: res.data.stats[5].base_stat,
    },
  };
};

export const sortResults = (list: PokemonCardDetails[], sortType: string) => {
  return [...list].sort((a, b) => {
    switch (sortType) {
      case "ascendingId":
        return a.id - b.id;
      case "descendingId":
        return b.id - a.id;
      case "alphabetical":
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      case "reverseAlphabetical":
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      default:
        return 0;
    }
  });
};
