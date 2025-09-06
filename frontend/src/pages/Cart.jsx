import React, { useState } from "react";

function Cart() {
  const [cart, setCart] = useState([
    { id: 1, title: "Eco Bag", price: 200 },
    { id: 2, title: "Recycled Notebook", price: 100 },
  ]); // placeholder cart

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - ₹{item.price}
                <button>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
          <button>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
