import React, { useState } from "react";
import "./Autocomplete.css";

export default function Autocomplete({
  label,
  items,
  keyField,
  textField,
  value,
  onChange,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const lista = items.filter((item) =>
    item[textField].toLowerCase().includes(search.toLowerCase())
  );

  const seleccionar = (item) => {
    onChange(item[keyField]); // devuelve ID
    setSearch(item[textField]); // muestra el texto
    setOpen(false);
  };

  return (
    <div className="auto-container">
      {label && <label className="auto-label">{label}</label>}

      <input
        className="auto-input"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Escribe para buscar..."
      />

      {/* Caja de sugerencias */}
      {open && search.length > 0 && (
        <div className="auto-list">
          {lista.length === 0 && (
            <div className="no-result">Sin resultados</div>
          )}

          {lista.slice(0, 8).map((item) => (
            <div
              key={item[keyField]}
              className="auto-item"
              onClick={() => seleccionar(item)}
            >
              <strong>{item[textField]}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
