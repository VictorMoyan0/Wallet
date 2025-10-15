import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function Withdraw() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const handleWithdraw = async () => {
        if (!amount || isNaN(amount)) {
        setMessage("Ingrese un monto válido.");
        return;
    }
    try {
      const res = await fetch("http://localhost:3001/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user.user, amount }),
      });
      const data = await res.json();
      if (!res.ok) {
            setMessage(data.error);
            return;
        }

      setMessage(`Retiro exitoso. Nuevo saldo: ARS ${data.balance}`);
      localStorage.setItem("user", JSON.stringify({ ...user, balance: data.balance }));
      setTimeout(() => navigate("/menu", { state: { user: { ...user, balance: data.balance } } }), 1500);
    } catch (err) {
        setMessage("Error al conectar con el servidor.");
    }
    };
    return (
        <div className="withdraw-container">
            <input
                type="number"
                placeholder="Monto a retirar"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleWithdraw}>Retirar</button>
            <p>{message}</p>
        </div>
    );
}

export default Withdraw;