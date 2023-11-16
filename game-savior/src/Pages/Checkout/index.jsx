import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { useCart } from "../../Components/CartContext";

const Checkout = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const totalPrice = location.state?.totalPrice || 0;
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");

const handleDeleteAll = async (e) => {
  e.preventDefault();

  try {
    if (!name || !email || !cellphone) {
      alert("Please fill in all required fields: Name, Email, and Phone Number");
      return;
    }

    // Create a PDF document
    const pdf = new jsPDF();
    pdf.text('Game Details:', 10, 10);
    // Add more text or content to the PDF as needed

    // Convert PDF to base64
    const pdfBase64 = pdf.output('datauristring').split(',')[1];

    // Send confirmation email with PDF attachment
    const emailResponse = await fetch("/.netlify/functions/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: "Your Tickets!",
        attachments: [
          {
            content: pdfBase64,
            filename: 'ticket.pdf',
            type: 'application/pdf',
            disposition: 'attachment',
            encoding: 'base64',
          },
        ],
        html: `<p>Thank you for your order! Here are your tickets.</p><p>See attached PDF for game details.</p>`,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error(`Email request failed with status: ${emailResponse.status}`);
    }

    // Clear cart and navigate to order placed page
    dispatch({ type: "SET_CART", payload: [] });
    navigate("/orderplaced");
  } catch (error) {
    console.error("Error handling order:", error);
  }
};

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <ul className="checkout-items">
        {cart.map((ticket, index) => (
          <li key={index} className="checkout-item">
            <div className="item-details">
              <p className="item-name">{`${ticket.homeTeam} vs ${ticket.awayTeam} - ${ticket.formattedDate}`}</p>
              <p className="item-quantity">Quantity: {ticket.quantity}</p>
              <p className="item-total-price">
                Total Price: ${(ticket.quantity || 0) * 25}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="customer-info">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="cellphone">Phone Number:</label>
        <input
          type="tel"
          id="cellphone"
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
        />
      </div>
      <div className="total-section">
        <p className="total-text">Total:</p>
        <p className="total-amount">${totalPrice}</p>
      </div>
      <div className="button-container">
        <button className="place-order-button" onClick={handleDeleteAll}>
          Place Order
        </button>
        <Link to="/cart" className="back-to-cart-link">
          <button className="back-to-cart-button">
            Back to Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
