import { Link } from "react-router-dom";
import Style from "./style.css"
import React from "react";
import Logo from "../assets/Images/GameSavior.png"
import cart from "../assets/Images/output-onlinepngtools.png"

export default function Navbar(){
    return(
        <div className="navbar">
        <div className="left-section">
          <Link to="/" className="link">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
      
        <div className="links">
          <Link to="/alltickets" className="link">
            All Tickets
          </Link>
        </div>
      
        <div className="right-section">
          <Link to="/cart" className="link">
            <img src={cart} alt="Cart" />
          </Link>
        </div>
      </div>
      
  );
};




