import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProductFeed from "./pages/ProductFeed";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import MyListings from "./pages/MyListings";
import Cart from "./pages/Cart";
import Purchases from "./pages/Purchases";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile"; // ✅ added import
import Checkout from "./pages/Checkout";

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductFeed />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
