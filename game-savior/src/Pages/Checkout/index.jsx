import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";

export default function Checkout({ cart }) {
  console.log("Cart in Component:", cart);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");

  const calculateTotalPrice = () => {
    return cart.reduce((total, ticket) => total + ticket.quantity * 25, 0);
  };

  const handlePlaceOrder = () => {
    console.log("Order placed!");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Cellphone:", cellphone);
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <ul className="checkout-items">
        {cart.map((ticket) => (
          <li key={ticket._id} className="checkout-item">
            <div className="item-details">
              <p className="item-name">{ticket.name}</p>
              <p className="item-quantity">Quantity: {ticket.quantity}</p>
              <p className="item-total-price">
                Total Price: ${ticket.quantity * 25}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="customer-info">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="cellphone">Cellphone:</label>
        <input
          type="tel"
          id="cellphone"
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
        />
      </div>
      <div className="total-section">
        <p className="total-text">Total:</p>
        <p className="total-amount">${calculateTotalPrice()}</p>
      </div>
      <button className="place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
      <Link to="/cart" className="back-to-cart-link">
        Back to Cart
      </Link>
    </div>
  );
}
