import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar'


function App() {
  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      {/*<Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/:gameId"} element={<DisplayGame />} />
        <Route path={"/"} element={<Ticket />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/"} element={<Checkout />} />
      </Routes>*/}
    </div>
  )
}

export default App
