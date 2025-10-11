import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
    e.preventDefault(); // evita recargar la página
    const user = e.target.user.value;
    const passwd = e.target.passwd.value;
    try {
      const res = await fetch("http://localhost:3001/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, passwd }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.mensaje);
        navigate("/"); // redirige al login después de registrar
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectarse al servidor");
    }
  };
    return (
        <div className="register-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="user" placeholder="Usuario"/>
                <input type="password" name="passwd" placeholder="Contraseña"/>
                <button type="submit">Enviar</button>
            </form>
             <button onClick={() => navigate("/")}>Volver</button>
        </div>
    );
}
export default Register;