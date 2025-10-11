import { useLocation, useNavigate  } from "react-router-dom";
import useAutoLogout from "./Hook";
import ButtonLogout from "./Buttonlogout";
import Deposit from "./Deposit";

function Menu() {
    const location = useLocation();
    const { user } = location.state || {}; // saco el user que vino del login
    useAutoLogout(); // uso el hook para auto logout
    const handleDeposit = (monto) => {
        // Simular actualización de saldo (o enviar al backend)
        const nuevoSaldo = (user?.saldo ?? 0) + monto;
        const updatedUser = { ...user, saldo: nuevoSaldo };
        setUser(updatedUser);
        alert(`Depósito exitoso: ARS ${monto}`);
        setShowDepositar(false); // cerrar formulario
    };
    return (
        <>
            <div className="menu-options">
                <h2>Mi Billetera</h2>
                <p>Usuario: {user?.user ?? "Invitado"}</p>
                <p>Saldo: ARS {user?.saldo ?? 0}</p>
                <button>Depositar</button>
                <button>Transferir</button>
                <ButtonLogout />
            </div>
        </>
    );
}
export default Menu;