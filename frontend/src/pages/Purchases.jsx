import React, { useState, useEffect } from "react";

function Purchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Later replace with API call for user purchases
    setPurchases([
      { id: 1, title: "Eco Bag", price: 200, date: "2025-09-01" },
      { id: 2, title: "Notebook", price: 100, date: "2025-08-15" },
    ]);
  }, []);

  return (
    <div>
      <h2>My Purchases</h2>
      {purchases.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        <ul>
          {purchases.map((p) => (
            <li key={p.id}>
              {p.title} - ₹{p.price} (Bought on {p.date})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Purchases;
