import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ currentUser }) => {
  const [bookingData, setBookingData] = useState([]);

  let email;
  if (currentUser != null) {
    email = currentUser[2];
  }
  console.log(currentUser);
  useEffect(() => {
    console.log(email);
    if (email) {
      axios
        .get(`http://localhost:5000/get-user-booking?email=${email}`)
        .then((response) => {
          setBookingData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
          setBookingData(null);
        });
    }
  }, [email]);

  return (
    <div>
      {currentUser === null ? (
        <div className="w-full h-full text-red-600 text-6xl cardo mt-48 flex items-center justify-center">
          Login First!!!
        </div>
      ) : (
        <div className="w-full h-full pb-12">
          <h1 className="text-black text-6xl mt-4 cardo text-center">
            Hi <span className="text-purple-600">{currentUser[1]}</span>
          </h1>
          <div className="w-fit pr-16 pl-16 mt-3 py-2 gap-2 raleway border-black mx-auto flex flex-col items-center justify-center border rounded card">
            <h3 className="text-xl">
              Name -{" "}
              <span className="text-blue-800 font-semibold">
                {currentUser[1]}
              </span>
            </h3>
            <h3 className="text-xl">
              Email -{" "}
              <span className="text-blue-800 font-semibold">
                {currentUser[2]}
              </span>
            </h3>
            <h3 className="text-xl">
              Gender -{" "}
              <span className="text-blue-800 font-semibold">
                {currentUser[4]}
              </span>
            </h3>
            <h3 className="text-xl">
              Date of Birth -{" "}
              <span className="text-blue-800 font-semibold">
                {currentUser[5].substring(0, 16)}
              </span>
            </h3>
            <h3 className="text-xl">
              Mobile Number -{" "}
              <span className="text-blue-800 font-semibold">
                {currentUser[6]}
              </span>
            </h3>
          </div>
          <h3 className="text-center cardo text-4xl mt-4 ">Previous Bookings</h3>
          <div className="previous-bookings border mx-auto flex flex-col gap-4  border-blue-950 px-40 py-6 rounded-xl w-fit mt-4">
            {bookingData.length > 0 ? (
              bookingData.map((booking, index) => (
                <div className="border border-blue-700  px-5 rounded monts text-center" key={index}>
                  <h3 className="text-center cardo text-2xl font-semibold">Booking {index + 1}</h3>
                  <p>BookID: <span className="font-semibold text-blue-800">{booking.bookID}</span></p>
                  <p>Journey Date: <span className="font-semibold text-blue-800">{booking.journeyDate}</span></p>
                  <h4 className="cardo text-xl mt-2">Train Details:</h4>
                  <p>Train Name: <span className="font-semibold text-blue-800">{booking.trainData.name}</span></p>
                  <p>Origin: <span className="font-semibold text-blue-800">{booking.trainData.origin}</span></p>
                  <p>Destination: <span className="font-semibold text-blue-800">{booking.trainData.destination}</span></p>
                  <p>Arrival Time: <span className="font-semibold text-blue-800">{booking.trainData.arrival}</span></p>
                  <p>Departure Time: <span className="font-semibold text-blue-800">{booking.trainData.departure}</span></p>
                  <h4 className="cardo text-xl mb-1 mt-2">Passenger Details:</h4>
                  <ul className="px-8 flex flex-col gap-1">
                    {booking.passengerDetails.map(
                      (passenger, passengerIndex) => (
                        <li key={passengerIndex}>
                          Name: <span className="text-blue-800 font-semibold">{passenger.pName}</span>, Age: <span className="text-blue-800 font-semibold">{passenger.pAge}</span>, Class:{" "}
                          <span className="text-blue-800 font-semibold">{passenger.pClass}</span>, Gender: <span className="text-blue-800 font-semibold">{passenger.pGender}</span>
                        </li>
                      )
                    )}
                  </ul>
                  <p>Coach: <span className="font-semibold text-blue-900">{booking.coach}</span></p>
                  <p>Fare: <span className="font-semibold text-blue-900">{booking.fare}</span></p>
                  <p>Seats Booked: <span className="font-semibold text-blue-900">{booking.seatsBooked}</span></p>
                </div>
              ))
            ) : (
              <p>No booking data available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
