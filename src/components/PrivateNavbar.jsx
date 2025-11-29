import "./PrivateNavbar.css";

export default function PrivateNavbar({ onOpenPanel, usuario }) {

  const iniciales =
    usuario.nombre ? usuario.nombre.substring(0, 2).toUpperCase() : "UA";

  return (
    <nav className="private-nav">

      {/* IZQUIERDA */}
      <div className="nav-left">
        <h1 className="nav-title">Varqueros Travel</h1>
        <span className="nav-subtitle">
          Plataforma de Reservaciones Turísticas
        </span>
      </div>

      {/* DERECHA */}
      <div className="nav-right">

        {/* BLOQUE USUARIO */}
        <div
          className="user-block"
          onClick={() => onOpenPanel("perfil")}
        >
          <div className="avatar">
            {usuario.foto ? (
              <img src={usuario.foto} className="avatar-img" />
            ) : (
              iniciales
            )}
          </div>

          <div className="user-info">
            <p className="user-name">{usuario.nombre}</p>
            <p className="user-role">{usuario.rol}</p>
          </div>
        </div>

        {/* MENÚ ⋮ */}
        <div
          className="menu-dots"
          onClick={(e) => {
            e.stopPropagation();
            onOpenPanel("menu");
          }}
        >
          ⋮
        </div>

      </div>
    </nav>
  );
}
