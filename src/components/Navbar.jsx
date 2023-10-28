import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
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
          <NavLink to="/">Services</NavLink>
        </li>
        <li>
          <NavLink to="/">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/login">LogIn</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
