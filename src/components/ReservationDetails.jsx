import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowBill from "./ShowBill";

const ReservationDetails = ({ trainNumber, email, coach, date }) => {
  const [bookID, setBookID] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "", coach },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // You can access the passenger details in the state variable (passengers)
    console.log("Passenger Details:", passengers);
    try {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000);
      const book_id = `BOOK-${timestamp}-${random}`;
      //setBookID(`BOOK-${timestamp}-${random}`);
      console.log(bookID);

      const seatsBooked = passengers.length;

      const passengerResponse = await axios.post(
        "http://localhost:5000/store_passenger_details",
        {
          email: email,
          trainNumber: trainNumber,
          bookID: book_id,
          passengers: JSON.stringify(passengers),
        }
      );

      if (passengerResponse.status === 200) {
        const bookingResponse = await axios.post(
          "http://localhost:5000/store_booking_details",
          {
            email: email,
            bookID: book_id,
            trainNumber: trainNumber,
            seatsBooked: seatsBooked,
            coach: coach,
          }
        );

        if (bookingResponse.status === 200) {
          const userBookingResponse = await axios.post(
            "http://localhost:5000/user_booking_details",
            {
              email: email,
              bookID: book_id,
              journeyDate: date,
            }
          );

          if (userBookingResponse.status === 200) {
            setBookID(book_id);
            setShowBill(true);
          }
        }
      }
    } catch (error) {
      setError("Failed to store booking details");
    } finally {
      setLoading(false);
    }
  };

  const addPassenger = () => {
    if (passengers.length < 50) {
      // Limit to a maximum of 4 passengers
      setPassengers([...passengers, { name: "", age: "", gender: "", coach }]);
    }
  };

  useEffect(() => {
    if (bookID) {
      console.log("Book ID:", bookID);
    }
  }, [bookID]);

  return (
    <div className="w-11/12 mx-auto mt-8 border border-blue-950 rounded-md">
      <h3 className="cardo text-center text-2xl">Passenger Details</h3>
      <form
        className="flex flex-col gap-4 items-center justify-center"
        onSubmit={handleSubmit}
      >
        {passengers.map((passenger, index) => (
          <div
            key={index}
            className="input-reserv flex space-x-8 mt-4 w-fit mx-auto items-center justify-center"
          >
            <label htmlFor={`namePass${index}`}>Name:</label>
            <input
              className="border border-black rounded text-center"
              type="text"
              name={`namePass${index}`}
              value={passenger.name}
              onChange={(e) => {
                const updatedPassengers = [...passengers];
                updatedPassengers[index].name = e.target.value;
                setPassengers(updatedPassengers);
              }}
            />
            <label htmlFor={`agePass${index}`}>Age: </label>
            <input
              type="number"
              className="border border-black rounded text-center"
              name={`agePass${index}`}
              value={passenger.age}
              onChange={(e) => {
                const updatedPassengers = [...passengers];
                updatedPassengers[index].age = e.target.value;
                setPassengers(updatedPassengers);
              }}
            />
            <label htmlFor={`gender${index}`}>Gender: </label>
            <select
              id={`gender${index}`}
              name={`gender${index}`}
              className="border border-black rounded w-full p-1"
              value={passenger.gender}
              onChange={(e) => {
                const updatedPassengers = [...passengers];
                updatedPassengers[index].gender = e.target.value;
                setPassengers(updatedPassengers);
              }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        ))}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex gap-12 mb-4">
            {passengers.length === 50 ? null : (
              <button
                type="button"
                onClick={addPassenger}
                className="bg-gray-900 text-white px-6 rounded text-lg w-fit mx-auto justify-center-center"
              >
                Add Passenger
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-900 text-white px-6 rounded text-lg w-fit mx-auto justify-center-center"
            >
              Submit
            </button>
          </div>
        )}
      </form>
      {showBill === true ? <ShowBill bookID={bookID} email={email} /> : null}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ReservationDetails;
