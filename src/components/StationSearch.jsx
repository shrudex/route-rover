// StationSearch.js

import React, { useState } from "react";

const StationSearch = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className="mt-6  rounded raleway w-1/2 mx-auto">
      <input
        type="text"
        placeholder="Search for a station..."
        value={searchText}
        className="border-black text-center border w-1/2 text-lg rounded px-2"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className="bg-black ml-4  rounded text-white px-4 text-xl" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default StationSearch;
