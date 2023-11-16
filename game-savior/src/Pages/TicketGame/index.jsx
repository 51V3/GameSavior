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

  useEffect(() => {
    if (matches.length > 0) {
      const formattedDatesArray = matches.map((match) => {
        const dateObject = new Date(match.utcDate);
        return `${(dateObject.getUTCDate()).toString().padStart(2, '0')}/${(dateObject.getUTCMonth() + 1).toString().padStart(2, '0')}/${dateObject.getUTCFullYear()}`;
      });
      setFormattedDate(formattedDatesArray);
      const formattedHourArray = matches.map((match) => {
        const hourObject = new Date(match.utcDate);
        return `${hourObject.getUTCHours().toString().padStart(2, '0')}:${hourObject.getUTCMinutes().toString().padStart(2, '0')}`;
      });
      setFormattedHour(formattedHourArray);
    }
  }, [matches]);


  return (
    <div className="ticket-game">
      <div className="competition-page">
        <h2>Tickets</h2>
      </div>
      <div>
        {matches.map((match, index) => (
        
        <div className="match-container" key={match.id}>
          <div>
            <img className="competition-flag" src={match.competition.emblem} />
          </div>

          <div className="competition-section">
            <p>{match.competition.name}</p>
            <p>{formattedDate[index]}</p>
          </div>

          <div className="team-section">
            <div className="team-details">
              <img className="team-flag" src={match.homeTeam.crest} alt="Home Team Crest" />
              <p>{match.homeTeam.name}</p>
            </div>
            <div>
              <p>{formattedHour[index]}</p>
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
