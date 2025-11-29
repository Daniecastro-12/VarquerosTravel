import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Save, X, Plus, Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Reservaciones.css";

export default function Reservaciones() {
  // ENDPOINTS
  const API_LISTAR = "https://reserva-turistica.onrender.com/api/Reservas/vista-reservas-listado";
  const API_ACTUALIZAR = "https://reserva-turistica.onrender.com/api/Reservas/actualizar-reserva";
  const API_ELIMINAR = "https://reserva-turistica.onrender.com/api/Reservas/eliminar-reserva-completa";

  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    reservaID: 0,
    estado: "",
    totalNuevo: 0,
  });
  const [selectedReserva, setSelectedReserva] = useState(null); // Estado para la reserva seleccionada

  // ==========================================================
  // Cargar Reservas
  // ==========================================================
  const cargarReservas = async () => {
    try {
      const res = await fetch(API_LISTAR);
      let data = await res.json();
      if (Array.isArray(data.$values)) data = data.$values;
      setReservas(data);
      setFiltered(data);
    } catch (error) {
      console.error("ERROR API:", error);
      setReservas([]);
      setFiltered([]);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  // ==========================================================
  // Buscar
  // ==========================================================
  const buscar = (texto) => {
    setSearch(texto);
    const t = texto.toLowerCase();
    const results = reservas.filter(
      (r) =>
        (r.cliente ?? "").toLowerCase().includes(t) ||
        (r.codigoReserva ?? "").toLowerCase().includes(t) ||
        String(r.reservaID ?? "").includes(t)
    );
    setFiltered(texto ? results : reservas);
  };

  // ==========================================================
  // Filtro de Estado
  // ==========================================================
  const filtrarEstado = (estado) => {
    setEstadoFilter(estado);
    if (!estado) {
      setFiltered(reservas);
      return;
    }
    setFiltered(reservas.filter((r) => r.estado === estado));
  };

  // ==========================================================
  // Editar línea
  // ==========================================================
  const iniciarEdicion = (r) => {
    setEditId(r.reservaID);
    setEditForm({
      reservaID: r.reservaID,
      estado: r.estado,
      totalNuevo: r.total,
    });
  };

  // ==========================================================
  // Guardar Edición
  // ==========================================================
  const guardarEdicion = async () => {
    try {
      const payload = {
        reservaID: editForm.reservaID,
        estado: editForm.estado,
        totalNuevo: Number(editForm.totalNuevo),
      };

      const res = await fetch(API_ACTUALIZAR, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.tipoMensaje !== 0) {
        alert("❌ Error: " + data.mensaje);
        return;
      }

      alert("✔ Reservación actualizada correctamente");
      setEditId(null);
      cargarReservas();
    } catch (err) {
      console.error(err);
      alert("❌ No se pudo actualizar la reservación");
    }
  };

  // ==========================================================
  // Eliminar reserva
  // ==========================================================
  const eliminarReserva = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta reserva completa?")) return;

    try {
      const res = await fetch(`${API_ELIMINAR}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.tipoMensaje !== 0) {
        alert("❌ Error: " + data.mensaje);
        return;
      }

      alert("✔ Reserva eliminada correctamente");
      cargarReservas();
    } catch (err) {
      alert("❌ No se pudo eliminar");
      console.log(err);
    }
  };

  // Función para mostrar los detalles de la reserva
  const verDetalles = (r) => {
    setSelectedReserva(r); // Guarda la reserva seleccionada
  };

  // Función para cerrar el modal de detalles
  const cerrarDetalles = () => setSelectedReserva(null);

  return (
    <div className="reservas-container">
      {/* HEADER */}
      <div className="reservas-header">
        <h1 className="reservas-title">📘 Gestión de Reservaciones</h1>
        <button onClick={() => navigate("/nueva-reservacion")} className="btn-new-reserva">
          <Plus size={18} /> Nueva Reserva
        </button>
      </div>

      {/* CONTENEDOR TABLA */}
      <div className="reservas-table-container">
        {/* Busqueda */}
        <div className="toolbar">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              className="input-search"
              placeholder="Buscar cliente, código o ID..."
              value={search}
              onChange={(e) => buscar(e.target.value)}
            />
          </div>

          <select
            className="input-filter"
            value={estadoFilter}
            onChange={(e) => filtrarEstado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="A">Activa</option>
            <option value="P">Pendiente</option>
            <option value="C">Cancelada</option>
          </select>
        </div>

        {/* Tabla */}
        <table className="pro-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Código</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No hay reservaciones registradas.</td>
              </tr>
            ) : (
              filtered.map((r) => (
                <>
                  <tr key={r.reservaID}>
                    <td>{r.reservaID}</td>
                    <td>{r.cliente}</td>
                    <td>{r.codigoReserva}</td>
                    <td>
                      {editId === r.reservaID ? (
                        <select
                          name="estado"
                          className="edit-select"
                          value={editForm.estado}
                          onChange={(e) =>
                            setEditForm({ ...editForm, estado: e.target.value })
                          }
                        >
                          <option value="A">Activa</option>
                          <option value="P">Pendiente</option>
                          <option value="C">Cancelada</option>
                        </select>
                      ) : (
                        <span>{r.estado}</span>
                      )}
                    </td>
                    <td>
                      {editId === r.reservaID ? (
                        <input
                          type="number"
                          className="edit-input"
                          value={editForm.totalNuevo}
                          onChange={(e) =>
                            setEditForm({ ...editForm, totalNuevo: e.target.value })
                          }
                        />
                      ) : (
                        `L. ${r.total}`
                      )}
                    </td>
                    <td className="action-buttons">
                      {editId === r.reservaID ? (
                        <>
                          <button className="action-btn btn-save" onClick={guardarEdicion}>
                            <Save size={18} />
                          </button>
                          <button className="action-btn btn-cancel" onClick={() => setEditId(null)}>
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <button className="action-btn btn-edit" onClick={() => iniciarEdicion(r)}>
                          <Pencil size={18} />
                        </button>
                      )}
                      <button className="action-btn btn-delete" onClick={() => eliminarReserva(r.reservaID)}>
                        <Trash2 size={18} />
                      </button>
                      {/* Botón para ver detalles */}
                      <div className="btn-details-container">
                        <button className="action-btn btn-view" onClick={() => verDetalles(r)}>
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Mostrar los detalles de la reserva en un modal */}
                  {selectedReserva && selectedReserva.reservaID === r.reservaID && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        <h3>Detalles de la Reserva</h3>
                        <p><strong>ID:</strong> {r.reservaID}</p>
                        <p><strong>Cliente:</strong> {r.cliente}</p>
                        <p><strong>Código de Reserva:</strong> {r.codigoReserva}</p>
                        <p><strong>Estado:</strong> {r.estado}</p>
                        <p><strong>Total:</strong> L. {r.total}</p>
                        <button className="btn-cerrar-detalles" onClick={cerrarDetalles}>
                          Cerrar
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
