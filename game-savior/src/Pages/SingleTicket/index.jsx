import "./index.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../Components/CartContext";

export default function SingleTicket() {
  const [match, setMatch] = useState(null);
  const { id } = useParams();
  const [formattedDate, setFormattedDate] = useState('');
  const [ticketCount, setTicketCount] = useState(1);

  const { cart, dispatch } = useCart() || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/matches`);
        // Find the match with the specified id
        const selectedMatch = response.data.matches.find((m) => m.id === parseInt(id));
        setMatch(selectedMatch);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);
  
  useEffect(() => {
    if (match && match.utcDate) {
      const dateObject = new Date(match.utcDate);
      const formattedDate = `${(dateObject.getUTCDate()).toString().padStart(2, '0')}/${(dateObject.getUTCMonth() + 1).toString().padStart(2, '0')}/${dateObject.getUTCFullYear()} ${dateObject.getUTCHours().toString().padStart(2, '0')}:${dateObject.getUTCMinutes().toString().padStart(2, '0')}`;
      setFormattedDate(formattedDate);
    }
  }, [match]);

  const handleIncrement = () => {
    setTicketCount(ticketCount + 1);
  };

  const handleDecrement = () => {
    if (ticketCount > 0) {
      setTicketCount(ticketCount - 1);
    }
  };

  // Function to handle adding tickets to the cart
  const handleAddToCart = () => {
    const ticket = {
      _id: match.id, // or use a unique identifier for the ticket
      name: `${match.homeTeam.name} vs ${match.awayTeam.name} - ${formattedDate}`,
      quantity: ticketCount,
    };

    // Dispatch an action to add the ticket to the cart
    dispatch({ type: "ADD_TO_CART", payload: ticket });
  };

  console.log(ticketCount)


  return (
    <div>
      <h2 className="page-title">Game Details</h2>
      {match !== null ? (
        <div className="competition">
          <div className="competition-details">
            <img className="country-flag" src={match.area.flag} alt="Country Flag" />
            <p>{match.area.name}: {match.competition.name}</p>
          </div>
          <div className="date-container">
            <p className="date-game">{formattedDate}</p>
          </div>
          <div className="game-details">
            <div className="team-container">
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
          </div>
          <div className="ticket-container">
            <p>Tickets: {ticketCount}</p>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <div className="add-button" >
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Match not found or has ended.</p>
      )}
    </div>
  );
}
