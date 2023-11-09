import { Link } from "react-router-dom";
import "./style.css"
import React from "react";
import { ReactComponent as logo } from "../../assets/Images/GameSavior.svg";
import { ReactComponent as cart } from "../../assets/Images/cart-logo.svg";

export default function NavBar(){
    return(
        <div className="navbar">
        <div className="left-section">
          <Link to="/" className="link">
            <img src={logo} alt="logo" className="logo"/>
          </Link>
        </div>
      
        <div className="links">
          <Link to="/alltickets" className="link">
            All Tickets
          </Link>
        </div>
      
        <div className="right-section">
          <Link to="/cart" className="link">
            <img src={cart} alt="Cart" className="cart-icon"/>
          </Link>
        </div>
      </div>
      
  );
};




