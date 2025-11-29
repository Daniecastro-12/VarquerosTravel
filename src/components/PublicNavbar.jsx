import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./PublicNavbar.css";
import logo from "../assets/varqueros_travels.png";

export default function PublicNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleReserveClick = () => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") navigate("/reservaciones");
    else navigate("/login");
  };

  return (
    <nav className="public-navbar">
      <div className="left">
        <img src={logo} alt="logo" className="nav-logo" />
        <span className="brand">VARQUEROS TRAVELS</span>
      </div>

      <div className="center">
        <Link to="/">Inicio</Link>
        <Link to="/destinos">Destinos</Link>
        <Link to="/servicios">Servicios</Link>
        <Link to="/contacto">Contacto</Link>
      </div>

      <div className="right">
        <button onClick={handleReserveClick} className="btn-blue">
          Reservar Ahora
        </button>
        <Link to="/login" className="btn-yellow">
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
}
