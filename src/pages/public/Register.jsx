import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: "",
    password: "",
    dni: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    direccion: "",
  });

  const [loading, setLoading] = useState(false);

  const API_REGISTER =
    "https://reserva-turistica.onrender.com/api/Auth/registro";

  // ---------------------------
  // Cargar datos según el correo que escriba
  // ---------------------------
  useEffect(() => {
    if (form.correo.trim() !== "") {
      const key = `registerForm_${form.correo}`;
      const saved = localStorage.getItem(key);

      if (saved) {
        setForm(JSON.parse(saved));
      }
    }
  }, [form.correo]);

  // ---------------------------
  // Guardar el formulario para ese usuario específico
  // ---------------------------
  useEffect(() => {
    if (form.correo.trim() !== "") {
      const key = `registerForm_${form.correo}`;
      localStorage.setItem(key, JSON.stringify(form));
    }
  }, [form]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const { correo, password, primerNombre, primerApellido } = form;

    if (!correo || !password || !primerNombre || !primerApellido) {
      alert("Los campos obligatorios deben completarse.");
      return;
    }

    let dniClean = form.dni.trim().replace(/^0+/, "");
    if (dniClean !== "" && !/^\d+$/.test(dniClean)) {
      alert("El DNI solo debe contener números.");
      return;
    }

    const body = {
      correo: form.correo,
      password: form.password,
      dni: dniClean === "" ? 0 : Number(dniClean),
      primerNombre: form.primerNombre,
      segundoNombre: form.segundoNombre,
      primerApellido: form.primerApellido,
      segundoApellido: form.segundoApellido,
      direccion: form.direccion,
    };

    try {
      setLoading(true);

      const response = await fetch(API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert("Error al registrar:\n\n" + errorText);
        setLoading(false);
        return;
      }

      alert("Registro exitoso. Ahora puedes iniciar sesión.");

      // 🔥 Eliminar solo los datos de ese usuario
      localStorage.removeItem(`registerForm_${form.correo}`);

      navigate("/login", { replace: true });

    } catch (error) {
      alert("Error en el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear Cuenta</h2>

        <div className="form-group">
          <label>Correo *</label>
          <input
            name="correo"
            value={form.correo}
            onChange={handleChange}
            type="email"
            placeholder="usuario@correo.com"
          />
        </div>

        <div className="form-group">
          <label>Contraseña *</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
          />
        </div>

        <div className="form-group">
          <label>DNI</label>
          <input
            name="dni"
            value={form.dni}
            onChange={handleChange}
            placeholder="Solo números, sin 0 inicial"
          />
        </div>

        <div className="form-group">
          <label>Primer Nombre *</label>
          <input
            name="primerNombre"
            value={form.primerNombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Segundo Nombre</label>
          <input
            name="segundoNombre"
            value={form.segundoNombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Primer Apellido *</label>
          <input
            name="primerApellido"
            value={form.primerApellido}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Segundo Apellido</label>
          <input
            name="segundoApellido"
            value={form.segundoApellido}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
          />
        </div>

        <button
          className="register-btn"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creando cuenta..." : "Crear Cuenta"}
        </button>

        <button className="back-btn" onClick={() => navigate("/login")}>
          Volver al Login
        </button>
      </div>
    </div>
  );
}
