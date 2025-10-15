import React, { useState } from "react"; 
import { useLocation, useNavigate  } from "react-router-dom";
import useAutoLogout from "./Hook";
import ButtonLogout from "./Buttonlogout";


function Menu() {
    const location = useLocation();
    const navigate = useNavigate();

    // User en estado para poder actualizar balance
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : location.state?.user ?? null;
    });
    
    useAutoLogout(); // uso el hook para auto logout

    const handleDepositClick = () => {
        navigate("/deposit", { state: { user }, replace: true });
    };

    return (
        <>
            <div className="menu-options">
                <h3>Elegir servicio</h3>
                <p>Usuario: {user?.user ?? "Invitado"}</p>
                <p>Saldo: ARS {user?.balance ?? 0}</p>
                <button onClick={handleDepositClick}>Depositar</button>
                <button>Transferir</button>
                <ButtonLogout />
            </div>
        </>
    );
}
export default Menu;