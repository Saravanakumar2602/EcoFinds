import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>EcoFinds</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Browse</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
