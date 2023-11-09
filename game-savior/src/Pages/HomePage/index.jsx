import "./style.css";
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage(){
    return(
        <div className="home-page">
            <div className="sports-container">
                <div className="btn-container">
                    <Link to={"/game"}>
                        <img src={""} />
                        <p>Football</p>
                    </Link>
                </div>
                <div className="btn-container">
                    <Link to={"/coming-soon"}>
                        <img src={""} />
                        <p>Basketball</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}