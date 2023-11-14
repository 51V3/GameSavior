import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const totalPrice = location.state?.totalPrice || 0;
  const navigate = useNavigate();

  console.log("Cart in Checkout component:", cart);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");

  const handlePlaceOrder = () => {
    console.log("Order placed!");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone Number:", cellphone);
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <ul className="checkout-items">
        {cart.map((ticket, index) => (
          <li key={index} className="checkout-item">
            <div className="item-details">
              <p className="item-name">{`${ticket.homeTeam} vs ${ticket.awayTeam} - ${ticket.formattedDate}`}</p>
              <p className="item-quantity">Quantity: {ticket.quantity}</p>
              <p className="item-total-price">
                Total Price: ${(ticket.quantity || 0) * 25}
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

        <label htmlFor="cellphone">Phone Number:</label>
        <input
          type="tel"
          id="cellphone"
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
        />
      </div>
      <div className="total-section">
        <p className="total-text">Total:</p>
        <p className="total-amount">${totalPrice}</p>
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
