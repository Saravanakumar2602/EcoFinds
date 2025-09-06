import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image || "https://via.placeholder.com/150"} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      <Link to={`/products/${product._id}`}>View Details</Link>
    </div>
  );
}

export default ProductCard;
