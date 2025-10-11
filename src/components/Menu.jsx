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
    const handleDeposit = (newBalance) => {
        const updatedUser = { ...user, balance: newBalance };
        setUser(updatedUser);
        setShowDeposit(false); // Cierra el formulario
    };
    return (
        <>
            <div className="menu-options">
                <h2>Mi Billetera</h2>
                <p>Usuario: {user?.user ?? "Invitado"}</p>
                <p>Saldo: ARS {user?.balance ?? 0}</p>
                <button onClick={() => setShowDeposit(true)}>Depositar</button>
                <button>Transferir</button>
                <ButtonLogout />
                {showDeposit && <Deposit user={user} onDeposit={handleDeposit} />}
            </div>
        </>
    );
}
export default Menu;