import { useState } from "react";

function Deposit({ onDepositar }) {
  const [monto, setMonto] = useState("");
  // Controla el input, permite solo números y un punto decimal
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setMonto(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const numero = parseFloat(monto);
    if (isNaN(numero) || numero <= 0) {
      alert("Ingrese un monto válido");
      return;
    }
    onDepositar(numero); // llama a la función de Menu.jsx
    setMonto("");        // limpia el input
  };
  return (
    <div className="depositar-container">
      <h3>Depositar dinero</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={monto}
          onChange={handleChange}
          placeholder="Ingrese monto"
          inputMode="decimal"
        />
        <button type="submit">Depositar</button>
      </form>
    </div>
  );
}
export default Deposit;