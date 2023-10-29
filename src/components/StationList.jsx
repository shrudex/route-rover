import React, { useState, useEffect } from "react";

const StationList = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    // Fetch station data from the backend
    fetch("http://localhost:5000/stations")
      .then((response) => response.json())
      .then((data) => setStations(data));
  }, []);

  return (
    <div className="border border-purple-600 mb-12 w-9/12 mx-auto rounded mt-4">
      <h1 className="text-3xl cardo mt-4">List of Stations</h1>
      <ul className="text-lg raleway mb-2 ">
        {stations.map((station) => (
          <li key={station.stationCode}>
            <span className="font-bold">{station.stationCode}</span> - {station.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StationList;
