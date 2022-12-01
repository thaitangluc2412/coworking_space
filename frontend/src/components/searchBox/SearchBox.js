import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!search) return;
    navigate(`/space-list?cityName=${search}`);
  };
  return (
    <div className="w-[450px] h-[85px] flex flex-row justify-between items-center py-7 pl-10 pr-7 bg-white rounded-full">
      <div className="flex flex-col gap-2">
        <span className="font-bold text-xs">City</span>
        <input
          type="text"
          className="border-b border-primary outline-none px-1 py-1 caret-primary placeholder:italic placeholder:text-sm"
          placeholder="Start typing a city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button
        onClick={handleSearch}
        className="py-3 px-7 bg-primary rounded-full text-white"
      >
        Search now
      </button>
    </div>
  );
};

export default SearchBox;
