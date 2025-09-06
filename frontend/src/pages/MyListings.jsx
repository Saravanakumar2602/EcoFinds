import React, { useEffect, useState } from "react";
import productService from "../services/productService";

function MyListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      // Later replace with API call for logged-in user
      const data = await productService.getAll();
      setListings(data.filter((p) => p.owner === "eco@example.com")); 
    }
    fetchListings();
  }, []);

  return (
    <div>
      <h2>My Listings</h2>
      {listings.length === 0 ? (
        <p>No listings yet.</p>
      ) : (
        <ul>
          {listings.map((p) => (
            <li key={p._id}>
              {p.title} - ₹{p.price}
              <button>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyListings;
