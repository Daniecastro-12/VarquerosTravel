import React, { useState, useEffect, useRef } from "react";
import "./AutoInput.css";

export default function AutoInput({
  label,
  items = [],
  keyField,
  textField,
  extraField,
  value,
  onChange,
  onSelectObject,
  placeholder = "Seleccionar..."
}) {
  const [texto, setTexto] = useState("");
  const [filtrados, setFiltrados] = useState([]);
  const [showList, setShowList] = useState(false);
  const boxRef = useRef(null);

  // sincroniza texto cuando cambia el value real
  useEffect(() => {
    const seleccionado = items.find(
      (x) => String(x[keyField]) === String(value)
    );

    if (seleccionado) {
      setTexto(
        `${seleccionado[textField]} ${
          seleccionado[extraField] ? "- " + seleccionado[extraField] : ""
        }`
      );
    } else {
      setTexto("");
    }

    setFiltrados(items);
  }, [value, items, keyField, textField, extraField]);

  // filtrar mientras escribe
  const filtrar = (txt) => {
    setTexto(txt);
    const find = txt.toLowerCase().trim();

    if (!find) {
      setFiltrados(items);
      setShowList(true);
      return;
    }

    const f = items.filter((item) => {
      const campo = `${item[textField]} ${item[extraField] || ""}`.toLowerCase();
      return campo.includes(find);
    });

    setFiltrados(f);
    setShowList(true);
  };

  // seleccionar elemento
  const seleccionar = (item) => {
    setTexto(
      `${item[textField]} ${
        item[extraField] ? "- " + item[extraField] : ""
      }`
    );

    onChange?.(item[keyField]);
    onSelectObject?.(item);
    setShowList(false);
  };

  // abrir lista
  const abrirLista = () => {
    setFiltrados(items);
    setShowList(true);
  };

  // cerrar si clic afuera
  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="auto-container" ref={boxRef}>
      {label && <label className="auto-label">{label}</label>}

      <input
        className="auto-input reserva-input"
        type="text"
        placeholder={placeholder}
        value={texto}
        onFocus={abrirLista}
        onChange={(e) => filtrar(e.target.value)}
      />

      {showList && filtrados.length > 0 && (
        <div className="auto-list">
          {filtrados.map((item) => (
            <div
              key={item[keyField]}
              className="auto-item"
              onClick={() => seleccionar(item)}
            >
              <span className="auto-main">{item[textField]}</span>
              <span className="auto-extra">{item[extraField] || ""}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
