import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registrar from "./components/Register";
import Menu from "./components/Menu";
import './Style.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Raíz = Login */}
        <Route path="/" element={<Login />} />
        {/* Página de registro */}
        <Route path="/registrar" element={<Registrar />} />
        {/* Página de menú (después del login) */}
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </HashRouter>
  )
}

export default App;