import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Transfer(){
    
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user ?? JSON.parse(localStorage.getItem("user"));
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

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