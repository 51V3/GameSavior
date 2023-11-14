import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Checkout.css";
import axios from "axios";
import { useCart } from "../../Components/CartContext";

export default function Checkout() {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const totalPrice = location.state?.totalPrice || 0;
  const navigate = useNavigate();
  const { cart1, dispatch} = useCart();
  const { id } = useParams();

  console.log("Cart in Checkout component:", cart);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");

  const handleDeleteAll = async () => {
    try {
      for(const ticket of cart){
        await axios.delete(`http://localhost:5005/ticket/${ticket.id}`);
      }
      dispatch({ type: "SET_CART", payload: [] });
    } catch (error) {
      console.error("Error deleting all items:", error);
      // Handle error scenarios here, e.g., show an error message to the user
    }
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
        <Link to="/orderplaced">
        <button className="place-order-button" onClick={handleDeleteAll}>
          Place Order
        </button>
        </Link>
      <Link to="/cart" className="back-to-cart-link">
        Back to Cart
      </Link>
    </div>
  );
}
