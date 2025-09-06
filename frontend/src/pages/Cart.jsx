import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/cart.css";

function Cart() {
  const [cart, setCart] = useState([
    { id: 1, title: "Eco Bag", price: 200, image: "https://via.placeholder.com/300" },
    { id: 2, title: "Recycled Notebook", price: 100, image: "https://via.placeholder.com/300" },
  ]); // placeholder cart

  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
                <Link to={`/products/${item.id}`} className="cart-card-link">
                  <div className="cart-card-image">
                    <img src={item.image || "https://via.placeholder.com/300"} alt={item.title} />
                  </div>
                  <div className="cart-card-info">
                    <div className="cart-card-title">{item.title}</div>
                    <div className="cart-card-price">₹{item.price}</div>
                  </div>
                </Link>
                <button onClick={() => setCart(cart.filter((c) => c.id !== item.id))}>Remove</button>
              </div>
            ))}
          </div>
          <h3>Total: ₹{total}</h3>
          <button>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
