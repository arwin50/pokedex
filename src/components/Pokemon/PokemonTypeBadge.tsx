import { getTypeColor } from "../../../utils";

export const PokemonTypeBadge: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div
      className={`p-1 flex-1 max-w-[80px] rounded-lg text-white text-center text-xs  ${getTypeColor(
        type
      )}`}
    >
      {type}
    </div>
  );
};
