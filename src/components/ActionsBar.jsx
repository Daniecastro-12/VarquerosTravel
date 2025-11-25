import "./ActionsBar.css";

export default function ActionsBar({ search, setSearch, onSave, onEdit, onDelete }) {
  return (
    <div className="actions-bar">

      {/* Búsqueda */}
      <input
        type="text"
        className="search-input"
        placeholder="Buscar reserva..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Botones */}
      <div className="action-buttons">
        <button className="action-btn btn-save" onClick={onSave}>Guardar</button>
        <button className="action-btn btn-edit" onClick={onEdit}>Editar</button>
        <button className="action-btn btn-delete" onClick={onDelete}>Eliminar</button>
      </div>

    </div>
  );
}
