import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";
import "../styles/pages/myListings.css";

function MyListings() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListings() {
      // Later replace with API call for logged-in user
      const data = await productService.getAll();
      setListings(data.filter((p) => p.owner === "eco@example.com"));
    }
    fetchListings();
  }, []);

  return (
    <div className="my-listings-container">
      <h2 className="my-listings-title">My Listings</h2>
      <button className="add-listing-btn" onClick={() => navigate("/add-product")}>+ Add Product</button>
      {listings.length === 0 ? (
        <p>No listings yet.</p>
      ) : (
        <div className="my-listings-list">
          {listings.map((p) => (
            <div className="listing-card" key={p._id}>
              <div className="listing-image">
                <img src={p.image || "https://via.placeholder.com/300"} alt={p.title} />
              </div>
              <div className="listing-title">{p.title}</div>
              <div className="listing-price">₹{p.price}</div>
              <div className="listing-actions">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;
