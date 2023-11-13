import React, { useState, useEffect } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
import Checkout from "../Checkout/index.jsx";
import { useCart } from "../../Components/CartContext";

export default function Cart() {
  const { id } = useParams();
  const { cart, dispatch } = useCart() || {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(`api/matches/${id}`);
          dispatch({ type: "SET_CART", payload: response.data });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, dispatch]);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cart.map((ticket) =>
      ticket._id === id ? { ...ticket, quantity: newQuantity } : ticket
    );
    dispatch({ type: "SET_CART", payload: updatedCart });
  };

  const calculateTotalPrice = (ticket) => {
    return (ticket.quantity || 0) * 25;
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
        {cart.map((ticket) => (
          <li key={ticket._id} className="cart-item">
            <div className="cart-item-details">
              <p className="cart-item-name">{ticket.name}</p>
              <p className="cart-item-price">${25}</p>
              <input
                type="number"
                min="0"
                value={ticket.quantity || 0}
                onChange={(e) =>
                  handleQuantityChange(ticket._id, parseInt(e.target.value))
                }
                className="cart-item-quantity"
              />
              <p className="cart-item-total-price">
                Total Price: ${calculateTotalPrice(ticket)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Outlet />
      {/* 
      <button className="cart-checkout-button">
      <Link
        to={{
          pathname: "/checkout",
          state: { cart: cart }
        }}
        className="checkout-link"
      >
        <Checkout />
       Go to Checkout </Link>
      </button>
      */}
    </div>
  );
}