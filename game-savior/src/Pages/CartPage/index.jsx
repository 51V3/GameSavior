import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css"; // Import your CSS file for the cart component

export default function Cart() {
  const [cart, setCart] = useState([]);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cart.map((ticket) =>
      ticket._id === id ? { ...ticket, quantity: newQuantity } : ticket
    );
    setCart(updatedCart);
  };

  const calculateTotalPrice = (ticket) => {
    return (ticket.quantity || 0) * 25;
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <ul className="cart-items">
        {cart.map((ticket) => (
          <li key={ticket._id} className="cart-item">
            <div className="item-details">
              <p className="item-name">{ticket.name}</p>
              <p className="item-price">${25}</p>
              <input
                type="number"
                min="0"
                value={ticket.quantity || 0}
                onChange={(e) =>
                  handleQuantityChange(ticket._id, parseInt(e.target.value))
                }
                className="item-quantity"
              />
              <p className="item-total-price">
                Total Price: ${calculateTotalPrice(ticket)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/checkout" className="checkout-link">
        <button className="checkout-button">Checkout</button>
      </Link>
    </div>
  );
}
