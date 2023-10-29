import React, { useState } from "react";
import StationList from "../components/StationList";
import StationDetails from "../components/StationDetails";
import StationSearch from "../components/StationSearch";

const Station = ({ currentUser }) => {
  const [selectedStationCode, setSelectedStationCode] = useState(null);

  const handleSearch = (searchText) => {
    // Implement search logic and set the selected station code
    setSelectedStationCode(searchText);
  };

  return (
    <div className="w-10/12 mx-auto mt-4 text-center">
      <h1 className="text-5xl cardo mb-2">Railway Station Management System</h1>
      <div className="search border border-black rounded-lg">
      <StationSearch onSearch={handleSearch} />
      {selectedStationCode ? (
        <StationDetails stationCode={selectedStationCode} />
      ) : (
        <StationList />
      )}</div>
    </div>
  );
};

export default Station;
