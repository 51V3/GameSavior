import { Link } from "react-router-dom";
import "./style.css";
import React from "react";
import logo from "../../assets/Images/GameSavior.png";
import cartImage from "../../assets/Images/cart-logo.png";
import { useCart } from "../../Components/CartContext";

export default function NavBar() {
  const { cart } = useCart() || {};

  const totalTickets = cart.reduce((total, ticket) => total + ticket.quantity, 0);

  return (
    <div className="navbar">
      <div className="left-section">
        <Link to="/" className="link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <div className="right-section">
        <Link to="/cart" className="link">
          <img src={cartImage} alt="Cart" className="cart-icon" />
          {totalTickets > 0 && <span className="cart-badge">{totalTickets}</span>}
        </Link>
      </div>
    </div>
  );
}
