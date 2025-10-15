function Transfer(){
    return (
        <div className="transfer-container">
            <form onSubmit={handleTransfer}>
                <input
                    type="text"
                    placeholder="Alias o CBU del destinatario"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Monto a transferir"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Enviar</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={() => navigate("/menu", { state: { user } })}>Volver</button>
        </div>
    );
}
export default Transfer;