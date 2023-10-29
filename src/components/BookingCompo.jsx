import React from "react";
import { useEffect, useState } from "react";
import ReservationDetails from "./ReservationDetails";
const BookingCompo = ({ trainNumber, date, currentUser }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [trains, setTrains] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState("");
  const [showReserv, setShowReserv] = useState(false);
  const handleEnterDetailsClick = () => {
    setShowReserv(true);
  };

  const handleRadioChange = (event) => {
    setSelectedTicket(event.target.value);
  };

  useEffect(() => {
    const searchOption = "SEARCH by number";
    const searchParams = new URLSearchParams({
      number: trainNumber,
      searchOption: searchOption,
    });

    fetch(`http://localhost:5000/trains?${searchParams.toString()}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTrains(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching train data:", error);
      });
  }, [trainNumber]);

  return (
    <div className="border border-black rounded p-4 w-11/12 mx-auto mt-8">
      <div className="info text-center cardo">
        <h1 className="text-3xl mb-2">Journey Details</h1>
        <div className="border-2 border-blue-800 rounded-md w-fit mx-auto px-2">
          <h3>
            User Email : <span className="font-bold">{currentUser[2]}</span>
          </h3>
          <h3>
            Journey Date : <span className="font-bold">{date}</span>
          </h3>
          <h3>
            Train Number : <span className="font-bold">{trainNumber}</span>
          </h3>
          <h3>
            From Station :{" "}
            <span className="font-bold">{trains?.[0]?.origin}</span>
          </h3>
          <h3>
            To Station :{" "}
            <span className="font-bold">{trains?.[0]?.destination}</span>
          </h3>
          <h2 className="mt-2 text-blue-950 font-bold">Price Chart</h2>

          <div className="price flex items-center justify-center gap-6">
            <h3>
              1A : ₹ <span className="font-bold">{trains?.[0]?.["1A"]}</span>
            </h3>
            <h3>
              2A : ₹ <span className="font-bold">{trains?.[0]?.["2A"]}</span>
            </h3>
            <h3>
              3A : ₹ <span className="font-bold">{trains?.[0]?.["3A"]}</span>
            </h3>
            <h3>
              General : ₹{" "}
              <span className="font-bold">{trains?.[0]?.General}</span>
            </h3>
            <h3>
              SL : ₹ <span className="font-bold">{trains?.[0]?.SL}</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="choose-price flex flex-col items-center cardo text-xl mt-4">
        <form></form>
        <h2 className="text-2xl font-base">Select Ticket Classes</h2>
        <div className="radio-classes flex gap-4">
          <label>
            <input
              type="radio"
              name="1A"
              value="1A"
              checked={selectedTicket === "1A"}
              onChange={handleRadioChange}
            />
            1A
          </label>
          <label>
            <input
              type="radio"
              name="2A"
              value="2A"
              checked={selectedTicket === "2A"}
              onChange={handleRadioChange}
            />
            2A
          </label>
          <label>
            <input
              type="radio"
              name="3A"
              value="3A"
              checked={selectedTicket === "3A"}
              onChange={handleRadioChange}
            />
            3A
          </label>
          <label>
            <input
              type="radio"
              name="SL"
              value="SL"
              checked={selectedTicket === "SL"}
              onChange={handleRadioChange}
            />
            SL
          </label>
          <label>
            <input
              type="radio"
              name="General"
              value="General"
              checked={selectedTicket === "General"}
              onChange={handleRadioChange}
            />
            General
          </label>
        </div>
        <div className="flex gap-2">
          <h3>Selected Tickets :</h3>
          <p className="font-semibold">{selectedTicket}</p>
        </div>
        <button
          onClick={handleEnterDetailsClick}
          className="bg-black text-white rounded-lg px-4 text-xl mt-5"
        >
          Enter Passenger Details
        </button>
      </div>
      <div className="reservation-details-component">
        {showReserv === true ? (
          <ReservationDetails
            trainNumber={trainNumber}
            email={currentUser[2]}
            coach={selectedTicket}
            date={date}
          />
        ) : null}
      </div>
    </div>
  );
};

export default BookingCompo;
