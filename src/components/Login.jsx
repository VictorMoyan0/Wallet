import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que se recargue la página
    const user = e.target.user.value;
    const passwd = e.target.passwd.value;

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, passwd }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data)); // guarda usuario
        navigate("/menu", { state: { user: data } });
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectarse al servidor");
    }
  };
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="user" placeholder="Usuario"/>
                <input type="password" name="passwd" placeholder="Contraseña"/>
                <button type="submit">Entrar</button>
            </form>
            <button className="btn-register" onClick={() => navigate("/register")}>Registrarse</button>
        </div>
    );
}
export default Login;