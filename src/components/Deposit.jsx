import { useState } from "react";

function Deposit({user, onDeposit }) {
  const [amount, setAmount] = useState("");
  // Controla el input, permite solo números y un punto decimal
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const number = parseFloat(amount);
    if (isNaN(number) || number <= 0) {
      alert("Ingrese un monto válido");
      return;
    }
  try {
    const res = await fetch("http://localhost:3001/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.user, amount: number })
    });
    const data = await res.json();
    if (res.ok) {
      onDeposit(data.balance); // actualiza el balance en Menu.jsx
      alert(`Depósito completado: ARS ${data.balance}`);
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Error al conectarse al servidor");
  }
  setAmount(""); // limpia el input
};

  return (
    <div className="depositar-container">
      <h3>Depositar dinero</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={amount}
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