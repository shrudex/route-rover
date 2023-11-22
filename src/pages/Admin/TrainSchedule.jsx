import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainSchedule = ({ currentAdmin }) => {
  const [trainRoute, setTrainRoute] = useState(null);

  const [formData, setFormData] = useState({
    number: "",
  });
  const [formData2, setFormData2] = useState({
    number: formData.number,
    currPos: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({ ...formData, [name]: value });
  };
  const handleSubmit1 = async (e) => {
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
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/setpos",
        formData2
      );

      if (response.status === 200) {
        // Handle success
        alert("Live Location Set Successfully");
      }
    } catch (error) {
      alert("Error!");
      console.error("Error:", error);
      // Handle error
    }
  };
  return (
    <div className="w-full h-full py-16 work bg-white">
      {currentAdmin === null ? (
        <div className="w-full h-full text-red-600 text-6xl cardo mt-48 flex items-center justify-center">
          Login First!!!
        </div>
      ) : (
        <div className="bg-grey-lighter h-fit flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded border border-black shadow-md text-black w-full">
              <h1 className="mb-8 text-4xl text-center cardo">
                Set Train Schedule
              </h1>
              <form onSubmit={handleSubmit1}>
                <label htmlFor="number">Search for Train</label>
                <input
                  type="number"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="number"
                  placeholder="Train Number"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Search Train
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {trainRoute !== null && (
        <div className="">
          <div className="mx-auto text-center text-lg w-fit border px-40 mt-4 border-black rounded">
            <h2 className="text-3xl ">Route Details</h2>
            <p>
              Train Number:{" "}
              <span className="text-blue-950 font-semibold">
                {trainRoute.route.trainNumber}
              </span>
            </p>
            <p>
              Train Name:{" "}
              <span className="text-blue-950 font-semibold">
                {trainRoute.trainList.name}
              </span>
            </p>
            <p>Start: {trainRoute.trainList.origin}</p>
            <p>Stop 1: {trainRoute.route.stop1}</p>
            <p>Stop 2: {trainRoute.route.stop2}</p>
            <p>Stop 3: {trainRoute.route.stop3}</p>

            {/* Conditional rendering for stop4 */}
            {trainRoute.route.stop4 !== null && (
              <p>Stop 4: {trainRoute.route.stop4}</p>
            )}

            {/* Conditional rendering for stop5 */}
            {trainRoute.route.stop5 !== null && (
              <p>Stop 5: {trainRoute.route.stop5}</p>
            )}

            {/* Conditional rendering for stop6 */}
            {trainRoute.route.stop6 !== null && (
              <p>Stop 6: {trainRoute.route.stop6}</p>
            )}
            <p>End: {trainRoute.trainList.destination}</p>
            <p>
              Current Position :{" "}
              <span className="text-blue-950 font-semibold">
                {trainRoute.route.position}
              </span>
            </p>
          </div>
          <div className="w-fit mx-auto border border-black rounded px-60 mt-10 py-4">
            <form onSubmit={handleSubmit2}>
              <label htmlFor="number" className="text-xl">Select Current Train Position</label>
              <input
                type="text"
                className="block border border-gray-200 w-full p-3 rounded mb-2 text-center"
                name="currPos"
                placeholder="Current Stop Position"
                value={formData2.currPos}
                onChange={handleInputChange2}
                required
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Set Train Position
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainSchedule;
