import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PrivateNavbar from "../components/PrivateNavbar";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="layout-container">

      {/* SIDEBAR FIJO */}
      <aside className="layout-sidebar">
        <Sidebar />
      </aside>

      {/* CONTENIDO */}
      <div className="layout-content">

        {/* NAVBAR SUPERIOR */}
        <header className="layout-header">
          <PrivateNavbar />
        </header>

        {/* ZONA PRINCIPAL */}
        <main className="layout-main">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
