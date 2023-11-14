import "./index.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../Components/CartContext";

export default function SingleTicket() {
  const [matches, setMatches] = useState(null);
  const { id } = useParams();
  const [formattedDate, setFormattedDate] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const { cart, dispatch } = useCart() || {};
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/matches`);
        const selectedMatch = response.data.matches.find((m) => m.id === parseInt(id));
        setMatches(selectedMatch);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (matches && matches.utcDate) {
      const dateObject = new Date(matches.utcDate);
      const formattedDate = `${(dateObject.getUTCDate()).toString().padStart(2, '0')}/${(dateObject.getUTCMonth() + 1).toString().padStart(2, '0')}/${dateObject.getUTCFullYear()} ${dateObject.getUTCHours().toString().padStart(2, '0')}:${dateObject.getUTCMinutes().toString().padStart(2, '0')}`;
      setFormattedDate(formattedDate);
    }
  }, [matches]);

  const handleIncrement = () => {
    setTicketCount(ticketCount + 1);
  };

  const handleDecrement = () => {
    if (ticketCount > 0) {
      setTicketCount(ticketCount - 1);
    }
  };

  const handleAddToCart = async () => {
    const ticket = {
      homeTeam: matches.homeTeam.name,
      awayTeam: matches.awayTeam.name,
      formattedDate: formattedDate,
      quantity: ticketCount,
    };

    try {
      // Send a POST request to the server
      await axios.post('http://localhost:5005/ticket', ticket);

      // Update state to show the "Added to Cart" message
      setIsAddedToCart(true);

      // Optionally, you can navigate the user or perform other actions upon successful submission
      // navigate('/success'); // Replace '/success' with the desired route
    } catch (error) {
      console.error("Error posting ticket:", error);
    }
  }
  

  return (
    <div>
      <h2 className="page-title">Game Details</h2>
      {matches !== null ? (
        <div className="competition">
          <div className="competition-details">
            <img className="country-flag" src={matches.area.flag} alt="Country Flag" />
            <p>{matches.area.name}: {matches.competition.name}</p>
          </div>
          <div className="date-container">
            <p className="date-game">{formattedDate}</p>
          </div>
          <div className="game-details">
            <div className="team-container">
              <div className="team-details">
                <img className="team-flag" src={matches.homeTeam.crest} alt="Home Team Crest" />
                <p>{matches.homeTeam.name}</p>
              </div>
              <div>
                <p> vs </p>
              </div>
              <div className="team-details">
                <img className="team-flag" src={matches.awayTeam.crest} alt="Away Team Crest" />
                <p>{matches.awayTeam.name}</p>
              </div>
            </div>
          </div>
          <div className="ticket-container">
            <p>Tickets: {ticketCount}</p>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <div className="add-button">
              <button onClick={handleAddToCart}>Add to Cart</button>
              {isAddedToCart && <p>Tickets added to cart!</p>}
            </div>
          </div>
          <div className="match-link">
              <Link to={"/match"}>
              Go to Matches
              </Link>
          </div>
        </div>
      ) : (
        <p>Match not found or has ended.</p>
      )}
    </div>
  );
}
