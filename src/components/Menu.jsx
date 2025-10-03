import { useLocation } from "react-router-dom";
import useAutoLogout from "./Hook";
function Menu() {
    const location = useLocation();
    const { user } = location.state || {}; // saco el user que vino del login
    useAutoLogout(2 * 60 * 1000); // 2 minutos de inactividad
    return (
        <>
            <div className="menu-options">
                <h2>Mi Billetera</h2>
                <p>Usuario: {user?.username ?? "Invitado"}</p>
                <p>Saldo: ARS {user?.saldo ?? 0}</p>
                <button>Depositar</button>
                <button>Transferir</button>
                <button>Cerrar Sesión</button>
            </div>
        </>
    );
}
export default Menu;