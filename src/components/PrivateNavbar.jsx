import "./PrivateNavbar.css";

export default function PrivateNavbar() {
  return (
    <nav className="private-nav">
      <div className="nav-left">
        <h1 className="nav-title">Varqueros Travel</h1>
        <span className="nav-subtitle">Plataforma de Reservaciones Turísticas</span>
      </div>

      <div className="nav-right">
        <div className="avatar">AD</div>
        <div>
          <p className="user-name">Usuario Administrador</p>
          <p className="user-role">Administrador</p>
        </div>
      </div>
    </nav>
  );
}
