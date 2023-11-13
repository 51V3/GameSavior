import "./index.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleTicket() {
  const [match, setMatch] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/matches/${id}`) 
      .then((response) => {
        setMatch(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      <h2 className="page-title">Game Details</h2>
      {match && (
        <div className="competition">
          <div className="competition-details">
            <img className="country-flag" src={match.area.flag} /><p>{match.area.name}: {match.competition.name}</p>
          </div>
          <div className="game-details">
              <div className="date-container">
                <p className="date-game">{match.utcDate}</p>
              </div>
            <div className="team-container">
              <div className="team-details">
                <img className="team-flag" src={match.homeTeam.crest} />
                <p>{match.homeTeam.name}</p>
              </div>
              <div>
                <p><b>-</b></p>
              </div>
              <div className="team-details">
                <img className="team-flag" src={match.awayTeam.crest} />
                <p>{match.awayTeam.name}</p>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
