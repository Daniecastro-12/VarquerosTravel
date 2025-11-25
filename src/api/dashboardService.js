// src/api/dashboardService.js

import api from "./api";

// Obtener conteos del Dashboard
export const getDashboardStats = async () => {
  try {
    const [clientes, reservas, servicios] = await Promise.all([
      api.get("/Clientes"),
      api.get("/Reservas"),
      api.get("/Servicios")
    ]);

    return {
      totalClientes: clientes.data.length,
      totalReservas: reservas.data.length,
      totalServicios: servicios.data.length
    };

  } catch (error) {
    console.error("Error cargando KPIs:", error);
    return {
      totalClientes: 0,
      totalReservas: 0,
      totalServicios: 0
    };
  }
};

// Últimas reservaciones reales
export const getUltimasReservas = async () => {
  try {
    const res = await api.get("/Reservas");

    return res.data
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);

  } catch (error) {
    console.error("Error cargando últimas reservas:", error);
    return [];
  }
};

// Imágenes externas de turismo
export const getDestinosImg = async () => {
  try {
    const res = await fetch("https://travel-api-production.up.railway.app/images");
    return await res.json();

  } catch (error) {
    console.error("Error cargando imágenes de destinos:", error);
    return [];
  }
};
