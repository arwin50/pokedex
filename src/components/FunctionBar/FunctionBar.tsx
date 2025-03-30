import { SearchBar } from "./SearchBar";
import { SortBar } from "./SortBar";

export const FunctionBar = ({
  onSearch,
  onSort,
}: {
  onSearch: (query: string) => void;
  onSort: (sortBy: string) => void;
}) => {
  return (
    <nav className="flex w-[100%]  md:justify-around mb-2 flex-col md:flex-row">
      <a href="/" className="flex justify-center mb-3 md:block md:mb-0">
        <img
          src="../../src/assets/pokemon.png"
          alt="logo"
          className="w-32  object-contain hover:animate-pulse hover:scale-110 transition"
        />
      </a>

      <SearchBar onSearch={onSearch} />
      <SortBar onSort={onSort} />
    </nav>
  );
};
