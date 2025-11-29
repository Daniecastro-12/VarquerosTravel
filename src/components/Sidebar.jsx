import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
const logo =
  "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021885/varqueros_travels_jlfmof.png";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Panel Principal", path: "/dashboard" },
    { name: "Reservaciones", path: "/reservaciones" },
    { name: "Nueva Reservación", path: "/nueva-reservacion" },
    { name: "Servicios", path: "/servicios-admin" },
    { name: "Clientes", path: "/clientes" },
    { name: "Disponibilidad", path: "/disponibilidad" },
  ];

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo-container">
        <img src={logo} alt="Varqueros Logo" className="sidebar-logo" />
        <p className="sidebar-caption">Sistema de Gestión</p>
      </div>

      {/* MENÚ */}
      <ul className="sidebar-menu">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`sidebar-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* CERRAR SESIÓN */}
      <div
        className="sidebar-logout-btn"
        onClick={() => {
          localStorage.removeItem("loggedIn");
          window.location.href = "/login";
        }}
      >
        Cerrar Sesión
      </div>

    </div>
  );
}
