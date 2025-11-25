import React, { useEffect, useState } from "react";
import "./Dashboard.css";

// ICONOS (Lucide)
import { Users, ClipboardList, DollarSign, CheckCircle, Search } from "lucide-react";

export default function Dashboard() {
  const API_URL = "https://reserva-turistica.onrender.com/api/Reservas/vista-reservas-listado";

  const [reservas, setReservas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");

  // ===================== CARGAR API =====================
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setReservas(data);
        setFiltered(data);
      })
      .catch((err) => console.log("ERROR API:", err));
  }, []);

  // ===================== BUSCAR =====================
  const buscar = (value) => {
    setSearch(value);
    const results = reservas.filter(
      (r) =>
        r.cliente?.toLowerCase().includes(value.toLowerCase()) ||
        r.codigoReserva?.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
  };

  // ===================== FILTRAR =====================
  const filtrarEstado = (value) => {
    setEstadoFilter(value);
    if (value === "") {
      setFiltered(reservas);
      return;
    }
    const results = reservas.filter(
      (r) => r.estado?.toLowerCase() === value.toLowerCase()
    );
    setFiltered(results);
  };

  // ===================== IMÁGENES CLOUDINARY =====================
  const destinos = [
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021865/italia_qn6qv6.jpg",
      title: "Italia",
      desc: "Arquitectura, historia y gastronomía inolvidable."
    },
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021863/cancun_awp0qn.jpg",
      title: "Cancún",
      desc: "Playas caribeñas y hoteles de lujo."
    },
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021864/Copan_jpc0vs.jpg",
      title: "Ruinas de Copán",
      desc: "Cultura Maya y patrimonio hondureño."
    },
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021865/londres_lu67w3.jpg",
      title: "Londres",
      desc: "Turismo moderno y experiencias urbanas."
    },
  ];

  return (
    <div className="pro-dashboard">

      {/* TÍTULO */}
      <h1 className="dash-title">🌴 Varqueros Travel</h1>
      <p className="dash-subtitle">Plataforma Profesional de Reservaciones Turísticas</p>

      {/* KPI CARDS */}
      <div className="kpi-row">

        <div className="kpi-card">
          <Users size={40} className="kpi-icon" />
          <h4>Total Clientes</h4>
          <span>{reservas.length}</span>
        </div>

        <div className="kpi-card">
          <ClipboardList size={40} className="kpi-icon" />
          <h4>Total Reservaciones</h4>
          <span>{reservas.length}</span>
        </div>

        <div className="kpi-card">
          <DollarSign size={40} className="kpi-icon" />
          <h4>Ingresos Totales</h4>
          <span>
            L. {reservas.reduce((s, r) => s + (r.total || 0), 0)}
          </span>
        </div>

        <div className="kpi-card">
          <CheckCircle size={40} className="kpi-icon" />
          <h4>Reservaciones Activas</h4>
          <span>{reservas.filter((r) => r.estado === "A").length}</span>
        </div>

      </div>

      {/* DESTINOS */}
      <h2 className="section-title">🌍 Destinos Turísticos</h2>

      <div className="destinos-grid">
        {destinos.map((item, index) => (
          <div key={index} className="destino-card">
            <img src={item.img} className="destino-img" alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* TABLA */}
      <h2 className="section-title">📅 Últimas Reservaciones</h2>

      <div className="table-container">

        {/* Buscador y Filtro */}
        <div className="toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              className="input-search"
              placeholder="Buscar cliente o código de reserva..."
              value={search}
              onChange={(e) => buscar(e.target.value)}
            />
          </div>

          <select
            className="input-filter"
            value={estadoFilter}
            onChange={(e) => filtrarEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="A">Activa</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        {/* TABLA */}
        <table className="pro-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Código Reserva</th>
              <th>Estado</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((r) => (
              <tr key={r.reservaID}>
                <td>{r.reservaID}</td>
                <td>{r.cliente}</td>
                <td>{r.codigoReserva}</td>
                <td>{r.estado}</td>
                <td>L. {r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
