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
      <h2>Game Details</h2>
      {match && (
        <div>
          <div className="competition-details">
            
          </div>
          <div className="game-details">
          </div>
          <p>Game ID: {match.id}</p>
          <p>Team 1: {match.homeTeam.name}</p>
          <p>Team 2: {match.awayTeam.name}</p>
          
        </div>
      )}
    </div>
  );
}
