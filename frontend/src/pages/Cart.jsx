import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/cart.css";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-products">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <div className="cart-card-image">
                  <img src={item.image || "https://via.placeholder.com/300"} alt={item.title || item.name || "Product"} />
                </div>
                <div className="cart-card-info">
                  <div className="cart-card-title">{item.title || item.name || "Product"}</div>
                  <div className="cart-card-price">₹{item.price}</div>
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <h3>Total: ₹{total}</h3>
          <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
