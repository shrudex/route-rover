import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowBill = ({ bookID, email }) => {
  const [billData, setBillData] = useState(null);
  useEffect(() => {
    // Function to fetch booking details
    const fetchBookingDetails = async () => {
      try {
        // Fetch passenger details from passengerDetails table
        const passengerDetailsResponse = await axios.get(
          `http://localhost:5000/fetch_passenger_details?bookID=${bookID}`
        );

        // Fetch booking fare from bookingFare table
        const bookingFareResponse = await axios.get(
          `http://localhost:5000/fetch_booking_fare?bookID=${bookID}`
        );

        // Fetch user booking details from userBooking table
        const userBookingResponse = await axios.get(
          `http://localhost:5000/fetch_user_booking?bookID=${bookID}`
        );
        console.log(passengerDetailsResponse.data);
        console.log(bookingFareResponse.data);
        console.log(userBookingResponse.data);
        // Set the bill data
        setBillData({
          passengerDetails: passengerDetailsResponse.data,
          bookingFare: bookingFareResponse.data,
          userBooking: userBookingResponse.data,
        });
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [bookID]);

  return (
    <div className="w-11/12 mt-4 mx-auto monts text-center mb-8 rounded border border-blue-950">
      <h2 className="text-4xl work mt-2">Booking Bill</h2>
      {billData ? (
        <div>
          <h3 className="text-2xl text-blue-800 cardo">Passenger Details</h3>
          <ul>
            {billData.passengerDetails.map((passenger, index) => (
              <li className="text-lg" key={index}>
                <span className="font-semibold">Name:</span> {passenger.pname},{" "}
                <span className="font-semibold">Age: </span>
                {passenger.page},{" "}
                <span className="font-semibold">Gender: </span>
                {passenger.pgender},{" "}
                <span className="font-semibold">Class:</span> {passenger.pclass}
              </li>
            ))}
          </ul>
          <h3 className="mt-4 text-xl">Booking Fare Details</h3>
          <p>Seats Booked: {billData.bookingFare.seatsBooked}</p>
          <p>Fare: {billData.bookingFare.fare}</p>
          <h3>User Booking Details</h3>
          <p>Book ID: {billData.userBooking.bookID}</p>
          <p>Journey Date: {billData.userBooking.journeyDate}</p>
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
};

export default ShowBill;
