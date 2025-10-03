import { useLocation } from "react-router-dom";
function Menu() {
    const location = useLocation();
    const { user } = location.state || {}; // saco el user que vino del login
    return (
        <>
            <div className="menu-options">
                <h2>Mi Billetera</h2>
                <p>Usuario: {user}</p>
                <p>Saldo: ARS {saldo}</p>
                <button>Depositar</button>
                <button>Transferir</button>
            </div>
        </>
    );
}
export default Menu;