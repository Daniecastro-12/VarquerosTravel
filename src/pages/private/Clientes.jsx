import React, { useEffect, useState } from "react";
import "./Clientes.css";
import ClienteModal from "../../components/ClienteModal";

export default function Clientes() {
  const API = "https://reserva-turistica.onrender.com/api/Clientes";
  const API_VISTA = "https://reserva-turistica.onrender.com/api/Clientes/vista-gestion";

  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteEdit, setClienteEdit] = useState(null);

  
  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    const res = await fetch(API_VISTA);
    const data = await res.json();
    setClientes(data);
  };

  const abrirNuevo = () => {
    setClienteEdit(null);
    setModalVisible(true);
  };

  const abrirEditar = (cliente) => {
    setClienteEdit(cliente);
    setModalVisible(true);
  };

  const eliminarCliente = async (id) => {
    if (!confirm("¿Eliminar cliente?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargarClientes();
  };

  const guardarCliente = async (clienteData) => {
    const method = clienteData.id === 0 ? "POST" : "PUT";
    const url = clienteData.id === 0 ? API : `${API}/${clienteData.id}`;

    const body = {
      id: clienteData.id,
      codigoCliente: clienteData.codigoCliente,         // "CLI-020"
      personaId: clienteData.personaId,                // 0 o el id real
      categoriaClienteId: clienteData.categoriaClienteId,
      fechaRegistro: new Date().toISOString()
    };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    await res.text();
    cargarClientes();
    setModalVisible(false);
  };

  const filtrados = clientes.filter((c) => {
    const texto = `${c.codigoCliente} ${c.nombreCompleto} ${c.email || ""}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  return (
    <div className="clientes-page">
      <div className="clientes-header">
        <h1 className="clientes-title">Gestión de Clientes</h1>
        <button className="btn-nuevo" onClick={abrirNuevo}>
          + Nuevo Cliente
        </button>
      </div>

      <div className="clientes-search-wrapper">
        <input
          type="text"
          placeholder="Buscar cliente, correo o código..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="clientes-table-container">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Fecha Registro</th>
              <th>Categoría</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((c) => (
              <tr key={c.clienteID}>
                <td>{c.codigoCliente}</td>
                <td>{c.nombreCompleto}</td>
                <td>{c.email || "—"}</td>
                <td>{c.telefono ?? "—"}</td>
                <td>{new Date(c.fecha_registro).toLocaleDateString()}</td>
                <td>{c.categoria}</td>
                <td>{c.prioridad}</td>
                <td>{c.estado}</td>
                <td className="acciones">
                  <button
                    className="btn-editar"
                    onClick={() => abrirEditar(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarCliente(c.clienteID)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {filtrados.length === 0 && (
              <tr>
                <td colSpan="9" className="sin-clientes">
                  No se encontraron clientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ClienteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        cliente={clienteEdit}
        onSave={guardarCliente}
      />
    </div>
  );
}
