import React, { useState, useEffect } from "react";
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

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const API_LOGIN = "https://reserva-turistica.onrender.com/api/Auth/login";
  const API_GOOGLE = "https://reserva-turistica.onrender.com/api/Auth/login-google";

  // ---------------------------------------------------
  // LOGIN NORMAL
  // ---------------------------------------------------
  const handleLogin = async () => {
    if (email.trim() === "" || pass.trim() === "") {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          correo: email,
          password: pass,
        }),
      });

      if (!response.ok) {
        alert("Credenciales incorrectas.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token || "");
      localStorage.setItem("loggedIn", "true");

      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      alert("Error del servidor.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------
  // GOOGLE LOGIN
  // ---------------------------------------------------
  useEffect(() => {
    if (document.getElementById("google-client-script")) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "google-client-script";
    document.body.appendChild(script);

    script.onload = () => {
      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id:
          "1049955535676-dc3hc1kms08q0r63dvpkmr7u30025a4r.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleLoginDiv"),
        {
          theme: "filled_blue",
          size: "large",
          width: "260",
        }
      );
    };
  }, []);

  const handleGoogleResponse = async (response) => {
    const idToken = response.credential;

    const payload = JSON.parse(atob(idToken.split(".")[1]));

    const body = {
      idToken: idToken,
      email: payload.email,
      name: payload.name,
      givenName: payload.given_name,
      familyName: payload.family_name,
    };

    try {
      const res = await fetch(API_GOOGLE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        alert("Error al iniciar con Google.");
        return;
      }

      const data = await res.json();

      localStorage.setItem("token", data.token || "");
      localStorage.setItem("loggedIn", "true");

      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      alert("Error del servidor.");
    }
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

        {/* BOTONES EN GRUPO */}
        <div className="buttons-group">
          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Validando..." : "Iniciar Sesión"}
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/registro")}
          >
            Crear una cuenta
          </button>

          <div id="googleLoginDiv"></div>
        </div>
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
