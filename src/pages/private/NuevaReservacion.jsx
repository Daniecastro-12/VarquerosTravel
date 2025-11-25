import React, { useState, useEffect } from "react";
import "./NuevaReservacion.css";

export default function NuevaReservacion() {
  const API_CLIENTES = "https://reserva-turistica.onrender.com/api/Clientes";
  const API_SERVICIOS = "https://reserva-turistica.onrender.com/api/Servicios";
  const API_HOTELES = "https://reserva-turistica.onrender.com/api/Hotels";
  const API_TOURS = "https://reserva-turistica.onrender.com/api/Tours";
  const API_PAQUETES = "https://reserva-turistica.onrender.com/api/PaqueteTours";

  const API_RESERVAS = "https://reserva-turistica.onrender.com/api/Reservas";
  const API_RESERVA_SERVICIOS = "https://reserva-turistica.onrender.com/api/ReservaServicios";
  const API_RESERVA_TOURS = "https://reserva-turistica.onrender.com/api/ReservaTours";

  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [hoteles, setHoteles] = useState([]);
  const [tours, setTours] = useState([]);
  const [paquetes, setPaquetes] = useState([]);

  const [form, setForm] = useState({
    clienteId: "",
    servicioId: "",
    precioServicio: 0,

    tourId: "",
    precioTour: 0,

    hotelId: "",
    precioHotel: 0,

    paqueteId: "",
    precioPaquete: 0,

    fecha: "",
    notas: "",
  });

  useEffect(() => {
    async function load() {
      try {
        setClientes(await (await fetch(API_CLIENTES)).json());
        setServicios(await (await fetch(API_SERVICIOS)).json());
        setHoteles(await (await fetch(API_HOTELES)).json());
        setTours(await (await fetch(API_TOURS)).json());
        setPaquetes(await (await fetch(API_PAQUETES)).json());
      } catch {
        alert("Error cargando datos.");
      }
    }
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // CÁLCULOS
  const subtotal =
    Number(form.precioServicio) +
    Number(form.precioTour) +
    Number(form.precioHotel) +
    Number(form.precioPaquete);

  const impuesto = subtotal * 0.1;
  const total = subtotal + impuesto;

  // --------------------------------------------------------
  //  GUARDAR RESERVA Y DETALLES
  // --------------------------------------------------------
  const crearReserva = async () => {
    if (!form.clienteId || !form.fecha) {
      alert("Seleccione cliente y fecha.");
      return;
    }

    // -----------------------------------
    // 1) GUARDAR RESERVA PRINCIPAL
    // -----------------------------------
    const nuevaReserva = {
      codigoReserva: Math.floor(Math.random() * 9000) + 1000,
      estado: "A",
      total,
      clienteId: Number(form.clienteId),
      servicioId: null,
      tourId: null,
      hotelId: null,
      paqueteId: null,
      fecha: form.fecha,
      notas: form.notas,
    };

    let reservaId = null;

    try {
      const resp = await fetch(API_RESERVAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaReserva),
      });

      if (!resp.ok) {
        alert("Error guardando la reserva.");
        return;
      }

      const data = await resp.json();
      reservaId = data.id;
    } catch {
      alert("Error con el servidor.");
      return;
    }

    // -----------------------------------
    // 2) GUARDAR SERVICIOS
    // -----------------------------------
    async function guardarServicio(servicioId, precio) {
      if (!servicioId || precio <= 0) return;

      const body = {
        servicioId: Number(servicioId),
        reservaId: reservaId,
        fechaInicio: form.fecha,
        fechaFin: form.fecha,
        precioUnidad: Number(precio),
        subtotal: Number(precio),
        total: Number(precio),
      };

      await fetch(API_RESERVA_SERVICIOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    await guardarServicio(form.servicioId, form.precioServicio);
    await guardarServicio(form.hotelId, form.precioHotel);
    await guardarServicio(form.paqueteId, form.precioPaquete);

    // -----------------------------------
    // 3) GUARDAR TOUR
    // -----------------------------------
    if (form.tourId && form.precioTour > 0) {
      const bodyTour = {
        reservaId,
        tourId: Number(form.tourId),
        cantidad: 1,
        subtotal: Number(form.precioTour),
        total: Number(form.precioTour),
      };

      await fetch(API_RESERVA_TOURS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyTour),
      });
    }

    alert("Reserva creada correctamente ✔");
    window.location.href = "/reservaciones";
  };

  return (
    <div className="reserva-layout">
      {/* FORM */}
      <div className="reserva-card">
        <h2 className="reserva-title">Crear Nueva Reservación</h2>

        {/* CLIENTE */}
        <label className="reserva-label">Cliente</label>
        <select
          name="clienteId"
          value={form.clienteId}
          onChange={handleChange}
          className="reserva-input"
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              Cliente #{c.codigoCliente}
            </option>
          ))}
        </select>

        {/* SERVICIO */}
        <div className="row-two">
          <div>
            <label className="reserva-label">Servicio</label>
            <select
              name="servicioId"
              value={form.servicioId}
              onChange={handleChange}
              className="reserva-input"
            >
              <option value="">Seleccione un servicio</option>
              {servicios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="reserva-label">Precio</label>
            <input
              type="number"
              name="precioServicio"
              value={form.precioServicio}
              onChange={handleChange}
              className="reserva-input"
            />
          </div>
        </div>

        {/* TOUR */}
        <div className="row-two">
          <div>
            <label className="reserva-label">Tour</label>
            <select
              name="tourId"
              value={form.tourId}
              onChange={handleChange}
              className="reserva-input"
            >
              <option value="">Seleccione un tour</option>
              {tours.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="reserva-label">Precio</label>
            <input
              name="precioTour"
              type="number"
              value={form.precioTour}
              onChange={handleChange}
              className="reserva-input"
            />
          </div>
        </div>

        {/* HOTEL */}
        <div className="row-two">
          <div>
            <label className="reserva-label">Hotel</label>
            <select
              name="hotelId"
              value={form.hotelId}
              onChange={handleChange}
              className="reserva-input"
            >
              <option value="">Seleccione un hotel</option>
              {hoteles.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="reserva-label">Precio</label>
            <input
              name="precioHotel"
              type="number"
              value={form.precioHotel}
              onChange={handleChange}
              className="reserva-input"
            />
          </div>
        </div>

        {/* PAQUETE */}
        <div className="row-two">
          <div>
            <label className="reserva-label">Paquete</label>
            <select
              name="paqueteId"
              value={form.paqueteId}
              onChange={handleChange}
              className="reserva-input"
            >
              <option value="">Seleccione un paquete</option>
              {paquetes.map((p) => (
                <option key={p.paqueteId} value={p.paqueteId}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="reserva-label">Precio</label>
            <input
              name="precioPaquete"
              type="number"
              value={form.precioPaquete}
              onChange={handleChange}
              className="reserva-input"
            />
          </div>
        </div>

        {/* FECHA */}
        <label className="reserva-label">Fecha de la reservación</label>
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          className="reserva-input fecha-input"
        />

        {/* NOTAS */}
        <label className="reserva-label">Notas adicionales</label>
        <textarea
          name="notas"
          value={form.notas}
          onChange={handleChange}
          className="reserva-textarea"
        />
      </div>

      {/* RESUMEN */}
      <div className="resumen-card">
        <h3 className="resumen-title">Resumen de la Reservación</h3>

        <div className="resumen-row">
          <span>Cliente</span>
          <strong>
            {form.clienteId
              ? "Cliente #" +
                clientes.find((c) => c.id == form.clienteId)?.codigoCliente
              : "No seleccionado"}
          </strong>
        </div>

        <div className="resumen-row">
          <span>Servicio</span>
          <strong>L. {form.precioServicio || 0}</strong>
        </div>

        <div className="resumen-row">
          <span>Tour</span>
          <strong>L. {form.precioTour || 0}</strong>
        </div>

        <div className="resumen-row">
          <span>Hotel</span>
          <strong>L. {form.precioHotel || 0}</strong>
        </div>

        <div className="resumen-row">
          <span>Paquete</span>
          <strong>L. {form.precioPaquete || 0}</strong>
        </div>

        <div className="resumen-row">
          <span>Subtotal</span>
          <strong>L. {subtotal.toFixed(2)}</strong>
        </div>

        <div className="resumen-row">
          <span>Impuesto 10%</span>
          <strong>L. {impuesto.toFixed(2)}</strong>
        </div>

        <div className="resumen-total">
          <span>Total a pagar</span>
          <strong>L. {total.toFixed(2)}</strong>
        </div>

        <button className="btn-crear" onClick={crearReserva}>
          Crear Reservación
        </button>

        <button className="btn-cancelar" onClick={() => window.history.back()}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
