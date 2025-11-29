import React, { useEffect, useState } from "react";
import "./Dashboard.css";

// ICONOS
import {
  Users,
  ClipboardList,
  DollarSign,
  CheckCircle,
  Search,
} from "lucide-react";

export default function Dashboard() {
  // API
  const API_RESERVAS =
    "https://reserva-turistica.onrender.com/api/Reservas/vista-reservas-listado";

  const API_RESUMEN =
    "https://reserva-turistica.onrender.com/api/Reservas/vista-dashboard-resumen";

  // ===================== ESTADOS =====================
  const [reservas, setReservas] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");

  const [mostrarTodas, setMostrarTodas] = useState(false);

  // Resumen del dashboard
  const [resumen, setResumen] = useState({
    totalClientes: 0,
    totalReservaciones: 0,
    ingresosTotales: 0,
    reservasHoy: 0,
    reservasPorMes: 0,
    mesActual: "",
  });

  // ===================== CARGAR RESERVAS =====================
  useEffect(() => {
    fetch(API_RESERVAS)
      .then((res) => res.json())
      .then((data) => {
        setReservas(data);
        setFiltered(data);
      })
      .catch((err) => console.log("ERROR API RESERVAS:", err));
  }, []);

  // ===================== CARGAR RESUMEN =====================
  useEffect(() => {
    fetch(API_RESUMEN)
      .then((res) => res.json())
      .then((data) => {
        const resumenMap = {
          totalClientes:
            data.find((x) => x.tipo === "TotalClientes")?.valor1 || 0,
          totalReservaciones:
            data.find((x) => x.tipo === "TotalReservaciones")?.valor1 || 0,
          ingresosTotales:
            data.find((x) => x.tipo === "IngresosTotales")?.valor1 || 0,
          reservasHoy: data.find((x) => x.tipo === "ReservasHoy")?.valor1 || 0,
          reservasPorMes:
            data.find((x) => x.tipo === "ReservasPorMes")?.valor3 || 0,
          mesActual:
            data.find((x) => x.tipo === "ReservasPorMes")?.valor2 || "",
        };

        setResumen(resumenMap);
      })
      .catch((err) => console.log("ERROR API RESUMEN:", err));
  }, []);

  // ===================== BUSCAR =====================
  const buscar = (value) => {
    setSearch(value);

    const results = reservas.filter(
      (r) =>
        r.cliente?.toLowerCase().includes(value.toLowerCase()) ||
        r.codigoReserva?.toLowerCase().includes(value.toLowerCase()) ||
        r.reservaID?.toString().includes(value)
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

    const results = reservas.filter((r) => r.estado === value);
    setFiltered(results);
  };

  // ===================== ORDENAR ÚLTIMAS RESERVAS =====================
  const ultimasReservas = [...filtered]
    .sort((a, b) => new Date(b.fecha_Creacion) - new Date(a.fecha_Creacion))
    .slice(0, 10);

  const listaFinal = mostrarTodas ? filtered : ultimasReservas;

  // ===================== IMÁGENES CLOUDINARY =====================
  const destinos = [
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021865/italia_qn6qv6.jpg",
      title: "Italia",
      desc: "Arquitectura, historia y gastronomía inolvidable.",
    },
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021863/cancun_awp0qn.jpg",
      title: "Cancún",
      desc: "Playas caribeñas y hoteles de lujo.",
    },
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021864/Copan_jpc0vs.jpg",
      title: "Ruinas de Copán",
      desc: "Cultura Maya y patrimonio hondureño.",
    },
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021865/londres_lu67w3.jpg",
      title: "Londres",
      desc: "Turismo moderno y experiencias urbanas.",
    },
  ];

  return (
    <div className="pro-dashboard">
      {/* ===================== TÍTULO ===================== */}
      <h1 className="dash-title">🌴 Varqueros Travel</h1>
      <p className="dash-subtitle">
        Plataforma Profesional de Reservaciones Turísticas
      </p>

      {/* ===================== KPI CARDS ===================== */}
      <div className="kpi-row">
        <div className="kpi-card">
          <Users size={40} className="kpi-icon" />
          <h4>Total Clientes</h4>
          <span>{resumen.totalClientes}</span>
        </div>

        <div className="kpi-card">
          <ClipboardList size={40} className="kpi-icon" />
          <h4>Total Reservaciones</h4>
          <span>{resumen.totalReservaciones}</span>
        </div>

        <div className="kpi-card">
          <DollarSign size={40} className="kpi-icon" />
          <h4>Ingresos Totales</h4>
          <span>L. {parseFloat(resumen.ingresosTotales).toFixed(2)}</span>
        </div>

        <div className="kpi-card">
          <CheckCircle size={40} className="kpi-icon" />
          <h4>Reservas Hoy</h4>
          <span>{resumen.reservasHoy}</span>
        </div>
      </div>

      {/* ===================== DESTINOS ===================== */}
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

      {/* ===================== TABLA ===================== */}
      <h2 className="section-title">📅 Últimas Reservaciones</h2>

      <div className="table-container">
        {/* BOTÓN ULTIMAS/TODAS */}
        <button className="btn-toggle" onClick={() => setMostrarTodas(!mostrarTodas)}>
          {mostrarTodas
            ? "Mostrar solo últimas reservaciones"
            : "Mostrar todas las reservaciones"}
        </button>

        {/* Buscador y Filtro */}
        <div className="toolbar">
          <div className="search-box" style={{ position: "relative" }}>
            <Search size={18} className="search-icon" />
            <input
              className="input-search"
              placeholder="Buscar cliente, código o ID..."
              value={search}
              onChange={(e) => buscar(e.target.value)}
            />

            {/* AUTOCOMPLETE */}
            {search.length > 0 && (
              <div className="autocomplete-box">
                {reservas
                  .filter(
                    (r) =>
                      r.cliente
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      r.codigoReserva
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      r.reservaID.toString().includes(search)
                  )
                  .slice(0, 8)
                  .map((r) => (
                    <div
                      key={r.reservaID}
                      className="autocomplete-item"
                      onClick={() => {
                        buscar(r.codigoReserva);
                        setSearch(r.codigoReserva);
                      }}
                    >
                      <strong>{r.cliente}</strong>
                      <span className="ac-small">
                        {r.codigoReserva} — ID {r.reservaID}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <select
            className="input-filter"
            value={estadoFilter}
            onChange={(e) => filtrarEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="A">Activa</option>
            <option value="P">Pendiente</option>
            <option value="C">Cancelada</option>
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
            {listaFinal.map((r) => (
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
