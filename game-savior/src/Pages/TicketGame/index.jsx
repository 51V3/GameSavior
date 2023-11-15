import "./index.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TicketGame = () => {
  const [matches, setMatches] = useState([]);

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
        <h1>TICKETS</h1>
      </div>
      <div>
        {matches.map((match) => (
        <div className="match-container" key={match.id}>
          <div>
            <img src={match.competition.emblem} />
          </div>

          <div className="competition-section">
            <p>{match.competition.name}</p>
            <h3>{match.utcDate}</h3>
          </div>

          <div className="team-section">
            <div className="team-details">
              <img className="team-flag" src={match.homeTeam.crest} alt="Home Team Crest" />
              <p>{match.homeTeam.name}</p>
            </div>
            <div>
              <p> vs </p>
            </div>
            <div className="team-details">
              <img className="team-flag" src={match.awayTeam.crest} alt="Away Team Crest" />
              <p>{match.awayTeam.name}</p>
            </div>
          </div>

          <div className="button-section">
            <button>
              Buy
            </button>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default TicketGame;
