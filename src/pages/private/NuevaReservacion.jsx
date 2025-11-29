import React, { useState, useEffect } from "react";
import "./NuevaReservacion.css";
import AutoInput from "../../components/AutoInput";

export default function NuevaReservacion() {
  // ENDPOINTS
  const API_CLIENTES = "https://reserva-turistica.onrender.com/api/Reservas/vista-clientes";
  const API_SERVICIOS = "https://reserva-turistica.onrender.com/api/Servicios";
  const API_HOTELES = "https://reserva-turistica.onrender.com/api/Hotels";
  const API_TOURS = "https://reserva-turistica.onrender.com/api/Tours";
  const API_PAQUETES = "https://reserva-turistica.onrender.com/api/PaqueteTours";
  const API_CREAR = "https://reserva-turistica.onrender.com/api/Reservas/crear-reservacion";

  const API_FACTURAR = "https://reserva-turistica.onrender.com/api/Facturas/generar";
  const API_FACTURA_COMPLETA = "https://reserva-turistica.onrender.com/api/Facturas/obtener-completa/";

  // ESTADOS
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [tours, setTours] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [hoteles, setHoteles] = useState([]);

  const [reservaId, setReservaId] = useState(null);
  const [factura, setFactura] = useState(null);

  const [form, setForm] = useState({
    clienteId: "",
    monedaId: 1,
    metodoPagoId: 1,
    servicioId: "",
    tourId: "",
    hotelId: "",
    paqueteId: "",
    fecha: "",
    total: "",
    observacion: ""
  });

  // CARGAR DATOS
  useEffect(() => {
    async function load() {
      try {
        const cli = await (await fetch(API_CLIENTES)).json();
        setClientes(
          cli.map(c => ({
            id: c.clienteID,
            codigo: c.codigoCliente,
            nombre: c.nombreCompleto
          }))
        );

        setServicios(await (await fetch(API_SERVICIOS)).json());
        setHoteles(await (await fetch(API_HOTELES)).json());
        setTours(await (await fetch(API_TOURS)).json());
        setPaquetes(await (await fetch(API_PAQUETES)).json());
      } catch (err) {
        console.log("Error cargando datos:", err);
      }
    }
    load();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // ===========================
  // CREAR RESERVA
  // ===========================
  const crearReserva = async () => {
    if (!form.clienteId || !form.fecha || !form.total) {
      alert("Debe llenar cliente, fecha y total.");
      return;
    }

    const payload = {
      clienteID: Number(form.clienteId),
      servicioID: Number(form.servicioId) || 0,
      tourID: Number(form.tourId) || 0,
      hotelID: Number(form.hotelId) || 0,
      paqueteID: Number(form.paqueteId) || 0,
      fechaReserva: form.fecha,
      pnTotal: Number(form.total)
    };

    try {
      const resp = await fetch(API_CREAR, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();
      console.log("Reserva creada:", data);

      if (data.reservaID) {
        setReservaId(data.reservaID);
        setFactura(null);
      } else {
        alert("Error creando la reserva");
      }
    } catch (err) {
      console.log("Error creando reserva:", err);
    }
  };

  // ===========================
  // GENERAR FACTURA
  // ===========================
  const generarFactura = async () => {
    if (!reservaId) {
      alert("Debe crear la reserva primero");
      return;
    }

    try {
      const resp = await fetch(API_FACTURAR, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reservaID: reservaId,
          monedaID: Number(form.monedaId)
        })
      });

      if (!resp.ok) {
        alert("Error creando la factura");
        return;
      }

      // Obtener factura completa
      const facturaResp = await fetch(API_FACTURA_COMPLETA + reservaId);
      const facturaData = await facturaResp.json();

      console.log("Factura completa:", facturaData);

      setFactura(facturaData);

      alert("Factura creada con éxito");

    } catch (err) {
      console.log("Error generando factura:", err);
    }
  };

  // DATOS para vista previa
  const clienteSel = clientes.find(c => c.id == form.clienteId);
  const nombreCliente = clienteSel?.nombre || "—";

  const nombreServicio = servicios.find(x => x.id == form.servicioId)?.nombre || "—";
  const nombreTour = tours.find(x => x.id == form.tourId)?.nombre || "—";
  const nombreHotel = hoteles.find(x => x.id == form.hotelId)?.nombre || "—";
  const nombrePaquete = paquetes.find(x => x.paqueteId == form.paqueteId)?.nombre || "—";

  // FALLBACK cuando el backend NO devuelve datos
  const fc = factura || {};

  const facturaCliente = fc.clienteNombreCompleto || nombreCliente;
  const facturaDNI = fc.dni || "—";
  const facturaCorreo = fc.correo_electronico || "—";
  const facturaDireccion = fc.direccion || "—";

  const facturaServicio = fc.servicios?.[0]?.servicio || nombreServicio;
  const facturaTour = fc.tours?.[0]?.tour || nombreTour;
  const facturaHotel = fc.hoteles?.[0]?.hotel || nombreHotel;
  const facturaPaquete = fc.paquetes?.[0]?.paquete || nombrePaquete;

  const facturaTotal = fc.totalFactura || form.total;

  return (
    <div className="reserva-layout">

      {/* FORMULARIO IZQUIERDA */}
      <div className="reserva-card">
        <h2 className="reserva-title">Crear Nueva Reservación</h2>

        <AutoInput
          label="Cliente"
          items={clientes}
          keyField="id"
          textField="codigo"
          extraField="nombre"
          value={form.clienteId}
          onChange={v => setForm({ ...form, clienteId: v })}
        />

        <label className="reserva-label">Moneda</label>
        <select name="monedaId" value={form.monedaId} onChange={handleChange} className="reserva-input">
          <option value="1">Lempiras</option>
          <option value="2">USD</option>
        </select>

        <label className="reserva-label">Método de Pago</label>
        <select name="metodoPagoId" value={form.metodoPagoId} onChange={handleChange} className="reserva-input">
          <option value="1">Efectivo</option>
          <option value="2">Tarjeta</option>
          <option value="3">Transferencia</option>
        </select>

        <label className="reserva-label">Fecha</label>
        <input type="date" name="fecha" value={form.fecha}
          onChange={handleChange} className="reserva-input" />

        <AutoInput label="Servicio" items={servicios} keyField="id"
          textField="nombre" value={form.servicioId}
          onChange={v => setForm({ ...form, servicioId: v })} />

        <AutoInput label="Tour" items={tours} keyField="id"
          textField="nombre" value={form.tourId}
          onChange={v => setForm({ ...form, tourId: v })} />

        <AutoInput label="Hotel" items={hoteles} keyField="id"
          textField="nombre" value={form.hotelId}
          onChange={v => setForm({ ...form, hotelId: v })} />

        <AutoInput label="Paquete" items={paquetes} keyField="paqueteId"
          textField="nombre" value={form.paqueteId}
          onChange={v => setForm({ ...form, paqueteId: v })} />

        <label className="reserva-label">Total</label>
        <input type="number" name="total" value={form.total}
          onChange={handleChange} className="reserva-input" />

        <label className="reserva-label">Observación</label>
        <textarea name="observacion"
          value={form.observacion} onChange={handleChange}
          className="reserva-textarea"></textarea>

        <button className="btn-crear" onClick={crearReserva}>
          Crear Reservación
        </button>

        {reservaId && (
          <div className="id-box">ID de Reserva: <strong>{reservaId}</strong></div>
        )}

        <button className="btn-factura" onClick={generarFactura}>
          Generar Factura
        </button>
      </div>

      {/* RESUMEN + FACTURA */}
      <div className="contenedor-derecho">

        {/* RESUMEN */}
        <div className="resumen-card">
          <h3 className="resumen-title">Resumen</h3>

          <div className="resumen-row"><span>Cliente</span><strong>{nombreCliente}</strong></div>
          <div className="resumen-row"><span>Servicio</span><strong>{nombreServicio}</strong></div>
          <div className="resumen-row"><span>Tour</span><strong>{nombreTour}</strong></div>
          <div className="resumen-row"><span>Hotel</span><strong>{nombreHotel}</strong></div>
          <div className="resumen-row"><span>Paquete</span><strong>{nombrePaquete}</strong></div>
          <div className="resumen-row"><span>Total</span><strong>L. {form.total}</strong></div>
        </div>

        {/* FACTURA */}
        <div className="factura-box">
          <h2>Factura (Vista previa)</h2>

          {!factura ? (
            <>
              <p><strong>Cliente:</strong> {facturaCliente}</p>
              <p><strong>Servicio:</strong> {facturaServicio}</p>
              <p><strong>Tour:</strong> {facturaTour}</p>
              <p><strong>Hotel:</strong> {facturaHotel}</p>
              <p><strong>Paquete:</strong> {facturaPaquete}</p>
              <p><strong>Total estimado:</strong> L. {facturaTotal}</p>

              <small>Genera la factura para guardar los datos reales.</small>
            </>
          ) : (
            <>
              <h3>Factura #{factura.facturaID}</h3>

              <p><strong>Estado:</strong> {fc.estadoFactura || "Activa"}</p>
              <p><strong>Fecha emisión:</strong> {fc.fecha_Emision || "—"}</p>

              <p><strong>Cliente:</strong> {facturaCliente}</p>
              <p><strong>DNI:</strong> {facturaDNI}</p>
              <p><strong>Correo:</strong> {facturaCorreo}</p>
              <p><strong>Dirección:</strong> {facturaDireccion}</p>

              <h3>Servicios</h3>
              <p>{facturaServicio}</p>

              <h3>Tours</h3>
              <p>{facturaTour}</p>

              <h3>Hotel</h3>
              <p>{facturaHotel}</p>

              <h3>Paquete</h3>
              <p>{facturaPaquete}</p>

              <h2>Total Factura: L. {facturaTotal}</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
