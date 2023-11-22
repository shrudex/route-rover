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
            {trainRoute !== null && (
              <div>
                <h2>Route Details</h2>
                <p>Train Number: {trainRoute.route.trainNumber}</p>
                <p>Train Name: {trainRoute.trainList.name}</p>
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
                <p>End: {trainRoute.trainList.destination}</p>{" "}
                <p>Current Position : {trainRoute.route.position}</p>
                <br />
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrainSchedule;
