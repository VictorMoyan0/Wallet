import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form action="#" method="#">
                <input type="text" name="user" placeholder="Usuario"/>
                <input type="password" name="passwd" placeholder="Contraseña"/>
                <button type="submit">Enviar</button>
            </form>
            <button className="btn-register" onClick={() => navigate("/registrar")}>Registrarse</button>
        </div>
    );
}
export default Login;