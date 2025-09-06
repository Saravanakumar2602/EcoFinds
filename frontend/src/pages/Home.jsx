
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/home.css";
import products from "../data/products";

const categoryList = [
  { key: "mobile", label: "Mobiles" },
  { key: "furnitures", label: "Furnitures" },
  { key: "books", label: "Books" },
  { key: "watch", label: "Watches" },
  { key: "gym and fitness", label: "Gym & Fitness" },
];



function Home() {
  // Hero: 5 featured products (first 5 for now)
  const heroProducts = products.slice(0, 5);
  // Category sections: 8 products per category
  const getCategoryProducts = (cat) => products.filter((p) => p.category === cat).slice(0, 8);
  // Today's Deal: 3 products with deal: true
  const todaysDeals = products.filter((p) => p.deal).slice(0, 3);

  // Hero carousel state
  const [heroIndex, setHeroIndex] = useState(0);
  const nextHero = () => setHeroIndex((i) => (i + 1) % heroProducts.length);
  const prevHero = () => setHeroIndex((i) => (i - 1 + heroProducts.length) % heroProducts.length);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-logo">
          <img src="/ecofinds.png" alt="EcoFinds Logo" />
          <span className="home-title">EcoFinds</span>
        </div>
        <div className="home-actions">
          <Link to="/add-product">
            <button className="add-product-btn" title="Add Product">
              +
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Banner - Carousel */}
      <section className="hero-banner">
        <div className="hero-carousel">
          <button className="hero-arrow left" onClick={prevHero} aria-label="Previous">&#8592;</button>
          <Link to={`/products/${heroProducts[heroIndex].id}`} className="hero-carousel-card">
            <img src={heroProducts[heroIndex].image} alt={heroProducts[heroIndex].name} />
            <div className="hero-carousel-info">
              <h2>{heroProducts[heroIndex].name}</h2>
              <p>{heroProducts[heroIndex].description}</p>
              <span className="hero-carousel-price">₹{heroProducts[heroIndex].price}</span>
            </div>
          </Link>
          <button className="hero-arrow right" onClick={nextHero} aria-label="Next">&#8594;</button>
        </div>
        <div className="hero-dots">
          {heroProducts.map((_, idx) => (
            <span
              key={idx}
              className={`hero-dot${idx === heroIndex ? " active" : ""}`}
              onClick={() => setHeroIndex(idx)}
            />
          ))}
        </div>
      </section>

      {/* Today's Deal */}
      <section className="todays-deal-section">
        <h2>Today's Deal</h2>
        <div className="todays-deal-products">
          {todaysDeals.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} className="todays-deal-card">
              <img src={product.image} alt={product.name} />
              <div className="todays-deal-info">
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {categoryList.map((cat) => (
        <section className="category-section" key={cat.key}>
          <div className="category-title-row">
            <h2>{cat.label}</h2>
            <Link to={`/category/${cat.key}`} className="see-all-link">See all</Link>
          </div>
          <div className="category-products-grid">
            {getCategoryProducts(cat.key).map((product, idx) => (
              <Link to={`/products/${product.id}`} key={product.id} className="category-product-card">
                <img src={product.image} alt={product.name} />
                <div className="category-product-info">
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Home;
