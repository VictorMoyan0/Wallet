import { useLocation, useNavigate  } from "react-router-dom";
import useAutoLogout from "./Hook";
import ButtonLogout from "./Buttonlogout";
function Menu() {
    const location = useLocation();
    const { user } = location.state || {}; // saco el user que vino del login
    useAutoLogout(); // uso el hook para auto logout
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