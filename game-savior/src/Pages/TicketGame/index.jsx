import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TicketGame() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get('/api/matches')
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);  

  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            <Link to={`/match/${match.id}`}>
              
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
