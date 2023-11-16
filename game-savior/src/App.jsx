import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar'
import HomePage from './Pages/HomePage'
import Checkout from './Pages/Checkout'
import TicketGame from './Pages/TicketGame'
import Cart from './Pages/CartPage'
import SingleTicket from './Pages/SingleTicket'
import OrderPage from './Pages/OrderPage'
import ComingSoonPage from './Pages/ComingSoonPage'


function App() {
  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/match"} element={<TicketGame />} />
        <Route path={"/match/:id"} element={<SingleTicket />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/checkout"} element={<Checkout />} />
        <Route path={"/orderplaced"} element={<OrderPage />} />
        <Route path={"/coming-soon"} element={<ComingSoonPage />} />
      </Routes>
    </div>
  )
}

export default App;