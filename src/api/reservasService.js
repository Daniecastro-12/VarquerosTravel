import api from "./api";

export async function getReservas() {
  const res = await api.get("/reservas");
  return res.data;
}

export async function deleteReserva(id) {
  return await api.delete(`/reservas/${id}`);
}
