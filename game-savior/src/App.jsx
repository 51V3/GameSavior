import './App.css'
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/:gameId"} element={<DisplayGame />} />
        <Route path={"/"} element={<Ticket />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/"} element={<Checkout />} />
      </Routes>
    </div>
  )
}

export default App
