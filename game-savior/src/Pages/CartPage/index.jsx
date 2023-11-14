import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
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
        const response = await axios.get('http://localhost:5005/ticket');
        console.log("Response from backend:", response.data);  // Log the response
        dispatch({ type: "SET_CART", payload: response.data });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleQuantityChange = async (index, newQuantity) => {
    try {
      // Send the update request
      await axios.patch(`http://localhost:5005/ticket/${cart[index].id}`, {
        quantity: newQuantity,
      });
  
      // Update the local state with the new quantity
      const updatedCart = cart.map((ticket, i) =>
        i === index ? { ...ticket, quantity: newQuantity } : ticket
      );
      dispatch({ type: "SET_CART", payload: updatedCart });
    } catch (error) {
      console.error("Error updating quantity:", error);
      console.error("Axios error details:", error.response); // Log the Axios error details
    }
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

  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:5005/ticket/${cart[index].id}`);
      const updatedCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
      dispatch({ type: "SET_CART", payload: updatedCart });
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle error scenarios here, e.g., show an error message to the user
    }
  };

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

  const handleCheckout = () => {
    // Navigate to the checkout page with the total price in the state
    navigate("/checkout", { state: { cart: cart, totalPrice: calculateTotalPrice() } });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <ul className="cart-items">
        {cart.map((ticket, index) => (
          <li key={index} className="cart-item">
            <div className="cart-item-details">
              <p className="cart-item-name">{`${ticket.homeTeam} vs ${ticket.awayTeam} - ${ticket.formattedDate}`}</p>
              <input
                type="number"
                min="0"
                value={ticket.quantity || 0}
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                className="cart-item-quantity"
              />
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-section">
        <p className="total-text">Total:</p>
        <p className="total-amount">${calculateTotalPrice()}</p>
        <button onClick={handleDeleteAll}>Delete All</button>
      </div>
      <button className="cart-checkout-button" onClick={handleCheckout}>
        Go to Checkout
      </button>
    </div>
  );
}
