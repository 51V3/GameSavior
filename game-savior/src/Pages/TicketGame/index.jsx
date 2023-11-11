import axios from "axios";

export default function TicketGame() {
  axios.get('/api/matches')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}