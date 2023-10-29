// StationDetails.js

import React, { useState, useEffect } from "react";

const StationDetails = ({ stationCode }) => {
  const [station, setStation] = useState(null);

  useEffect(() => {
    // Fetch station details by stationCode from the backend
    fetch(`http://localhost:5000/stations/${stationCode}`)
      .then((response) => response.json())
      .then((data) => setStation(data));
  }, [stationCode]);

  if (!station) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border border-blue-950 rounded-lg w-1/2 mx-auto mt-4 mb-4">
      <h1 className="text-4xl cardo">Station Details</h1>
      <h2 className="text-3xl monts mt-2">{stationCode} - {station.stationName}</h2>
      <p className="cardo text-xl">Location: {station.location}</p>
      <p className="cardo text-xl">Other Details: <span className="text-blue-800">{station.otherDetails}</span></p>
    </div>
  );
};

export default StationDetails;
