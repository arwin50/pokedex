"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import type { Pokemon, PokemonCardDetails } from "../../../../types/index";
import { PokemonCard } from "./PokemonCard";
import { FunctionBar } from "../../FunctionBar/FunctionBar";
import {
  extractPokemonCardDetails,
  sortResults,
} from "../../../../utils/utils";
import LoadingOverlay from "../../LoadingOverlay";

export const PokemonCardList = () => {
  const [allPokemon, setAllPokemon] = useState<PokemonCardDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("ascendingId");
  const [displayCount, setDisplayCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const POKEMON_PER_PAGE = 10;
  const MAX_POKEMON = 1010;

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setInitialLoading(true);
      try {
        // Fetch Pokémon in batches to avoid overwhelming the API
        const batchSize = 100;
        let allFetchedPokemon: PokemonCardDetails[] = [];

        for (let offset = 0; offset < MAX_POKEMON; offset += batchSize) {
          const limit = Math.min(batchSize, MAX_POKEMON - offset);

          // Fetch batch of Pokémon
          const response = await axios.get(
            "https://pokeapi.co/api/v2/pokemon",
            {
              params: { limit, offset },
            }
          );

          const pokemonBatch: Pokemon[] = response.data.results;

          const detailRequests = pokemonBatch.map((pokemon) =>
            axios.get(pokemon.url)
          );

          const detailedResponses = await Promise.all(detailRequests);
          const detailedPokemon = extractPokemonCardDetails(detailedResponses);

          allFetchedPokemon = [...allFetchedPokemon, ...detailedPokemon];
        }

        // Sort the initial data
        const sortedPokemon = sortResults(allFetchedPokemon, sortBy);
        setAllPokemon(sortedPokemon);
      } catch (error) {
        console.error("Error fetching all Pokémon:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  useEffect(() => {
    if (allPokemon.length > 0) {
      setAllPokemon(sortResults([...allPokemon], sortBy));
      setDisplayCount(POKEMON_PER_PAGE);
    }
  }, [sortBy]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    setDisplayCount(POKEMON_PER_PAGE);
    setLoading(false);
  };

  // Handle sort
  const handleSort = (selectedSort: string) => {
    setSortBy(selectedSort);
  };

  const filteredAndSortedPokemon = useMemo(() => {
    if (!searchQuery) {
      return allPokemon;
    }

    return allPokemon.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pokemon.id.toString().includes(searchQuery)
    );
  }, [allPokemon, searchQuery]);

  const pokemonToDisplay = useMemo(() => {
    return filteredAndSortedPokemon.slice(0, displayCount);
  }, [filteredAndSortedPokemon, displayCount]);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + POKEMON_PER_PAGE);
  };

  const hasMore = displayCount < filteredAndSortedPokemon.length;

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <FunctionBar onSearch={handleSearch} onSort={handleSort} />

      {initialLoading ? (
        <LoadingOverlay />
      ) : (
        <div>
          {loading && <LoadingOverlay />}

          {filteredAndSortedPokemon.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg">No Pokémon found matching your search.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-2 lg:gap-4 justify-items-center">
                {pokemonToDisplay.map((pokemon) => (
                  <PokemonCard key={pokemon.id} {...pokemon} />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-2 rounded-lg cursor-pointer bg-[#ee4b4b] text-white hover:scale-105 transition"
                  >
                    Load More Pokémons
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
