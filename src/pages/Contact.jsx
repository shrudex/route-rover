import React, { useState, useEffect } from "react";

const Contact = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [helpline, setHelpline] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Fetch the helpline number for the selected option from the backend
    // and update the 'helpline' state
    fetchHelpline(option);
    setIsOpen(false);
  };

  const fetchHelpline = (selectedOption) => {
    // Make a request to the Flask backend to get the helpline for the selected option
    // You need to replace 'your_flask_backend_url' with the actual URL of your Flask app
    fetch(`http://localhost:5000/get_helpline/${selectedOption}`)
      .then((response) => response.json())
      .then((data) => {
        setHelpline(data.helpline);
      })
      .catch((error) => console.error("Error fetching helpline:", error));
  };

  useEffect(() => {
    // Fetch dropdown options from the Flask backend when the component mounts
    fetchDropdownOptions();
  }, []);

  const fetchDropdownOptions = () => {
    // You need to replace 'your_flask_backend_url' with the actual URL of your Flask app
    fetch("http://localhost:5000/dropdown_options")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data.options);
      })
      .catch((error) =>
        console.error("Error fetching dropdown options:", error)
      );
  };

  console.log(currentUser);
  return (
    <div className="w-10/12 mx-auto mt-4 text-center">
      <h1 className="text-5xl cardo mb-2">Queries Forum</h1>
      <div className="text-2xl work mt-6">
        Hello <span className="text-blue-800">{currentUser?.[1]}</span>, please
        contact the helpline number by selecting the query type <br></br> from
        the dropdown below.{" "}
      </div>
      <div className="relative inline-block text-left">
        <button
          id="dropdownDefaultButton"
          onClick={toggleDropdown}
          className="text-white work mt-8 bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-xl px-24 py-0.5 text-center inline-flex items-center "
          type="button"
        >
          {selectedOption ? selectedOption : "Choose Query"}

          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
      {isOpen && (
        <div className="z-10 absolute left-0 mt-2 bg-white w-full divide-y divide-gray-100 rounded-lg shadow ">
          <ul className="py-2 text-md px-auto w-full  text-black">
            {options.map((option, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => handleOptionSelect(option)}
                  className="block cardo px-0 py-1.5 w-full text-center border-black rounded border-b hover:bg-gray-300 "
                >
                  {option}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
</div>
      {/* Display helpline below the dropdown */}
      {selectedOption && (
        <div className="mt-2">
          <p className="text-black text-2xl cardo mt-16 text-center">Helpline: <span className="text-white bg-black rounded px-2">{helpline}</span></p>
        </div>
      )}
    
    </div>

  );
};

export default Contact;
