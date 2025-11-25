import React from "react";
import "./ImageModal.css";

export default function ImageModal({ open, onClose, data }) {
  if (!open || !data) return null;

  // --- SOPORTE PARA AMBAS PANTALLAS ---
  const title = data.title || data.nombre;
  const location = data.location || ""; 
  const desc = data.description || data.descripcion;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <img src={data.img} alt={title} className="modal-img" />

        <h3 className="modal-title">{title}</h3>

        {location && (
          <p className="modal-location">{location}</p>
        )}

        <p className="modal-desc">{desc}</p>

        <button className="modal-close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
