import React from "react";
import "./ImageModal.css";

export default function ImageModal({ open, onClose, data }) {
  if (!open || !data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={data.img} alt={data.title} className="modal-img" />

        <h3 className="modal-title">{data.title}</h3>
        <p className="modal-location">{data.location}</p>
        <p className="modal-desc">{data.description}</p>

        <button className="modal-close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
