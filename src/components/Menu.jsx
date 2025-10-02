function Menu() {
    return (
        <>
            <div className="menu-options">
                <p>Usuario: {user}</p>
                <p>Saldo: ARS {saldo}</p>
                <button>Depositar</button>
                <button>Transferir</button>
            </div>
        </>
    );
}
export default Menu;