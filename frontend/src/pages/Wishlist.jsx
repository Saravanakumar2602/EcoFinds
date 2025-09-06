import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/pages/wishlist.css";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist, removeFromWishlist, isWishlisted } = useWishlist();

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.length === 0 ? (
          <div className="no-wishlist">No favorites yet.</div>
        ) : (
          wishlist.map((p) => (
            <ProductCard
              key={p._id || p.id}
              product={p}
              onFavorite={() => removeFromWishlist(p)}
              isFavorite={isWishlisted(p)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;
