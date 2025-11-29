import React, { useState, useEffect } from "react";
import "./ClienteModal.css";

export default function ClienteModal({ visible, onClose, cliente, onSave }) {

  const API_PERSONAS = "https://reserva-turistica.onrender.com/api/Personas";

  const [form, setForm] = useState({
    id: 0,
    codigoCliente: "",
    categoriaClienteId: 1,
    personaId: 0
  });

  useEffect(() => {
    if (cliente) {
      setForm({
        id: cliente.clienteID,
        codigoCliente: cliente.codigoCliente.replace("CLI-", ""),
        categoriaClienteId: cliente.categoriaCliente_id,
        personaId: cliente.personaId || 0
      });
    } else {
      setForm({
        id: 0,
        codigoCliente: "",
        categoriaClienteId: 1,
        personaId: 0
      });
    }
  }, [cliente]);

  if (!visible) return null;

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {

    if (!form.codigoCliente) return alert("Ingrese el código del cliente");

    const codigoFix = `CLI-${form.codigoCliente}`;

    onSave({
      id: form.id,
      codigoCliente: codigoFix,
      personaId: form.personaId,
      categoriaClienteId: parseInt(form.categoriaClienteId)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2 className="modal-title">
          {form.id === 0 ? "Nuevo Cliente" : "Editar Cliente"}
        </h2>

        <div className="modal-field">
          <label>Código Cliente</label>
          <input
            type="text"
            placeholder="Ej: 020"
            value={form.codigoCliente}
            onChange={(e) => handleChange("codigoCliente", e.target.value)}
          />
        </div>

        <div className="modal-field">
          <label>Categoría</label>
          <select
            value={form.categoriaClienteId}
            onChange={(e) => handleChange("categoriaClienteId", e.target.value)}
          >
            <option value={1}>Bronce</option>
            <option value={2}>Plata</option>
            <option value={3}>Oro</option>
            <option value={4}>Premium</option>
            <option value={5}>VIP</option>
            <option value={6}>Estudiante</option>
            <option value={7}>Corporativo</option>
            <option value={8}>Turista Nacional</option>
            <option value={9}>Turista Internacional</option>
          </select>
        </div>

        <div className="modal-buttons">
          <button className="cancelar" onClick={onClose}>Cancelar</button>
          <button className="guardar" onClick={handleSubmit}>Guardar</button>
        </div>

      </div>
    </div>
  );
}
