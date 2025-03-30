import { useState } from "react";
import { GoSearch } from "react-icons/go";

export const SearchBar = ({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex gap-2 flex-col mb-2 md:flex-row md:mb-0">
      <input
        type="text"
        placeholder="Enter name or ID..."
        className="border px-2 py-2 text-xs md:text-sm lg:text-base rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 transition-all    text-xs md:text-sm lg:text-base  cursor-pointer"
        onClick={() => onSearch(query)}
      >
        <span className="block md:hidden lg:block ">Search</span>
        <GoSearch size={20} />
      </button>
    </div>
  );
};
