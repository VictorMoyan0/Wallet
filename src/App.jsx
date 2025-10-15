import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Menu from "./components/Menu";
import Deposit from "./components/Deposit";
import Deposit from "./components/Deposit";
import './Style.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Raíz = Login */}
        <Route path="/" element={<Login />} />
        {/* Página de registro */}
        <Route path="/register" element={<Register />} />
        {/* Página de menú (después del login) */}
        <Route path="/menu" element={<Menu />} />
        {/* Página de depósito */}
        <Route path="/deposit" element={<Deposit />} />
      </Routes>
    </HashRouter>
  )
}

export default App;