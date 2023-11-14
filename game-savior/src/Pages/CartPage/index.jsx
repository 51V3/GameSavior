import React, { useState, useEffect } from "react";
import { Link, useParams, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
import Checkout from "../Checkout/index.jsx";
import { useCart } from "../../Components/CartContext";

export default function Cart() {
  const { cart, dispatch } = useCart() || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ID:", id);
        const response = await axios.get(`/api/matches/${id}`);
        dispatch({ type: "INITIALIZE_CART", payload: response.data });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error.response || error);
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };    

    fetchData();
  }, [id, dispatch]);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cart.map((ticket) =>
      ticket._id === id ? { ...ticket, quantity: newQuantity } : ticket
    );
    dispatch({ type: "UPDATE_CART", payload: updatedCart });
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
