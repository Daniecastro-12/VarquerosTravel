import { Link, useNavigate } from "react-router-dom";
import "./PublicNavbar.css";
import logo from "../assets/varqueros_travels.png";

export default function PublicNavbar() {

  const navigate = useNavigate();

  const handleReserveClick = () => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
      navigate("/reservaciones");   // si está logueado
    } else {
      navigate("/login");           // si NO está logueado
    }
  };

  return (
    <nav className="public-navbar">
      {/* LOGO + NOMBRE */}
      <div className="left">
        <img src={logo} alt="logo" className="nav-logo" />
        <span className="brand">VARQUEROS TRAVELS</span>
      </div>

      {/* MENÚ */}
      <div className="center">
        <Link to="/">Inicio</Link>
        <Link to="/destinos">Destinos</Link>
        <Link to="/servicios">Servicios</Link>
        <Link to="/contacto">Contacto</Link>
      </div>

      {/* BOTONES */}
      <div className="right">

        {/* RESERVAR AHORA INTELIGENTE */}
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
