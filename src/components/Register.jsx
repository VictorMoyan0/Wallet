import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
    e.preventDefault(); // evita recargar la página
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const passwd = e.target.passwd.value;
    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, passwd }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Usuario: ${data.user}\nAlias: ${data.alias}\nCBU: ${data.cbu}`);
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
            <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nombre"
                  required
                  pattern="[A-Za-zÀ-ÿ\s]+"  
                  title="Solo se permiten letras y espacios"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
                  }}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  required
                  pattern="[A-Za-zÀ-ÿ\s]+"
                  title="Solo se permiten letras y espacios"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
                  }}
                />
                <input type="password" name="passwd" placeholder="Contraseña"/>
                <button type="submit">Enviar</button>
            </form>
            <button onClick={() => navigate("/")}>Volver</button>
        </div>
    );
}
export default Register;