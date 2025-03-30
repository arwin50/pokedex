import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon, PokemonCardDetails } from "../../../../types/index";
import { PokemonCard } from "./PokemonCard";
import { FunctionBar } from "../../FunctionBar/FunctionBar";
import {
  filterIncludes,
  extractPokemonCardDetails,
  sortResults,
} from "../../../../utils/utils";
import LoadingOverlay from "../../LoadingOverlay";

export const PokemonCardList = () => {
  const [allPokemon, setAllPokemon] = useState<PokemonCardDetails[]>([]);
  const [displayedPokemon, setDisplayedPokemon] = useState<
    PokemonCardDetails[]
  >([]);
  const [searchResults, setSearchResults] = useState<
    PokemonCardDetails[] | null
  >(null);
  const [offset, setOffset] = useState(0);
  const [sortBy, setSortBy] = useState("ascendingId");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      try {
        const maxPokemon = 1010;
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
          params: { limit: maxPokemon, offset: 0 },
        });

        const pokemonListOverview: Pokemon[] = response.data.results;

        // Fetch details for all Pokémon
        const pokemonDetailRequests = pokemonListOverview.map((pokemon) =>
          axios.get(pokemon.url)
        );
        const detailedResponses = await Promise.all(pokemonDetailRequests);
        const allFetchedPokemon = extractPokemonCardDetails(detailedResponses);

        // Store in state
        setAllPokemon(allFetchedPokemon);

        // Apply initial sorting and pagination
        const sortedPokemon = sortResults(allFetchedPokemon, sortBy);
        setDisplayedPokemon(sortedPokemon.slice(0, 10));
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    if (allPokemon.length === 0) {
      fetchAllPokemon();
    } else {
      // Sort and paginate already fetched data
      const sortedPokemon = sortResults(allPokemon, sortBy);
      setDisplayedPokemon(sortedPokemon.slice(offset, offset + 10));
    }
  }, [sortBy, offset, allPokemon]);

  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchResults(null);
      return;
    }
    const results = await filterIncludes(query);
    setSearchResults(sortResults(results, sortBy));
  };

  const handleSort = (selectedSort: string) => {
    setSortBy(selectedSort);
    if (searchResults) {
      setSearchResults(sortResults([...searchResults], selectedSort));
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <FunctionBar onSearch={handleSearch} onSort={handleSort} />
      {loading && <LoadingOverlay />}
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-2 lg:gap-4 justify-items-center">
          {(searchResults ?? displayedPokemon).map((pokemon) => (
            <PokemonCard key={pokemon.id} {...pokemon} />
          ))}
        </div>
        {!searchResults && !loading && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setOffset((prevOffset) => prevOffset + 10)}
              className="px-8 py-2 rounded-lg cursor-pointer bg-[#ee4b4b] text-white hover:scale-105 transition"
            >
              Load More Pokémons
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
