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
    <div>
      <h1>UEFA Champions League Matches</h1>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            <Link to={`/match/${match.id}`}>
              {`${match.homeTeam.name} vs ${match.awayTeam.name}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketGame;
