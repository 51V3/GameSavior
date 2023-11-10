import "./style.css";
import React from "react";
import { Link } from "react-router-dom";
import footballImg from "../../assets/Images/football-background.png";
import basketImg from "../../assets/Images/basket-background.png";

export default function HomePage(){
    return(
        <div className="home-page">
            <div className="sports-container">
                <div className="btn-container">
                    <Link to={"/game"}>
                        <img src={footballImg} />
                        <p>Football</p>
                    </Link>
                </div>
                <div className="btn-container">
                    <Link to={"/coming-soon"}>
                        <img src={basketImg} />
                        <p>Basketball</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}