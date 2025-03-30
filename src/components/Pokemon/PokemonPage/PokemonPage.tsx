import { useEffect, useState } from "react";
import axios from "axios";
import { PokemonFullDetails } from "../../../../types";
import { extractPokemonFullDetails } from "../../../../utils";
import { getTypeWeakness } from "../../../../utils/weakness";
import { PokemonTypeBadge } from "../PokemonTypeBadge";
import NotFound from "../../../NotFound";
import LoadingPage from "../../LoadingPage";
import { Link, useParams } from "react-router";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

export const PokemonPage = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState<PokemonFullDetails | null>();
  const [weaknesses, setWeaknesses] = useState<string[] | null>();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formattedId = String(id).padStart(3, "0");
  const pokemonImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        // checking if the id is greater than 1010, since 1010 is the limit.
        if (response.data.id > 1010) {
          setIsError(true);
          console.warn(`Pokemon with ID ${response.data.id} is out of range.`);
          setErrorMessage(
            `Pokemon with ID ${response.data.id} is out of range.`
          );
          return;
        }

        // maps the necessary data of a pokemon to be displayed
        const pokemonDetails = extractPokemonFullDetails(response);
        setPokemon(pokemonDetails);

        const typeNames = pokemonDetails.types.map((t) => t.type.name);

        // weaknesses in the function getTypeWeakness(arg1,arg2) are computed follows:
        // weaknesses of each type are combined, so are the types that the pokemon has resistance to.
        // next we remove the types present both in the weakness and resistance set.
        // we then check each weakness type if it is weak against any of the particular pokemon's types.
        // if it is weak, then we remove it.
        const computedWeaknesses = getTypeWeakness(typeNames[0], typeNames[1]);
        setWeaknesses(computedWeaknesses);
      } catch (error) {
        setIsError(true);
        console.error(`Pokemon "${id}" not found.`, error); //if user enters an invalid id such as an alphanumeric id
        setErrorMessage(`Pokemon "${id}" not found.`);
      }
    };

    fetchPokemon();
  }, [id]);

  if (pokemon) {
    return (
      <main className="w-full min-h-screen flex flex-col items-center font-openSans bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <Link to={"/"}>
          <img
            src="/pokemon.png"
            alt="logo"
            className="w-32 mb-8 my-6 hover:scale-110 hover:animate-pulse"
          />
        </Link>

        <div className="w-full flex flex-col md:flex-row items-center justify-between max-w-5xl px-4">
          {id && (
            <Link
              to={`/pokemon/${Number(id) === 1 ? 1010 : Number(id) - 1}`}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-100 transition md:relative absolute left-2 top-1/2 -translate-y-1/2 md:mr-6"
            >
              <CgChevronLeft size={40} />
            </Link>
          )}

          <div className="flex flex-col md:flex-row gap-x-4 w-full max-w-4xl">
            <div className="flex flex-col gap-y-4 flex-1 items-center">
              <div className="bg-gray-200 rounded-full p-8">
                <img
                  src={pokemonImageUrl}
                  alt={`${pokemon?.name}'s image`}
                  className="w-64 h-64 object-contain"
                />
              </div>
              <div className="flex items-center gap-1">
                <h1 className="text-3xl font-bold capitalize">
                  {pokemon?.name}
                </h1>
                <sub className="text-gray-500 text-sm italic">
                  #{formattedId}
                </sub>
              </div>
              <div className="flex gap-1 w-full justify-center">
                {pokemon?.types.map((typeObj) => (
                  <PokemonTypeBadge
                    key={typeObj.type.name}
                    type={typeObj.type.name}
                  />
                ))}
              </div>
              <div className="bg-white border border-gray-300 p-4 w-full rounded-xl">
                <h2 className="text-2xl font-semibold mb-3">
                  Physical Attributes
                </h2>
                <div className="flex justify-evenly">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-700">Height</span>
                    <span className="text-lg font-semibold">
                      {pokemon?.height / 10} m
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-700">Weight</span>
                    <span className="text-lg font-semibold">
                      {pokemon?.weight / 10} kg
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4 flex-1 ">
              <div className="bg-white border p-4 w-full border-gray-300 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon?.abilities.map((ability) => (
                    <span
                      key={pokemon.name + ability}
                      className="px-2 py-1 border border-gray-300 rounded-full font-semibold capitalize text-xs"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white border p-4 w-full border-gray-300 rounded-xl">
                <h2 className="text-2xl font-semibold mb-3">Base Stats</h2>
                <ul>
                  {Object.entries(pokemon?.baseStats ?? {}).map(
                    ([stat, value]) => (
                      <>
                        <li key={stat} className="flex justify-between ">
                          <span className="capitalize font-semibold text-sm">
                            {stat.replace(/([A-Z])/g, " $1")}
                          </span>
                          <span>{value}</span>
                        </li>
                        <div className="bg-gray-300 w-full rounded-xl h-[10px] mb-2">
                          <div
                            className="bg-black h-full rounded-xl"
                            style={{ width: `${(value / 255) * 100}%` }}
                          ></div>
                        </div>
                      </>
                    )
                  )}
                </ul>
              </div>
              <div className="bg-white border p-4 w-full border-gray-300 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4">Weaknesses</h2>
                <div className="flex flex-wrap gap-2">
                  {weaknesses?.map((weakness) => (
                    <PokemonTypeBadge
                      key={pokemon.name + weakness}
                      type={weakness}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Next Button */}
          {id && (
            <Link
              to={`/pokemon/${Number(id) === 1010 ? 1 : Number(id) + 1}`}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-100 transition md:relative absolute right-2 top-1/2 -translate-y-1/2 md:ml-6"
            >
              <CgChevronRight size={40} />
            </Link>
          )}
        </div>
      </main>
    );
  } else if (!pokemon && !isError) {
    return <LoadingPage />;
  } else {
    return <NotFound message={errorMessage} />;
  }
};
