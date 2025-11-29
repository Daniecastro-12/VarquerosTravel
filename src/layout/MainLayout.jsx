import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PrivateNavbar from "../components/PrivateNavbar";
import RightPanel from "../components/RightPanel";
import "./MainLayout.css";
import { useState, useEffect } from "react";

export default function MainLayout() {

  const [usuario, setUsuario] = useState({
    nombre: localStorage.getItem("nombrePerfil") || "Usuario Administrador",
    correo: localStorage.getItem("correoPerfil") || "example@mail.com",
    rol: "Administrador",
    foto: localStorage.getItem("fotoPerfil") || ""
  });

  const [panelOpen, setPanelOpen] = useState(false);
  const [panelTipo, setPanelTipo] = useState("perfil");

  const abrirPanel = (tipo) => {
    setPanelTipo(tipo);
    setPanelOpen(true);
  };

  return (
    <div className="layout-container">

      {/* SIDE BAR */}
      <aside className="layout-sidebar">
        <Sidebar />
      </aside>

      {/* CONTENIDO */}
      <div className="layout-content">
        
        <header className="layout-header">
          <PrivateNavbar 
            onOpenPanel={abrirPanel}
            usuario={usuario}
          />
        </header>

        <main className="layout-main">
          <Outlet />
        </main>
      </div>

      <RightPanel 
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        usuario={usuario}
        setUsuario={setUsuario}
      />
    </div>
  );
}
