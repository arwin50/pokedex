import { Link } from "react-router";
import { PokemonCardDetails } from "../../../../types";
import { PokemonTypeBadge } from "../PokemonTypeBadge";

export const PokemonCard: React.FC<PokemonCardDetails> = ({
  id,
  name,
  types,
}) => {
  const formattedId = String(id).padStart(3, "0");
  const pokemonImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;

  return (
    <Link
      className="font-openSans w-[140px] md:w-[200px] lg:w-[220px] p-3 border rounded-md hover:scale-105 hover:shadow-lg transition-all duration-300 bg-white"
      to={`/pokemon/${id}`}
    >
      <div className="flex flex-col items-center justify-center">
        <img
          src={pokemonImageUrl}
          alt={`${name}'s image`}
          className="w-32 h-32 sm:w-44 sm:h-44 object-contain"
        />
        <div className="w-[100%] ">
          <p className="italic text-xs ">#{formattedId}</p>
          <p className="text-lg sm:text-xl md:text-xl font-semibold capitalize mb-1">
            {name}
          </p>

          <div className="flex gap-1 ">
            {types.map((typeObj) => (
              <PokemonTypeBadge
                key={typeObj.type.name}
                type={typeObj.type.name}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
