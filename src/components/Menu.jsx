import React, { useState } from "react"; 
import { useLocation, useNavigate  } from "react-router-dom";
import useAutoLogout from "./Hook";
import ButtonLogout from "./ButtonLogout";


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
        <div className="menu-options">
            <p>Usuario: {user?.user ?? "Invitado"}</p>
            <p>Saldo: ARS {user?.balance ?? 0}</p>
            <button onClick={handleDepositClick}>Deposito</button>
            <button onClick={handleTrasnferClick}>Transferir</button>
            <button onClick={handleWithdrawClick}>Retiro</button>
            <ButtonLogout />
        </div>
    );
}
export default Menu;