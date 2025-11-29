import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Layout privado
import MainLayout from "./layout/MainLayout";

// Componentes públicos
import PublicNavbar from "./components/PublicNavbar";
import Footer from "./components/Footer";

// Páginas públicas
import Home from "./pages/public/Home";
import Destinos from "./pages/public/Destinos";
import Servicios from "./pages/public/Servicios";
import Contacto from "./pages/public/Contacto";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

// Páginas privadas
import Dashboard from "./pages/private/Dashboard";
import Clientes from "./pages/private/Clientes";
import ServiciosAdmin from "./pages/private/ServiciosAdmin";
import NuevaReservacion from "./pages/private/NuevaReservacion";
import Reservaciones from "./pages/private/Reservaciones";
import Disponibilidad from "./pages/private/Disponibilidad";

// IMPORTANTE: estilos globales responsive
import "./styles/app-layout.css";
import "./styles/global-responsive.css";

export default function App() {
  const location = useLocation();
  const isLogged = localStorage.getItem("loggedIn") === "true";

  const privateRoutes = [
    "/dashboard",
    "/clientes",
    "/servicios-admin",
    "/reservaciones",
    "/nueva-reservacion",
    "/facturas",
    "/disponibilidad",
  ];

  const isPrivate = privateRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  if (isPrivate && !isLogged) {
    return <Navigate to="/login" replace />;
  }

  const hideLayout = ["/login", "/registro"];

  const shouldHideLayout = hideLayout.some((r) =>
    location.pathname.startsWith(r)
  );

  return (
    <div className="app-wrapper">
      {!shouldHideLayout && !isPrivate && <PublicNavbar />}

      <div style={{ paddingTop: !shouldHideLayout && !isPrivate ? "90px" : "0px" }}>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* Private pages */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/servicios-admin" element={<ServiciosAdmin />} />
            <Route path="/reservaciones" element={<Reservaciones />} />
            <Route path="/nueva-reservacion" element={<NuevaReservacion />} />
            <Route path="/disponibilidad" element={<Disponibilidad />} />
          </Route>
        </Routes>
      </div>

      {!shouldHideLayout && !isPrivate && <Footer />}
    </div>
  );
}
