import React, { useState } from "react";
import axios from "axios";

const LiveTrainSchedule = () => {
  const [formData, setFormData] = useState({
    number: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [trainRoute, setTrainRoute] = useState(null);
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/search_train",
        formData
      );

      if (response.status === 200) {
        // Handle success
        console.log(response.data);
        setTrainRoute(response.data);
        console.log(trainRoute);
        console.log("Train search successfully!");
      }
    } catch (error) {
      alert("Train with the train number does not exists!");
      console.error("Error:", error);
      // Handle error
    }
  };

  const findHotels = async () => {
    try {
      const response = await axios.post("http://localhost:5000/find_hotels", {
        city: city,
      });

      if (response.status === 200) {
        setHotels(response.data);
        console.log(response.data);
        console.log("Hotels fetched successfully!");
        console.log(hotels);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full h-full py-16 work bg-white">
      <div className="bg-grey-lighter h-fit flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded border border-black shadow-md text-black w-full">
            <h1 className="mb-8 text-4xl text-center cardo">
              Live Train Schedule
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="number"
                placeholder="Train Number"
                value={formData.number}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Search
              </button>
            </form>
          </div>
          <div className="">
            {trainRoute && (
              <div className="border text-center border-black rounded items-center justify-center bg-gray-100 px-20 w-[700px]  mt-4 py-2">
                <h2 className="text-center text-3xl uppercase mb-3 w-full">
                  Route Details
                </h2>
                <p className="text-center text-xl w-full">
                  Train Number:{" "}
                  <span className="text-blue-900 font-semibold">
                    {" "}
                    {trainRoute?.route?.trainNumber}
                  </span>
                </p>
                <p className="text-center text-xl w-full">
                  Train Name:{" "}
                  <span className="text-blue-900 font-semibold">
                    {trainRoute?.trainList?.name}
                  </span>
                </p>
                <p className="text-center text-xl w-full">
                  Start:{" "}
                  <span className="text-blue-900 font-semibold">
                    <button
                      onClick={() => {
                        setCity(trainRoute?.trainList?.origin);
                        findHotels();
                        setIsModalOpen(true);
                      }}
                    >
                      {trainRoute?.trainList?.origin}
                    </button>
                  </span>
                </p>
                <p className="text-center text-xl w-full">
                  Stop 1:{" "}
                  <span className="text-blue-900 font-semibold">
                    <button
                      onClick={() => {
                        setCity(trainRoute?.route?.stop1);
                        findHotels();
                        setIsModalOpen(true);
                      }}
                    >
                      {trainRoute?.route?.stop1}
                    </button>
                  </span>
                </p>
                <p className="text-center text-xl w-full">
                  Stop 2:{" "}
                  <span className="text-blue-900 font-semibold">
                    <button
                      onClick={() => {
                        setCity(trainRoute?.route?.stop2);
                        findHotels();
                        setIsModalOpen(true);
                      }}
                    >
                      {trainRoute?.route?.stop2}{" "}
                    </button>
                  </span>
                </p>
                <p className="text-center text-xl w-full">
                  Stop 3:{" "}
                  <span className="text-blue-900 font-semibold">
                    {" "}
                    <button
                      onClick={() => {
                        setCity(trainRoute?.route?.stop3);
                        findHotels();
                        setIsModalOpen(true);
                      }}
                    >
                      {trainRoute?.route?.stop3}
                    </button>
                  </span>
                </p>
                {/* Conditional rendering for stop4 */}
                {trainRoute?.route?.stop4 !== null && (
                  <p className="text-center text-xl w-full">
                    Stop 4:{" "}
                    <span className="text-blue-900 font-semibold">
                      <button
                        onClick={() => {
                          setCity(trainRoute?.route?.stop4);
                          findHotels();
                          setIsModalOpen(true);
                        }}
                      >
                        {trainRoute?.route?.stop4}
                      </button>
                    </span>
                  </p>
                )}
                {/* Conditional rendering for stop5 */}
                {trainRoute?.route?.stop5 !== null && (
                  <p className="text-center text-xl w-full">
                    Stop 5:{" "}
                    <span className="text-blue-900 font-semibold">
                      <button
                        onClick={() => {
                          setCity(trainRoute?.route?.stop5);
                          findHotels();
                          setIsModalOpen(true);
                        }}
                      >
                        {trainRoute?.route?.stop5}
                      </button>
                    </span>
                  </p>
                )}
                {/* Conditional rendering for stop6 */}
                {trainRoute?.route?.stop6 !== null && (
                  <p className="text-center text-xl w-full">
                    Stop 6:{" "}
                    <span className="text-blue-900 font-semibold">
                      <button
                        onClick={() => {
                          setCity(trainRoute?.route?.stop6);
                          findHotels();
                          setIsModalOpen(true);
                        }}
                      >
                        {trainRoute?.route?.stop6}{" "}
                      </button>
                    </span>
                  </p>
                )}
                <p className="text-center text-xl w-full">
                  End:{" "}
                  <span className="text-blue-900 font-semibold">
                    {" "}
                    <button
                      onClick={() => {
                        setCity(trainRoute?.trainList?.destination);
                        findHotels();
                        setIsModalOpen(true);
                      }}
                    >
                      {trainRoute?.trainList?.destination}
                    </button>
                  </span>
                </p>{" "}
                <p className="text-center text-xl w-full">
                  Current Position :{" "}
                  <span className="text-blue-900 font-semibold">
                    {trainRoute?.route?.position}
                  </span>
                </p>
              </div>
            )}
            {/* Modal */}
            {isModalOpen && (
              <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-[#00000080] flex items-center justify-center">
                <div className="modal bg-white p-5 rounded-lg relative">
                  <span
                    className="close absolute top-0 right-2 text-3xl cursor-pointer"
                    onClick={closeModal}
                  >
                    &times;
                  </span>
                  <div className="modal-content text-center">
                    <p className="text-2xl text-blue-900 font-semibold uppercase">
                      {city}
                    </p>
                    <p className="text-xl">Hotels in <span className="text-gray-900 font-semibold">{city}</span></p>
                    <ul className="text-lg mt-3 px-20">
                      {hotels.map((hotel, index) => (
                        <li key={index} className="border border-black rounded px-12 mb-3">
                          <p>Hotel Name: <span className="text-green-900 font-medium">{hotel.hotelName}</span></p>
                          <p>Hotel Number: <span className="text-blue-900 font-medium">{hotel.hotelNumber}</span></p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrainSchedule;
