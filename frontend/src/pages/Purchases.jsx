import React, { useState, useEffect } from "react";
import "../styles/pages/purchases.css";

function Purchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Later replace with API call for user purchases
    setPurchases([
      {
        id: 1,
        title: "Eco Bag",
        price: 200,
        date: "2025-09-01",
        image: "https://via.placeholder.com/300",
      },
      {
        id: 2,
        title: "Notebook",
        price: 100,
        date: "2025-08-15",
        image: "https://via.placeholder.com/300",
      },
    ]);
  }, []);

  return (
    <div className="purchases-container">
      <h2 className="purchases-title">My Purchases</h2>
      {purchases.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        <div className="purchases-list">
          {purchases.map((p) => (
            <div className="purchase-card" key={p.id}>
              <div className="purchase-image">
                <img
                  src={p.image || "https://via.placeholder.com/300"}
                  alt={p.title}
                />
              </div>
              <div className="purchase-title">{p.title}</div>
              <div className="purchase-price">₹{p.price}</div>
              <div className="purchase-date">Bought on {p.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Purchases;
