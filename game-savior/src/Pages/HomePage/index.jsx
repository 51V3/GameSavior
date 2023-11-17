import "./style.css";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import footballImg from "../../assets/Images/football-background.png";
import basketImg from "../../assets/Images/basket-background.png";
import mainImg from "../../assets/Images/cr7home.png"

export default function HomePage(){
    const [nextGame, setNextGame] = useState(null);
    const [formattedDate, setFormattedDate] = useState("");
    const [formattedHour, setFormattedHour] = useState("");

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/matches");
        const data = await response.json();
  
        const now = new Date().toISOString();
        const nextGameFound = data.matches.find(
          (match) => match.status !== "FINISHED" && match.utcDate > now
        );
  
        if (nextGameFound) {
          const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
          const formattedDate = new Date(nextGameFound.utcDate).toLocaleDateString("en-GB", dateOptions);
  
          const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
          const formattedHour = new Date(nextGameFound.utcDate).toLocaleTimeString("en-GB", timeOptions);
  
          setFormattedDate(formattedDate);
          setFormattedHour(formattedHour);
          setNextGame(nextGameFound);
        } else {
          setNextGame(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  


    return(
        <div className="home-page">
            <div className="main-photo">
                <img src={mainImg} alt="main-photo" />
                <h1>Live for the Moment</h1>
                <p>Your next unforgettable night awaits, <br/>
                and we've got the tickets.</p>
            </div>
            <div className="next-game-container">
                <div className="events-title">
                    <h2>Next Game</h2>
                </div>
                <div className="game-container">
                    {nextGame ? (
                    <div className="team-section">
                        <div>
                            <img className="competition-flag" src={nextGame.competition.emblem} />
                        </div>
                        <div className="competition-section">
                            <p>{nextGame.competition.name}</p>
                            <p>{formattedDate}</p>
                        </div>
                        <div className="team-details">
                            <img className="team-flag" src={nextGame.homeTeam.crest} alt="Home Team Crest" />
                            <p>{nextGame.homeTeam.name}</p>
                        </div>
                        <div>
                            <p>{formattedHour}</p>
                        </div>
                        <div className="team-details">
                            <img className="team-flag" src={nextGame.awayTeam.crest} alt="Away Team Crest" />
                            <p>{nextGame.awayTeam.name}</p>
                        </div>
                    
                    </div>
                    ) : (
                    <p>No upcoming games</p>
                    )}
                </div>
            </div>
            <div className="sports-container">
                <div className="container-title">
                    <h2>Sports Events</h2>
                </div>
                <div className="each-sport-container">
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
        </div>
    )
};