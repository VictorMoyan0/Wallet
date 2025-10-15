import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Transfer(){
    
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user ?? JSON.parse(localStorage.getItem("user"));
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
             const res = await fetch("http://localhost:3001/transfer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fromUser: user.user,
                to,
                amount: parseFloat(amount),
            }),
        });
      const data = await res.json();
      if (!res.ok) {
            setMessage(data.error || "Error en la transferencia");
            return;
        }

      // Actualizar saldo local
      const updatedUser = { ...user, balance: data.nuevoSaldo };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage(data.message);
      setAmount("");
      setTo("");
      // Redirigir al menú después de unos segundos
      setTimeout(() => navigate("/menu", { state: { user: updatedUser } }), 2000);
        }catch (error) {
            console.error(error);
            setMessage("Error al conectar con el servidor");
        }
    };
    return (
        <div className="transfer-container">
            <form onSubmit={handleTransfer}>
                <input
                    type="text"
                    placeholder="Alias o CBU del destinatario"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Monto a transferir"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Enviar</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={() => navigate("/menu", { state: { user } })}>Volver</button>
        </div>
    );
}
export default Transfer;