import { useNavigate } from "react-router-dom";

function Registrar() {
    const navigate = useNavigate();
    return (
        <div className="register-container">
            <h2>Registrarse</h2>
            <form action="#" method="#">
                <input type="text" name="user" placeholder="Usuario"/>
                <input type="password" name="passwd" placeholder="Contraseña"/>
                <button type="submit">Enviar</button>
            </form>
             <button onClick={() => navigate("/")}>Volver</button>
        </div>
    );
}
export default Registrar;