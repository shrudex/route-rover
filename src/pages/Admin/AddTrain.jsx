import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTrain = ({ currentAdmin }) => {
  const [formData, setFormData] = useState({
    number: "",
    name: "",
    origin: "",
    destination: "",
    arrival: "",
    departure: "",
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
    "1A": 4000.0,
    "2A": 3200.0,
    "3A": 2200.0,
    SL: 1400.0,
    General: 850.0,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/add_train",
        formData
      );

      if (response.status === 200) {
        // Handle success
        alert("Train added successfully!!!");
        console.log("Train added successfully!");
      }
    } catch (error) {
      alert("Train with the same train number exists!");
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <div className="w-full h-full py-16 work bg-white">
      {" "}
      {currentAdmin === null ? (
        <div className="w-full h-full text-red-600 text-6xl cardo mt-48 flex items-center justify-center">
          Login First!!!
        </div>
      ) : (
        <div className="bg-grey-lighter h-fit flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded border border-black shadow-md text-black w-full">
              <h1 className="mb-8 text-4xl text-center cardo">Add a Train</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="number"
                  placeholder="Train Number"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="name"
                  placeholder="Train Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="Origin"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="origin"
                  placeholder="Origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="destination"
                  placeholder="Destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                />
                <input
                  type="time"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="arrival"
                  placeholder="Arrival Time"
                  value={formData.arrival}
                  onChange={handleInputChange}
                />
                <input
                  type="time"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="departure"
                  placeholder="Departure Time"
                  value={formData.departure}
                  onChange={handleInputChange}
                />
                <div className="flex justify-between">
                  <label>
                    Mon
                    <input
                      type="checkbox"
                      name="mon"
                      checked={formData.mon}
                      onChange={handleInputChange}
                    />
                  </label>{" "}
                  <label>
                    Tue
                    <input
                      type="checkbox"
                      name="tue"
                      checked={formData.tue}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Wed
                    <input
                      type="checkbox"
                      name="wed"
                      checked={formData.wed}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Thu
                    <input
                      type="checkbox"
                      name="thu"
                      checked={formData.thu}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Fri
                    <input
                      type="checkbox"
                      name="fri"
                      checked={formData.fri}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Sat
                    <input
                      type="checkbox"
                      name="sat"
                      checked={formData.sat}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Sun
                    <input
                      type="checkbox"
                      name="sun"
                      checked={formData.sun}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <br />
                <div className="mx-auto text-center align-top items-center space-y-1 flex-col">
                  <label>
                    1A Price{" "}
                    <input
                      type="text"
                      className="border border-grey-light w-1/4 px-3 rounded    "
                      name="1A"
                      placeholder="Enter price for 1A"
                      value={formData["1A"]}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    2A Price{" "}
                    <input
                      type="text"
                      name="2A"
                      className="border border-grey-light w-1/4 px-3 rounded"
                      placeholder="Enter price for 2A"
                      value={formData["2A"]}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    3A Price{" "}
                    <input
                      type="text"
                      name="3A"
                      className="border border-grey-light w-1/4 px-3 rounded"
                      placeholder="Enter price for 3A"
                      value={formData["3A"]}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    SL Price{" "}
                    <input
                      type="text"
                      name="SL"
                      className="border border-grey-light w-1/4 px-3 rounded"
                      placeholder="Enter price for SL"
                      value={formData["SL"]}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    General {"   "}
                    <input
                      type="text"
                      name="General"
                      className="ml-1 border border-grey-light w-1/4 px-3 rounded"
                      placeholder="Enter price for General"
                      value={formData["General"]}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Add Train
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTrain;
