import React, { useState } from "react"; 
import { useLocation, useNavigate  } from "react-router-dom";
import useAutoLogout from "./Hook";
import ButtonLogout from "./Buttonlogout";
import Deposit from "./Deposit";

function Menu() {
    const location = useLocation();
    // User en estado para poder actualizar balance
    const [user, setUser] = useState(location.state?.user ?? null);
    const [showDeposit, setShowDeposit] = useState(false); // controla el formulario
    useAutoLogout(); // uso el hook para auto logout
    const handleDeposit = (amount) => {
        const newBalance = (user?.balance ?? 0) + amount;
        const updatedUser = { ...user, balance: newBalance };
        setUser(updatedUser);
        alert(`Deposit successful: ARS ${amount}`);
        setShowDeposit(false); // cerrar formulario
    };
    return (
        <>
            <div className="menu-options">
                <h2>Mi Billetera</h2>
                <p>Usuario: {user?.user ?? "Invitado"}</p>
                <p>balance: ARS {user?.balance ?? 0}</p>
                <button onClick={() => setShowDeposit(true)}>Deposit</button>
                <button>Transferir</button>
                <ButtonLogout />
                {showDeposit && <Deposit onDeposit={handleDeposit} />}
            </div>
        </>
    );
}
export default Menu;