import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      ); //making a POST request to Flask API
      if (response.status === 200) {
        alert("Login Successfully");
        // checking
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login credentials wrong!");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="w-full h-full py-16 work bg-white">
      <div className="bg-grey-lighter h-fit flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded border border-black shadow-md text-black w-full">
            <h1 className="mb-8 text-4xl text-center cardo">Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Log In
              </button>
            </form>
          </div>

          <div className="text-grey-dark mt-6">
            Don't have an account?{" "}
            <Link
              className="no-underline border-b border-blue text-blue"
              to="/signup"
            >
              Sign Up
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
