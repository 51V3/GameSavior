import "./style.css";
import React from "react";
import { Link } from "react-router-dom";
import footballImg from "../../assets/Images/football-background.png";
import basketImg from "../../assets/Images/basket-background.png";

export default function HomePage(){
    return(
        <div className="home-page">
            <div className="sports-container">
                <div className="football-container">
                    <Link to={"/game"}>
                        <div className="image-container">
                            <img src={footballImg} />
                        </div>
                        <p>Football</p>
                    </Link>
                </div>
                <div className="basketball-container">
                    <Link to={"/coming-soon"}>
                        <div className="image-container">
                            <img src={basketImg} />
                        </div>
                        <p>Basketball</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}