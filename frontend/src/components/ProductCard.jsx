import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/productCard.css";

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product._id || product.id}`} className="product-card">
      <div className="product-image">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name || product.title}
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name || product.title}</h3>
        <p className="product-price">₹{product.price}</p>
        <span className="product-link">View Details</span>
      </div>
    </Link>
  );
}

export default ProductCard;
