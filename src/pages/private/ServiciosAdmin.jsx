import React, { useEffect, useState } from "react";
import "./ServiciosAdmin.css";

export default function ServiciosAdmin() {
  const API_SERVICIOS = "https://reserva-turistica.onrender.com/api/Servicios";

  const [servicios, setServicios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // --- ESTADO DEL MODAL DE EDICIÓN ---
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    estado: "",
  });

  // --- ESTADO DEL MODAL DE DETALLES ---
  const [modalDetalles, setModalDetalles] = useState(false);
  const [detalleData, setDetalleData] = useState(null);

  // ------------------ CARGAR SERVICIOS ------------------
  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    const res = await fetch(API_SERVICIOS);
    const data = await res.json();
    setServicios(data);
  };

  // ------------------ ABRIR MODAL EDICIÓN ------------------
  const abrirModal = (servicio) => {
    setEditData({
      id: servicio.id,
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      estado: servicio.estado,
    });

    setModalOpen(true);
  };

  const cerrarModal = () => setModalOpen(false);

  // ------------------ GUARDAR CAMBIOS ------------------
  const guardarCambios = async () => {
    const res = await fetch(`${API_SERVICIOS}/${editData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    if (res.ok) {
      alert("Servicio actualizado correctamente ✔");
      cargarServicios();
      cerrarModal();
    } else {
      alert("Error actualizando el servicio ❌");
    }
  };

  // ------------------ VER DETALLES ------------------
  const verDetalles = (servicio) => {
    setDetalleData(servicio);
    setModalDetalles(true);
  };

  const cerrarDetalles = () => setModalDetalles(false);

  // ------------------ ELIMINAR SERVICIO ------------------
  const eliminarServicio = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este servicio?");

    if (!confirmar) return;

    const res = await fetch(`${API_SERVICIOS}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Servicio eliminado correctamente ✔");
      cargarServicios();
    } else {
      alert("Error eliminando el servicio ❌");
    }
  };

  return (
    <div className="servicios-page">
      <h2 className="titulo">Servicios</h2>

      {/* BUSCADOR */}
      <input
        className="buscador"
        type="text"
        placeholder="Buscar servicio..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* LISTA DE SERVICIOS */}
      {servicios
        .filter((s) =>
          s.nombre.toLowerCase().includes(busqueda.toLowerCase())
        )
        .map((servicio) => (
          <div className="servicio-card" key={servicio.id}>
            <div className="servicio-info">
              <h3>{servicio.nombre}</h3>
              <p>{servicio.descripcion}</p>
              <span
                className={
                  servicio.estado === "A" ? "estado-activo" : "estado-inactivo"
                }
              >
                {servicio.estado === "A" ? "Activo" : "Inactivo"}
              </span>
            </div>

            {/* BOTONES */}
            <div className="servicio-buttons">
              <button
                className="btn-detalles"
                onClick={() => verDetalles(servicio)}
              >
                Ver detalles
              </button>

              <button
                className="btn-editar"
                onClick={() => abrirModal(servicio)}
              >
                ✏ Editar
              </button>

              <button
                className="btn-eliminar"
                onClick={() => eliminarServicio(servicio.id)}
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))}

      {/* ---------------------------- MODAL DE EDICIÓN ---------------------------- */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">

            <h3>Editar Servicio</h3>

            <label>Nombre</label>
            <input
              type="text"
              value={editData.nombre}
              onChange={(e) =>
                setEditData({ ...editData, nombre: e.target.value })
              }
            />

            <label>Descripción</label>
            <textarea
              value={editData.descripcion}
              onChange={(e) =>
                setEditData({ ...editData, descripcion: e.target.value })
              }
            />

            <label>Estado</label>
            <select
              value={editData.estado}
              onChange={(e) =>
                setEditData({ ...editData, estado: e.target.value })
              }
            >
              <option value="A">Activo</option>
              <option value="I">Inactivo</option>
            </select>

            <div className="modal-buttons">
              <button className="btn-guardar" onClick={guardarCambios}>
                Guardar cambios
              </button>

              <button className="btn-cancelar" onClick={cerrarModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------- MODAL DE DETALLES ---------------------------- */}
      {modalDetalles && (
        <div className="modal-overlay">
          <div className="modal-content">

            <h3>Detalles del Servicio</h3>

            <p><strong>Nombre:</strong> {detalleData.nombre}</p>
            <p><strong>Descripción:</strong> {detalleData.descripcion}</p>
            <p>
              <strong>Estado:</strong>{" "}
              {detalleData.estado === "A" ? "Activo" : "Inactivo"}
            </p>

            <div className="modal-buttons">
              <button className="btn-cerrar-detalles" onClick={cerrarDetalles}>
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
