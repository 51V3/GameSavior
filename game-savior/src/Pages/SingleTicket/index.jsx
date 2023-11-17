import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../Components/CartContext";

export default function SingleTicket() {
  const [matches, setMatches] = useState(null);
  const { id } = useParams();
  const [formattedDate, setFormattedDate] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
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
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
    else if (ticketCount <= 1) {
      setTicketCount(ticketCount)
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
      await axios.post('https://game-savior-backend.onrender.com/ticket', ticket);
      setIsAddedToCart(true);

    } catch (error) {
      console.error("Error posting ticket:", error);
    }
  }
  
  return (
    <div className="page-container">
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
            <button onClick={handleDecrement}>-</button>
            <button onClick={handleIncrement}>+</button>
            <div className="add-button">
              <button onClick={handleAddToCart}>Add to Cart</button>
              {isAddedToCart && <p>Tickets added to cart!</p>}
            </div>
          </div>
          <div className="match-link">
              <Link to={"/match"}>
                <button className="back-button">
                  Back
                </button>
              </Link>
          </div>
        </div>
      ) : (
        <p>Match not found or has ended.</p>
      )}
    </div>
  );
}
