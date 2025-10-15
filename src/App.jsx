import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Menu from "./components/Menu";
import Deposit from "./components/Deposit";
import Transfer from "./components/Transfer";
import './Style.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/*Page Login*/}
        <Route path="/" element={<Login />} />
        {/*Page Register*/}
        <Route path="/register" element={<Register />} />
        {/*Page Menu*/}
        <Route path="/menu" element={<Menu />} />
        {/*Page Deposit*/}
        <Route path="/deposit" element={<Deposit />} />
        {/*Page Transfer*/}
        <Route path="/transfer" element={<Transfer />} />
      </Routes>
    </HashRouter>
  )
}

export default App;