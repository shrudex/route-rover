import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar({ currentUser, setCurrentUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="work bg-gray-700">
      <Link to="/" className="title poppins">
        RouteRover
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/find-train">Find Train</NavLink>
        </li>
        <li>
          <NavLink to="/reservation">Reservation</NavLink>
        </li>
        <li>
          <NavLink to="/station">Station</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        {currentUser === null ? (
          <li>
            <NavLink to="/login">LogIn</NavLink>
          </li>
        ) : null}
        {currentUser === null ? null : (
          <div className="flex justify-center items-center flex-col mx-2">
            <h3 className="text-center justify-center">Hi </h3>
            <p className="text-white font-medium">{currentUser[1]}</p>
          </div>
        )}
        {currentUser === null ? null : (
          <button
            onClick={() => setCurrentUser(null)}
            className="bg-gray-900 rounded-lg py-0 mx-2 px-4 "
          >
            Log Out
          </button>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
