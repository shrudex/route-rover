import React from "react";

const ReservationTrainTable = ({ trains }) => {
  return (
    <div className="w-full ">
      <table className="w-full text-lg text-center">
        <thead>
          <tr className="text-blue-800 ">
            <th>Number</th>
            <th>Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>1A</th>
            <th>2A</th>
            <th>3A</th>
            <th>SL</th>
            <th>General</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.number}>
              <td>{train.number}</td>
              <td>{train.name}</td>
              <td>{train.origin}</td>
              <td>{train.destination}</td>
              <td>{train.arrival}</td>
              <td>{train.departure}</td>
              <td>{train["1A"]}</td>
              <td>{train["2A"]}</td>
              <td>{train["3A"]}</td>
              <td>{train.SL}</td>
              <td>{train.General}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTrainTable;
