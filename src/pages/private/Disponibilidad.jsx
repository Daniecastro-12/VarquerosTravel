import React, { useEffect, useState } from "react";
import "./Disponibilidad.css";

export default function Disponibilidad() {
  const API = "https://reserva-turistica.onrender.com/api/DisponibilidadTours";
  const API_TOURS = "https://reserva-turistica.onrender.com/api/Tours";

  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState([]);

  const [fechaActual, setFechaActual] = useState(new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  const [modalCrear, setModalCrear] = useState(null);
  const [modalEditar, setModalEditar] = useState(null);

  // ==========================================
  // CARGAR TOURS
  // ==========================================
  useEffect(() => {
    cargarTours();
  }, []);

  const cargarTours = async () => {
    const res = await fetch(API_TOURS);
    const data = await res.json();
    setTours(data);
    setSelectedTour(data[0]?.id);
  };

  // ==========================================
  // CARGAR DISPONIBILIDAD
  // ==========================================
  useEffect(() => {
    if (!selectedTour) return;
    cargarDisponibilidad();
  }, [selectedTour]);

  const cargarDisponibilidad = async () => {
    const res = await fetch(API);
    const data = await res.json();

    const filtrado = data.filter((d) => d.tourId === selectedTour);
    setDisponibilidad(filtrado);

    if (filtrado.length > 0) {
      const ordenadas = filtrado.sort(
        (a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio)
      );
      const primeraFecha = new Date(ordenadas[0].fechaInicio);

      setFechaActual(
        new Date(
          primeraFecha.getFullYear(),
          primeraFecha.getMonth(),
          1
        )
      );
    }
  };

  // ==========================================
  // DÍAS DEL MES
  // ==========================================
  const diasMes = () => {
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();
    return new Date(año, mes + 1, 0).getDate();
  };

  const cambiarMes = (dir) => {
    const newDate = new Date(fechaActual);
    newDate.setMonth(fechaActual.getMonth() + dir);
    setFechaActual(newDate);
    setDiaSeleccionado(null);
  };

  const obtenerDataDia = (dia) => {
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;

    const fecha = `${año}-${mes.toString().padStart(2, "0")}-${dia
      .toString()
      .padStart(2, "0")}T00:00:00`;

    return disponibilidad.find((d) => d.fechaInicio === fecha) || null;
  };

  // ==============================================================
  // CLICK EN DÍA → CREAR O EDITAR DISPONIBILIDAD
  // ==============================================================
  const handleDayClick = (dia) => {
    const data = obtenerDataDia(dia);

    const fechaHumana = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      dia
    ).toLocaleDateString();

    if (!data) {
      setModalCrear({
        fecha: fechaHumana,
        dia,
        cupoTotal: "",
      });
      return;
    }

    setModalEditar({
      ...data,
      fecha: fechaHumana,
    });
  };

  // ==============================================================
  // CREAR DISPONIBILIDAD (POST)
  // ==============================================================
  const crearDisponibilidad = async () => {
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = modalCrear.dia;

    const fechaCompleta = `${año}-${String(mes).padStart(2, "0")}-${String(
      dia
    ).padStart(2, "0")}T00:00:00`;

    const body = {
      tourId: selectedTour,
      fechaInicio: fechaCompleta,
      cupoTotal: parseInt(modalCrear.cupoTotal),
      cupoDisponible: parseInt(modalCrear.cupoTotal),
    };

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setModalCrear(null);
    cargarDisponibilidad();
  };

  // ==============================================================
  // EDITAR DISPONIBILIDAD (PUT)
  // ==============================================================
  const guardarCambios = async () => {
    const body = {
      id: modalEditar.id,
      tourId: modalEditar.tourId,
      fechaInicio: modalEditar.fechaInicio,
      cupoTotal: parseInt(modalEditar.cupoTotal),
      cupoDisponible: parseInt(modalEditar.cupoDisponible),
    };

    await fetch(`${API}/${modalEditar.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setModalEditar(null);
    cargarDisponibilidad();
  };

  return (
    <div className="disp-wrapper">

      {/* SELECTOR TOUR */}
      <div className="disp-top-card">
        <label>Disponibilidad de Tours</label>

        <select
          value={selectedTour}
          onChange={(e) => setSelectedTour(parseInt(e.target.value))}
        >
          {tours.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="disp-grid">

        {/* CALENDARIO */}
        <div className="disp-calendar-card fadeIn">
          <div className="disp-cal-header">
            <button onClick={() => cambiarMes(-1)}>&lt;</button>

            <h2>
              {fechaActual.toLocaleString("es-HN", { month: "long" })}{" "}
              {fechaActual.getFullYear()}
            </h2>

            <button onClick={() => cambiarMes(1)}>&gt;</button>
          </div>

          <div className="disp-weekdays">
            <span>Sun</span><span>Mon</span><span>Tue</span>
            <span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          <div className="disp-days">
            {Array.from({ length: diasMes() }, (_, i) => i + 1).map((dia) => {
              const dataDia = obtenerDataDia(dia);

              let clase = "disp-day";
              if (dataDia?.cupoDisponible === 0) clase += " sin-cupo";
              if (dataDia?.cupoDisponible > 0 && dataDia?.cupoDisponible <= 5)
                clase += " poco-cupo";

              return (
                <div
                  key={dia}
                  className={clase}
                  onClick={() => handleDayClick(dia)}
                >
                  <span>{dia}</span>

                  {dataDia && (
                    <small className="cupo-pill">
                      {dataDia.cupoDisponible} cupos
                    </small>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="disp-right-col">

          <div className="disp-info-card fadeIn">
            <h3>Fechas Disponibles</h3>

            {disponibilidad.length === 0 && <p>No hay fechas disponibles.</p>}

            {disponibilidad.map((d) => (
              <div key={d.id} className="info-line">
                {new Date(d.fechaInicio).toLocaleDateString()} — Cupos:{" "}
                {d.cupoDisponible}
              </div>
            ))}
          </div>

          <div className="disp-info-card fadeIn">
            <h3>Información del Tour</h3>

            <p><b>Nombre:</b> {tours.find(t => t.id === selectedTour)?.nombre}</p>
            <p><b>Descripción:</b> {tours.find(t => t.id === selectedTour)?.descripcion}</p>
            <p><b>Duración:</b> {tours.find(t => t.id === selectedTour)?.duracionHora}</p>
            <p><b>Precio:</b> L. {tours.find(t => t.id === selectedTour)?.precio}</p>
          </div>
        </div>
      </div>

      {/* =============================
          MODAL CREAR
      ============================= */}
      {modalCrear && (
        <div className="modal-overlay" onClick={() => setModalCrear(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>

            <h2>Crear Disponibilidad</h2>
            <p><b>Fecha:</b> {modalCrear.fecha}</p>

            <label className="modal-label">Cupo Total</label>
            <input
              type="number"
              className="modal-input"
              value={modalCrear.cupoTotal}
              onChange={(e) =>
                setModalCrear({ ...modalCrear, cupoTotal: e.target.value })
              }
            />

            <div className="modal-buttons">
              <button className="modal-btn-save" onClick={crearDisponibilidad}>
                Crear Disponibilidad
              </button>
              <button className="modal-btn-close" onClick={() => setModalCrear(null)}>
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =============================
          MODAL EDITAR
      ============================= */}
      {modalEditar && (
        <div className="modal-overlay" onClick={() => setModalEditar(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>

            <h2>Editar Disponibilidad</h2>
            <p><b>Fecha:</b> {modalEditar.fecha}</p>

            <label className="modal-label">Cupo Total</label>
            <input
              type="number"
              className="modal-input"
              value={modalEditar.cupoTotal}
              onChange={(e) =>
                setModalEditar({ ...modalEditar, cupoTotal: e.target.value })
              }
            />

            <label className="modal-label">Cupo Disponible</label>
            <input
              type="number"
              className="modal-input"
              value={modalEditar.cupoDisponible}
              onChange={(e) =>
                setModalEditar({
                  ...modalEditar,
                  cupoDisponible: e.target.value,
                })
              }
            />

            <div className="modal-buttons">
              <button className="modal-btn-save" onClick={guardarCambios}>
                Guardar Cambios
              </button>
              <button className="modal-btn-close" onClick={() => setModalEditar(null)}>
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
