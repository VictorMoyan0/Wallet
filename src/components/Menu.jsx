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

    const handleTrasnferClick =() => {
        navigate("/transfer");
    }

    const handleWithdrawClick = () => {
        navigate("/withdraw", { state: { user } });
    };


    return (
    <div className="menu-container">
        <div className="menu-options">
            <div className="user-info-block">
                <p className="user-name">Usuario: {user?.user ?? "Invitado"}</p>
                <p className="user-balance">Saldo: ARS {user?.balance ?? 0}</p>
            </div>
            <button className="menu-button" onClick={handleDepositClick}>Deposito</button>
            <button className="menu-button" onClick={handleTransferClick}>Transferir</button>
            <button className="menu-button" onClick={handleWithdrawClick}>Retiro</button>
            <button className="menu-button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    </div>
    );
}
export default Menu;