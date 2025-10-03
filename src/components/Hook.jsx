import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function useAutoLogout(timeout = 2 * 60 * 1000) {
  const navigate = useNavigate();
  const timerRef = useRef();

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      alert("Sesión cerrada por inactividad");
      navigate("/");
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // inicia el contador

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      clearTimeout(timerRef.current);
    };
  }, []);
}