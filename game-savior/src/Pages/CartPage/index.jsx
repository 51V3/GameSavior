import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((ticket) => (
          <li key={ticket._id}>
            <div>
              {ticket.name} - ${25}
              <input
                type="number"
                min="0"
                value={ticket.quantity || 0}
                onChange={(e) =>
                  handleQuantityChange(ticket._id, parseInt(e.target.value))
                }
              />
              Total Price: ${calculateTotalPrice(ticket)}
            </div>
          </li>
        ))}
      </ul>
      <Link to="/checkout" className="link">
        <button>Checkout</button>
      </Link>
    </div>
  );
}
