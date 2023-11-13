import { Link } from "react-router-dom";
import "./style.css";
import React from "react";
import logo from "../../assets/Images/GameSavior.png";
import cart from "../../assets/Images/cart-logo.png";

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="left-section">
        <Link to="/" className="link">
            <img src={logo} alt="Logo" className="logo" />        </Link>
      </div>

      <div className="right-section">
        <Link to="/cart" className="link">
          <img src={cart} alt="Cart" className="cart-icon" />
        </Link>
      </div>
    </div>
  );
}
