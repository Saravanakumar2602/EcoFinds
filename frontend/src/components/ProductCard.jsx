import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/productCard.css";

function ProductCard({ product, onFavorite, isFavorite }) {
  const [fav, setFav] = useState(isFavorite || false);

  const handleFav = (e) => {
    e.preventDefault();
    setFav(!fav);
    if (onFavorite) onFavorite(product, !fav);
  };

  return (
    <Link to={`/products/${product._id || product.id}`} className="product-card">
      <div className="product-image">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name || product.title}
        />
        <button
          className={`favorite-btn${fav ? " favorited" : ""}`}
          title={fav ? "Remove from Wishlist" : "Add to Wishlist"}
          onClick={handleFav}
        >
          {fav ? "★" : "☆"}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name || product.title}</h3>
        <p className="product-price blue">₹{product.price}</p>
        <span className="product-link blue">View Details</span>
      </div>
    </Link>
  );
}

export default ProductCard;
