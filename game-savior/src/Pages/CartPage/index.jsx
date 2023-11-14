import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
import { useCart } from "../../Components/CartContext";
import TicketJSON from "../../assets/Ticket.json";

export default function Cart() {
  const { cart, dispatch } = useCart() || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem(TicketJSON)) || [];
        dispatch({ type: "SET_CART", payload: storedCart });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);

        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = cart.map((ticket, i) =>
      i === index ? { ...ticket, quantity: newQuantity } : ticket
    );
    dispatch({ type: "SET_CART", payload: updatedCart });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, ticket) => total + (ticket.quantity ?? 0) * 25, 0);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <ul className="cart-items">
        {cart.map((ticket, index) => (
          <li key={index} className="cart-item">
            <div className="cart-item-details">
              <p className="cart-item-name">{`${ticket.homeTeam} vs ${ticket.awayTeam} - ${ticket.formattedDate}`}</p>
              <p className="cart-item-price">${25}</p>
              <input
                type="number"
                min="0"
                value={ticket.quantity || 0}
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                className="cart-item-quantity"
              />
              <p className="cart-item-total-price">
                Total Price: ${calculateTotalPrice(ticket)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Link
        to={{
          pathname: "/checkout",
          state: { cart: cart }
        }}
        className="checkout-link"
      >
        <button className="cart-checkout-button">
          Go to Checkout
        </button>
      </Link>
    </div>
  );
}
