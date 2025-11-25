import "./Footer.css";
import logo from "../assets/varqueros_travels.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-overlay"></div>

      <div className="footer-content">

        {/* COLUMNA 1 - LOGO + FRASE */}
        <div className="footer-col">
          <img src={logo} className="footer-logo" />
          <p className="footer-subtext">
            Brindando cada viaje a una experiencia extraordinaria desde 2024.
          </p>
        </div>

        {/* COLUMNA 2 - ENLACES RÁPIDOS */}
        <div className="footer-col">
          <h3 className="footer-title">Enlaces Rápidos</h3>
          <ul className="footer-list">
            <li>Inicio</li>
            <li>Destinos</li>
            <li>Servicios</li>
            <li>Contacto</li>
          </ul>
        </div>

        {/* COLUMNA 3 - SERVICIOS */}
        <div className="footer-col">
          <h3 className="footer-title">Servicios</h3>
          <ul className="footer-list">
            <li>Vuelos Premium</li>
            <li>Hoteles de Lujo</li>
            <li>Tours Personalizados</li>
            <li>Grupos Exclusivos</li>
          </ul>
        </div>

        {/* COLUMNA 4 - CONTACTO */}
        <div className="footer-col">
          <h3 className="footer-title">Contacto</h3>
          <ul className="footer-list">
            <li>📞 +504 9988-7766</li>
            <li>✉️ info@varquerostravel.com</li>
            <li>📍 Honduras, C.A.</li>
          </ul>

          {/* ICONOS SOCIALES */}
          <div className="footer-socials">
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-tiktok"></i></a>
            <a href="#"><i className="fa-solid fa-envelope"></i></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 Varqueros Travels — Todos los derechos reservados.
      </div>
    </footer>
  );
}
