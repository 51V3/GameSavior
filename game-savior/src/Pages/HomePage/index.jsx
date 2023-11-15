import "./style.css";
import React from "react";
import { Link } from "react-router-dom";
import footballImg from "../../assets/Images/football-background.png";
import basketImg from "../../assets/Images/basket-background.png";
import mainImg from "../../assets/Images/cr7home.png"

export default function HomePage(){
    return(
        <div className="home-page">
            <div className="main-photo">
                <img src={mainImg} alt="main-photo" />
                <h1>Live for the Moment</h1>
                <p>Your next unforgettable night awaits, <br/>
                and we've got the tickets.</p>
            </div>
            <div className="sports-container">
                <div className="football-container">
                    <Link to={"/match"}> 
                        <div className="image-container">
                            <img src={footballImg} />
                            <p className="text-overlay">Football</p>
                        </div>
                    </Link>
                </div>
                <div className="basketball-container">
                    <Link to={"/coming-soon"}>
                        <div className="image-container">
                            <img src={basketImg} />
                            <p className="text-overlay">Basketball</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}