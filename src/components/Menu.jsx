function Menu() {
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