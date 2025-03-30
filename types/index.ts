export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonCardDetails {
  id: number;
  name: string;
  types: PokemonType[];
}

export interface PokemonFullDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: string[];
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}
