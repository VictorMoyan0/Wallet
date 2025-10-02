import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registrar from "./components/Registrar";
import './Style.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Raíz = Login */}
        <Route path="/" element={<Login />} />

        {/* Página de registro */}
        <Route path="/registrar" element={<Registrar />} />
        {/* Página de menú (después del login) */}
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;