import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// IMÁGENES DESDE CLOUDINARY
const roma =
  "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021882/roma_yy9qzb.jpg";
const corea =
  "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021862/corea_uquawd.jpg";
const cancun =
  "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021863/cancun_awp0qn.jpg";
const copan =
  "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021864/Copan_jpc0vs.jpg";

const logo =
  "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021885/varqueros_travels_jlfmof.png";

export default function Login() {
  const navigate = useNavigate();

  // Campos del formulario
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // Manejar Login
  const handleLogin = () => {
    if (email.trim() === "" || pass.trim() === "") {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Guardar sesión
    localStorage.setItem("loggedIn", "true");

    // Redirigir a Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="login-container">

      {/* FORMULARIO */}
      <div className="form-container">
        <img src={logo} alt="Logo" className="form-logo" />

        <h2 className="title">Bienvenido a Varqueros Travels</h2>
        <p className="subtitle">Inicia sesión para continuar</p>

        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="usuario@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="********"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </div>

      {/* IMÁGENES DERECHA */}
      <div className="right-images">
        <div className="row-2">
          <img src={roma} alt="Roma" />
          <img src={corea} alt="Corea" />
        </div>

        <div className="row-2">
          <img src={cancun} alt="Cancún" />
          <img src={copan} alt="Copán" />
        </div>
      </div>

    </div>
  );
}
