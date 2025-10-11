import { useNavigate } from "react-router-dom";

function ButtonLogout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return <button onClick={handleLogout}>Cerrar Sesión</button>;
}
export default ButtonLogout;