import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    // Persist wishlist in localStorage
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((p) => (p._id || p.id) === (product._id || product.id))) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (product) => {
    setWishlist((prev) => prev.filter((p) => (p._id || p.id) !== (product._id || product.id)));
  };

  const isWishlisted = (product) => {
    return wishlist.some((p) => (p._id || p.id) === (product._id || product.id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
