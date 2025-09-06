import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to EcoFinds 🌱</h1>
      <p>Buy and sell pre-loved items sustainably.</p>
      <Link to="/products">Start Browsing</Link>
    </div>
  );
}

export default Home;
