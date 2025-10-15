import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Deposit() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [amount, setAmount] = useState("");

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
        body: JSON.stringify({ user: user.user, amount: number }),
      });
      const data = await res.json();

      if (res.ok) {
        alert(`Depósito completado: ARS ${number}`);
        navigate("/menu", { state: { user: { ...user, balance: data.balance } } });
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectarse al servidor");
    }

    setAmount("");
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
      <button onClick={() => navigate("/menu")}>Volver</button>
    </div>
  );
}

export default Deposit;