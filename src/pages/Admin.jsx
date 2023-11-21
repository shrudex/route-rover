import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Admin = ({
  adminEmail,
  setAdminEmail,
  adminName,
  setAdminName,
  currentAdmin,
  setCurrentAdmin,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/admin_login",
        formData
      ); //making a POST request to Flask API
      if (response.status === 200) {
        //alert("Login Successfully");
        //console.log(adminEmail);
        setAdminEmail(formData.email);
        //console.log(adminEmail);
        axios
          .post("http://localhost:5000/get_admin", { email: formData.email })
          .then((response) => {
            console.log(response.data);
            setCurrentAdmin(response.data); // Handle the response here
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Admin Login credentials wrong!");
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
            <h1 className="mb-8 text-4xl text-center cardo">Admin Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
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
        </div>
      </div>
    </div>
  );
};

export default Admin;
