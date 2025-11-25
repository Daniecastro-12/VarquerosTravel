import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Save, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Reservaciones.css";

export default function Reservaciones() {
  const API_URL = "https://reserva-turistica.onrender.com/api/Reservas";
  const navigate = useNavigate();

  const [reservas, setReservas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setReservas(data);
    } catch (error) {
      console.error("Error cargando reservas:", error);
    }
  };

  const iniciarEdicion = (reserva) => {
    setEditId(reserva.id);
    setEditForm({ ...reserva });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const guardarEdicion = async () => {
    try {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      setEditId(null);
      cargarReservas();
    } catch (error) {
      console.error("Error guardando reserva:", error);
    }
  };

  const eliminarReserva = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta reserva?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      cargarReservas();
    } catch (error) {
      console.error("Error eliminando reserva:", error);
    }
  };

  return (
    <div className="reservas-container">

      {/* HEADER */}
      <div className="reservas-header">
        <h1 className="reservas-title">
          📘 Gestión de Reservaciones
        </h1>

        <button
          onClick={() => navigate("/nueva-reservacion")}
          className="btn-new-reserva"
        >
          <Plus size={18} /> Nueva Reserva
        </button>
      </div>

      {/* TABLA */}
      <div className="reservas-table-container">
        <table className="reservas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Estado</th>
              <th>Total</th>
              <th>ID Cliente</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {reservas.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>

                {/* Código */}
                <td>
                  {editId === r.id ? (
                    <input
                      type="number"
                      name="codigoReserva"
                      value={editForm.codigoReserva}
                      onChange={handleChange}
                      className="edit-input white-input"
                    />
                  ) : (
                    r.codigoReserva
                  )}
                </td>

                {/* Estado */}
                <td>
                  {editId === r.id ? (
                    <select
                      name="estado"
                      value={editForm.estado}
                      onChange={handleChange}
                      className="edit-input white-input"
                    >
                      <option value="A">Activa</option>
                      <option value="I">Inactiva</option>
                    </select>
                  ) : (
                    r.estado
                  )}
                </td>

                {/* Total */}
                <td>
                  {editId === r.id ? (
                    <input
                      type="number"
                      name="total"
                      value={editForm.total}
                      onChange={handleChange}
                      className="edit-input white-input"
                    />
                  ) : (
                    `L. ${r.total}`
                  )}
                </td>

                {/* Cliente */}
                <td>
                  {editId === r.id ? (
                    <input
                      type="number"
                      name="clienteId"
                      value={editForm.clienteId}
                      onChange={handleChange}
                      className="edit-input white-input"
                    />
                  ) : (
                    r.clienteId
                  )}
                </td>

                {/* ACCIONES */}
                <td className="action-buttons">

                  {/* GUARDAR */}
                  {editId === r.id ? (
                    <button className="action-btn btn-save" onClick={guardarEdicion}>
                      <Save size={18} />
                    </button>
                  ) : (
                    <button
                      className="action-btn btn-edit"
                      onClick={() => iniciarEdicion(r)}
                    >
                      <Pencil size={18} />
                    </button>
                  )}

                  {/* CANCELAR */}
                  {editId === r.id && (
                    <button
                      className="action-btn btn-cancel"
                      onClick={() => setEditId(null)}
                    >
                      <X size={18} />
                    </button>
                  )}

                  {/* ELIMINAR */}
                  <button
                    className="action-btn btn-delete"
                    onClick={() => eliminarReserva(r.id)}
                  >
                    <Trash2 size={18} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
