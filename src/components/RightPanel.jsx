import React, { useEffect, useRef, useState } from "react";
import "./RightPanel.css";

export default function RightPanel({ isOpen, onClose, usuario, setUsuario }) {
  const API_USUARIOS = "https://reserva-turistica.onrender.com/api/Usuarios";
  const API_PERSONAS = "https://reserva-turistica.onrender.com/api/Personas";

  const fileInputRef = useRef(null);

  const [persona, setPersona] = useState(null);

  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [foto, setFoto] = useState("");

  // =========================================================
  // CARGA PERFIL COMPLETO
  // =========================================================
  useEffect(() => {
    if (!usuario) return;

    const load = async () => {
      // USUARIO
      const uRes = await fetch(`${API_USUARIOS}/${usuario.id}`);
      const uData = await uRes.json();

      // PERSONA
      const pRes = await fetch(`${API_PERSONAS}/${uData.personaId}`);
      const pData = await pRes.json();
      setPersona(pData);

      // Cargar campos
      setPrimerNombre(pData.primerNombre || "");
      setSegundoNombre(pData.segundoNombre || "");
      setPrimerApellido(pData.primerApellido || "");
      setSegundoApellido(pData.segundoApellido || "");
      setCorreo(pData.correoElectronico || "");
      setDireccion(pData.direccion || "");

      // Foto local
      const storedPhoto = localStorage.getItem("fotoPerfil");
      setFoto(storedPhoto || "");
    };

    load();
  }, [usuario]);

  // =========================================================
  // CAMBIAR FOTO LOCAL
  // =========================================================
  const handleCambiarFoto = () => fileInputRef.current.click();

  const handleArchivoSeleccionado = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFoto(reader.result);
      localStorage.setItem("fotoPerfil", reader.result);
    };
    reader.readAsDataURL(file);
  };

  // =========================================================
  // GUARDAR CAMBIOS (PUT Usuarios + PUT Personas)
  // =========================================================
  const guardarCambios = async () => {
    if (!persona) return;

    // NOMBRE COMPLETO PARA USUARIO
    const nombreCompleto = `
      ${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}
    `.replace(/\s+/g, " ").trim();

    // 1️⃣ Actualizar Usuario (solo nombre)
    await fetch(`${API_USUARIOS}/${usuario.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: usuario.id,
        nombre: nombreCompleto,
        contrasena: usuario.contrasena || "",
        estado: "A",
        personaId: persona.id,
        persona: null
      })
    });

    // 2️⃣ Actualizar Persona COMPLETA
    await fetch(`${API_PERSONAS}/${persona.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: persona.id,
        dni: persona.dni || 0,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        correoElectronico: correo,
        direccion
      })
    });

    // 3️⃣ Actualizar estado global
    setUsuario({
      ...usuario,
      nombre: nombreCompleto,
      correo
    });

    alert("Perfil actualizado correctamente!");
  };

  return (
    <div className={`right-panel ${isOpen ? "open" : ""}`}>
      
      <div className="panel-header">
        <h2>Perfil de usuario</h2>
        <button className="btn-close" onClick={onClose}>×</button>
      </div>

      <div className="perfil-card">
        <div className="perfil-avatar grande">
          {foto ? <img src={foto} className="avatar-img" /> : "UA"}
        </div>

        <div>
          <h3 className="perfil-nombre">
            {primerNombre} {segundoNombre} {primerApellido}
          </h3>
          <p className="perfil-correo">{correo}</p>
          <p className="perfil-rol">Administrador</p>
        </div>
      </div>

      <button className="perfil-btn" onClick={handleCambiarFoto}>
        Cambiar foto
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleArchivoSeleccionado}
        style={{ display: "none" }}
      />

      {/* CAMPOS EDITABLES */}
      <div className="perfil-input-group">
        <label>Primer nombre</label>
        <input value={primerNombre} onChange={(e) => setPrimerNombre(e.target.value)} />
      </div>

      <div className="perfil-input-group">
        <label>Segundo nombre</label>
        <input value={segundoNombre} onChange={(e) => setSegundoNombre(e.target.value)} />
      </div>

      <div className="perfil-input-group">
        <label>Primer apellido</label>
        <input value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />
      </div>

      <div className="perfil-input-group">
        <label>Segundo apellido</label>
        <input value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
      </div>

      <div className="perfil-input-group">
        <label>Correo electrónico</label>
        <input value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </div>

      <div className="perfil-input-group">
        <label>Dirección</label>
        <input value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      </div>

      <button className="perfil-save-btn" onClick={guardarCambios}>
        Guardar cambios
      </button>

    </div>
  );
}
