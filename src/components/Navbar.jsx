import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        Website
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">About</NavLink>
        </li>
        <li>
          <NavLink to="/">Services</NavLink>
        </li>
        <li>
          <NavLink to="/">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
