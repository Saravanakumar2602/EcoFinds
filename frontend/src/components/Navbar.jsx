import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/navbar.css";

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <h2>EcoFinds</h2>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          </li>
          <li>
            <Link to="/products" className={location.pathname.startsWith("/products") ? "active" : ""}>Browse</Link>
          </li>
          <li>
            <Link to="/cart" className={location.pathname === "/cart" ? "active" : ""}>Cart</Link>
          </li>
          <li>
            <Link to="/purchases" className={location.pathname === "/purchases" ? "active" : ""}>Previous Purchase</Link>
          </li>
          <li>
            <Link to="/my-listings" className={location.pathname === "/my-listings" ? "active" : ""}>My Listings</Link>
          </li>
          <li>
            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
          </li>
          <li>
            <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
