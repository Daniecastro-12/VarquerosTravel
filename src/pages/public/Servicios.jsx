import React from "react";
import "./Servicios.css";

const vueloIcon = "https://cdn-icons-png.flaticon.com/512/854/854905.png";
const hotelIcon = "https://cdn-icons-png.flaticon.com/512/235/235889.png";
const tourIcon = "https://cdn-icons-png.flaticon.com/512/854/854878.png";
const grupoIcon = "https://cdn-icons-png.flaticon.com/512/1256/1256650.png"; 
const seguroIcon = "https://cdn-icons-png.flaticon.com/512/942/942748.png";
const soporteIcon = "https://cdn-icons-png.flaticon.com/512/1827/1827412.png";

const fondoVuelo = "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80";
const fondoHotel = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80";
const fondoTour = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80";
const fondoGrupo = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80"; 
const fondoSeguro = "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80";
const fondoSoporte = "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80";

export default function Servicios() {

  const servicios = [
    {
      icon: vueloIcon,
      bg: fondoVuelo,
      title: "Vuelos Premium",
      desc: "Selección de aerolíneas y rutas optimizadas para tu comodidad."
    },
    {
      icon: hotelIcon,
      bg: fondoHotel,
      title: "Hoteles de Lujo",
      desc: "Alojamientos exclusivos en los mejores destinos del mundo."
    },
    {
      icon: tourIcon,
      bg: fondoTour,
      title: "Tours Personalizados",
      desc: "Experiencias diseñadas según tus preferencias y estilo."
    },
    {
      icon: grupoIcon, 
      bg: fondoGrupo,  
      title: "Grupos Exclusivos",
      desc: "Viajes grupales con servicios VIP y guías especializados."
    },
    {
      icon: seguroIcon,
      bg: fondoSeguro,
      title: "Seguros Completos",
      desc: "Protección total para tu tranquilidad durante el viaje."
    },
    {
      icon: soporteIcon,
      bg: fondoSoporte,
      title: "Soporte 24/7",
      desc: "Asistencia permanente en cualquier momento y lugar."
    }
  ];

  return (
    <div className="servicios-container">

      <h1 className="serv-title">Servicios Premium</h1>

      <p className="serv-subtitle">
        Ofrecemos una experiencia completa con servicios de primera clase para que disfrutes cada momento
      </p>

      <div className="serv-grid">
        {servicios.map((item, index) => (
          <div
            key={index}
            className="serv-card"
            style={{ backgroundImage: `url(${item.bg})` }}
          >
            <div className="serv-content">
              <img src={item.icon} className="serv-icon" alt="icono servicio" />

              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
