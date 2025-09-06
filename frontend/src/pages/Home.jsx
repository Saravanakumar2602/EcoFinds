
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/home.css";

// Placeholder categories
const categories = ["All", "Electronics", "Clothing", "Books", "Home", "Other"];

// Placeholder products (replace with real data or props)
const products = [
  {
    id: 1,
    title: "Eco Water Bottle",
    price: 10,
    category: "Home",
    image: "/logo192.png",
  },
  {
    id: 2,
    title: "Vintage Denim Jacket",
    price: 25,
    category: "Clothing",
    image: "/logo192.png",
  },
  {
    id: 3,
    title: "Wireless Headphones",
    price: 40,
    category: "Electronics",
    image: "/logo192.png",
  },
];

function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products by search and category
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-logo">
          <img src="/logo192.png" alt="EcoFinds Logo" />
          <span className="home-title">EcoFinds</span>
        </div>
        <div className="home-actions">
          <input
            className="search-bar"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <Link to="/add-product">
            <button className="add-product-btn" title="Add Product">
              +
            </button>
          </Link>
        </div>
      </header>
      <main>
        <div className="product-feed">
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="product-card">
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, background: "#f1f5f9" }}
                  />
                  <h3 style={{ margin: "0.5rem 0 0.2rem 0" }}>{product.title}</h3>
                  <p style={{ color: "#3182ce", fontWeight: 600 }}>${product.price}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
