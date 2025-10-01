function Login() {
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form action="#" method="#">
                <input type="text" name="user" placeholder="Usuario"/>
                <input type="password" name="passwd" placeholder="Contraseña"/>
                <button type="submit">Enviar</button>
            </form>
            <button className="btn-register" onClick={() => navigate('./Registrar.jsx')}>Registrarse</button>
        </div>
    );
}
export default Login;