
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { useWishlist } from "../context/WishlistContext";
import "../styles/pages/productFeed.css";

function ProductFeed() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const { wishlist, addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const data = await productService.getAll();
      setProducts(data);
      setCategories([
        ...new Set(
          data.map(
            (p) =>
              p.category &&
              p.category.charAt(0).toUpperCase() + p.category.slice(1)
          )
        ),
      ]);
    }
    fetchProducts();
  }, []);

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesQuery =
      p.name?.toLowerCase().includes(query.toLowerCase()) ||
      p.title?.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category
      ? p.category &&
        p.category.toLowerCase() === category.toLowerCase()
      : true;
    return matchesQuery && matchesCategory;
  });


  // Wishlist logic
  const handleFavorite = (product, fav) => {
    if (fav) addToWishlist(product);
    else removeFromWishlist(product);
  };

  return (
    <div className="product-feed-container">
      {/* Header */}
      <div className="browse-header">
        <div className="browse-logo-title">
          <img
            src="/logo192.png"
            alt="EcoFinds Logo"
            className="browse-logo"
          />
          <span className="browse-title">EcoFinds</span>
        </div>
        <button
          className="add-product-btn"
          onClick={() => navigate("/add-product")}
        >
          +
        </button>
      </div>

      {/* Filters */}
      <div className="browse-filters-row">
        <SearchBar query={query} setQuery={setQuery} />
        <CategoryFilter categories={categories} setCategory={setCategory} />
      </div>

      {/* Product Grid */}
      <div className="product-feed-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products">No products found.</div>
        ) : (
          filteredProducts.map((p) => (
            <ProductCard
              key={p._id || p.id}
              product={p}
              onFavorite={handleFavorite}
              isFavorite={isWishlisted(p)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductFeed;
