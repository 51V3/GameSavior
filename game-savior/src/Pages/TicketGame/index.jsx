import "./index.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TicketGame = () => {
  const [matches, setMatches] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedHour, setFormattedHour] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/matches");
        console.log("API Response:", response.data);
        setMatches(response.data.matches);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="ticket-game">
      <div className="competition-page">
        <h2>Tickets</h2>
      </div>
      <div>
        {matches.map((match) => (
        
        <div className="match-container" key={match.id}>
          <div>
            <img className="team-flag" src={match.competition.emblem} />
          </div>

          <div className="competition-section">
            <p>{match.competition.name}</p>
            <h3>{formattedDate}</h3>
          </div>

          <div className="team-section">
            <div className="team-details">
              <img className="team-flag" src={match.homeTeam.crest} alt="Home Team Crest" />
              <p>{match.homeTeam.name}</p>
            </div>
            <div>
              <p> {formattedHour} </p>
            </div>
            <div className="team-details">
              <img className="team-flag" src={match.awayTeam.crest} alt="Away Team Crest" />
              <p>{match.awayTeam.name}</p>
            </div>
          </div>

          <div className="buy-section">
            <Link to={`/match/${match.id}`}>
              <p>BUY</p>
            </Link>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default TicketGame;
