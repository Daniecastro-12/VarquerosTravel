import React, { useState } from "react";
import "./Home.css";

import ImageModal from "../../components/ImageModal";


// 🟦 LOGO DESDE CLOUDINARY
const logo = "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021885/varqueros_travels_jlfmof.png";


const Home = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  // 🟩 IMÁGENES DEL GRID (CLOUDINARY)
  const lugares = [
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021865/londres_lu67w3.jpg",
      title: "Londres Moderno",
      location: "Reino Unido",
      description: "Arquitectura emblemática y cultura histórica."
    },
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021864/islas_y5ivsk.webp",
      title: "Islas Tropicales",
      location: "Islas de la Bahía",
      description: "Playas paradisíacas y clima cálido."
    },
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021866/mon_zqlfqx.jpg",
      title: "Montaña Azul",
      location: "La Esperanza, Honduras",
      description: "Naturaleza pura y aire fresco."
    },
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021881/pueblito_cuuijr.jpg",
      title: "Pueblito Colonial",
      location: "Antigua Guatemala",
      description: "Arquitectura colonial e historia."
    },
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021882/Tur_nxvod0.jpg",
      title: "Costa Dorada",
      location: "Tela, Honduras",
      description: "Atardeceres impresionantes y mar tranquilo."
    },
    {
      img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021862/coma_kljucr.jpg",
      title: "Catedral Histórica",
      location: "Comayagua, Honduras",
      description: "Patrimonio cultural colonial."
    }
  ];

  return (
    <div className="home-container">

      {/* MODAL */}
      <ImageModal 
        open={open}
        onClose={() => setOpen(false)}
        data={info}
      />

      {/* LOGO */}
      <div className="logo-section">
        <img 
          src={logo} 
          alt="Varqueros Travels Logo" 
          className="logo" 
        />
      </div>

      {/* GRID */}
      <div className="gallery">
        {lugares.map((item, index) => (
          <img
            key={index}
            src={item.img}
            className="gallery-img"
            onClick={() => {
              setInfo(item);
              setOpen(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
