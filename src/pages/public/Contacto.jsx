import React from "react";
import "./Contacto.css";

// ICONOS
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contacto() {
  return (
    <div className="contacto-container">

      {/* TÍTULO GLOBAL */}
      <h1 className="contact-main-title">Contáctanos — Varqueros Travels</h1>

      {/* INFO + MAPA */}
      <div className="contacto-top">

        {/* Caja de Información */}
        <div className="contact-info-card">
          <h2>Estamos Aquí Para Ayudarte</h2>
          <p className="contact-description">
            Nuestro equipo está listo para brindarte la mejor atención y diseñar un viaje a tu medida.
          </p>

          <div className="contact-row">
            <FaPhoneAlt className="contact-icon" />
            <span>+504 9999-9999</span>
          </div>

          <div className="contact-row">
            <FaEnvelope className="contact-icon" />
            <span>info@varquerostravel.com</span>
          </div>

          <div className="contact-row">
            <FaMapMarkerAlt className="contact-icon" />
            <span>Comayagua, Honduras</span>
          </div>
        </div>

        {/* MAPA */}
        <div className="contact-map">
          <iframe
            title="Comayagua Mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.3274209220605!2d-87.65372582564997!3d14.46077058596765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6fa34783cc58db%3A0x5a2c22cd5db3cd14!2sComayagua!5e0!3m2!1ses-419!2shn!4v1700000000000"
            loading="lazy"
          ></iframe>
        </div>

      </div>

      {/* FORMULARIO */}
      <div className="contact-form-card">

        <input type="text" placeholder="Nombre Completo" className="input-field" />
        <input type="email" placeholder="Email" className="input-field" />
        <input type="text" placeholder="Teléfono" className="input-field" />
        <textarea placeholder="Cuéntanos sobre tu viaje ideal..." className="input-textarea"></textarea>

        <button className="contact-btn">Enviar Mensaje</button>

      </div>

    </div>
  );
}
