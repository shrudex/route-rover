import React, { useState } from "react";
import ReservationTrainTable from "../components/ReservationTrainTable";
import BookingCompo from "../components/BookingCompo";

const Reservation = ({ currentUser }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [trains, setTrains] = useState([]);
  const [trainNumber, setTrainNumber] = useState("");
  const [showBook, setShowBook] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchOption = "SEARCH by station";
    const searchParams = new URLSearchParams({
      from: from,
      to: to,
      searchOption: searchOption,
    });

    fetch(`http://localhost:5000/trains?${searchParams.toString()}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTrains(data);
      })
      .catch((error) => {
        console.error("Error fetching train data:", error);
      });
  };

  const handleButtonClick = () => {
    setShowBook(!showBook);
  };

  return (
    <div>
      <h1 className="text-6xl text-center mt-4 cardo">Reservation</h1>
      <div className="input-details items-center justify-center w-4/12 border border-black rounded-md px-16 py-4 mx-auto raleway flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-6 w-3/4 mb-1">
            <label htmlFor="from">From</label>
            <input
              className="w-full border  px-2 border-gray-600 rounded"
              type="text"
              name="from"
              value={from}
              placeholder="Manipal"
              required
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="flex gap-11 w-3/4 mb-1">
            <label htmlFor="from">To</label>
            <input
              className="w-full border px-2 border-gray-600 rounded"
              type="text"
              name="to"
              placeholder="Lucknow"
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="flex gap-7 w-3/4">
            <label htmlFor="from">Date</label>
            <input
              className="w-full border px-2 border-gray-600 rounded"
              type="date"
              name="date"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button className="bg-black text-white rounded-md mt-2 w-fit px-12">
            Select
          </button>
        </form>
      </div>
      <div className="show-trains border mt-4 w-11/12 mx-auto p-1 border-black rounded-md">
        {trains.length > 0 ? <ReservationTrainTable trains={trains} /> : null}
      </div>
      <div className="enter-train border border-black rounded-md p-2 mt-6 flex items-center justify-center flex-col gap-1 w-5/12  mx-auto">
        <h4 className="cardo text-2xl text-center">Enter Train Number</h4>
        <input
          type="text"
          name="trainNumber"
          className="rounded border text-center placeholder:text-blue-300 border-black w-1/2 mx-auto"
          placeholder="12049"
          value={trainNumber}
          required
          onChange={(e) => setTrainNumber(e.target.value)}
        />
        <button
          onClick={handleButtonClick}
          className="bg-black raleway text-base rounded text-white px-12 mt-2"
        >
          Book Ticket
        </button>
      </div>
      <div className="booking">
        {showBook == true && currentUser != null ? (
          <BookingCompo
            trainNumber={trainNumber}
            currentUser={currentUser}
            date={date}
          />
        ) : showBook == true && currentUser === null ? (
          <p className="text-center text-xl text-red-700 uppercase">Login First!!!</p>
        ) : null}
      </div>
    </div>
  );
};

export default Reservation;
