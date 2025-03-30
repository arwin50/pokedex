import { useState } from "react";

export const SortBar = ({ onSort }: { onSort: (sortBy: string) => void }) => {
  const [sortBy, setSortBy] = useState("id");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    onSort(selectedSort);
  };

  return (
    <div className="flex gap-2 items-center">
      <span>Sort by:</span>
      <div className="border ps-1 pe-2 flex-1 cursor-pointer rounded-md">
        <select
          className=" px-2 py-2 text-xs flex-1 w-full mb:w-auto md:text-sm lg:text-base focus:outline-none focus:ring-0 focus:border-gray-300 cursor-pointer"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="ascendingId">Ascending ID</option>
          <option value="descendingId">Descending ID</option>
          <option value="alphabetical">A - Z</option>
          <option value="reverseAlphabetical">Z - A</option>
        </select>
      </div>
    </div>
  );
};
