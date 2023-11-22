import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

function AdminNavbar({ currentAdmin, setCurrentAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="work bg-gray-700">
      <div className=" flex items-center justify-center gap-0 px-2">
        <img className="w-fit h-14" src="./locomotive.webp" alt="logo" />
        <Link to="/" className="title poppins">
          RouteRover
        </Link>
      </div>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/admin-dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin-add-train">Add Train</NavLink>
        </li>
        <li>
          <NavLink to="/admin-train-schedule">Train Scheduler</NavLink>
        </li>
        {currentAdmin === null ? (
          <li>
            <NavLink to="/admin">LogIn</NavLink>
          </li>
        ) : null}
        {currentAdmin === null ? null : (
          <div className="flex justify-center items-center flex-col mx-2">
            <h3 className="text-center justify-center">Hi </h3>
            <p className="text-white font-medium">{currentAdmin.full_name}</p>
          </div>
        )}
        {currentAdmin === null ? null : (
          <button
            onClick={() => setCurrentAdmin(null)}
            className="bg-gray-900 rounded-lg py-0 mx-2 px-4 "
          >
            Log Out
          </button>
        )}
      </ul>
    </nav>
  );
}

export default AdminNavbar;
