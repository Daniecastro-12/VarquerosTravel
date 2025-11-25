import React, { useState } from "react";
import "./Destinos.css";
import ImageModal from "../../components/ImageModal";

// ░░░ CLOUDINARY IMÁGENES ░░░

// Carrusel (Destinos Premium)
const carrusel = [
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021862/brasil_rsowvw.jpg",
    nombre: "Brasil",
    descripcion: "Playas hermosas, música y cultura vibrante."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021865/londres_lu67w3.jpg",
    nombre: "Londres",
    descripcion: "Historia, arquitectura y vida cosmopolita."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021866/disney_qlnacv.jpg",
    nombre: "Disney World",
    descripcion: "La magia donde los sueños se hacen realidad."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021865/italia_qn6qv6.jpg",
    nombre: "Italia",
    descripcion: "Arte, romance, historia y gastronomía."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021862/coma_kljucr.jpg",
    nombre: "Comayagua",
    descripcion: "Ciudad colonial llena de cultura e historia."
  }
];

// ░░░ DESTINOS INTERNACIONALES (8 IMÁGENES) ░░░
const destinos = [
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021865/china_dvzxir.jpg",
    nombre: "Muralla China",
    descripcion: "Una maravilla mundial que serpentea entre montañas."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021862/corea_uquawd.jpg",
    nombre: "Ciudad de Seúl",
    descripcion: "Modernidad, tradiciones y luces increíbles."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021863/globos_qv8tfz.jpg",
    nombre: "Capadocia",
    descripcion: "Paisajes surrealistas y vuelos en globo al amanecer."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021863/cancun_awp0qn.jpg",
    nombre: "Cancún",
    descripcion: "Playas turquesa, diversión y experiencias únicas."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021864/india_xpdyc1.jpg",
    nombre: "Taj Mahal",
    descripcion: "Una obra maestra del amor eterno."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021882/roma_yy9qzb.jpg",
    nombre: "Roma",
    descripcion: "Cultura, historia milenaria y gastronomía."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021881/playita_lke2u9.jpg",
    nombre: "Islas del Caribe",
    descripcion: "Aguas cristalinas y un paraíso tropical incomparable."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764021881/pueblito_cuuijr.jpg",
    nombre: "Pueblito Colonial",
    descripcion: "Calles coloridas y arquitectura histórica."
  }
];

// ░░░ HOTELES RECOMENDADOS ░░░
const hoteles = [
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764023365/images_10_pqpslt.jpg",
    nombre: "Hotel Costa Dorada",
    descripcion: "Vista al mar y servicios de lujo."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764023365/descarga_6_blpc5t.jpg",
    nombre: "Hotel Vista Mar",
    descripcion: "Relajación frente a la playa."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764023365/images_9_vtkmup.jpg",
    nombre: "Hotel Boutique Central",
    descripcion: "Elegancia y diseño moderno."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764023365/descarga_5_xvwair.jpg",
    nombre: "Hotel Paraíso Real",
    descripcion: "Experiencia premium todo incluido."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764023366/images_8_mgad7m.jpg",
    nombre: "Hotel Premium Deluxe",
    descripcion: "Confort y atención cinco estrellas."
  },
  {
    img: "https://res.cloudinary.com/dlrmisofc/image/upload/v1764023366/descarga_3_tjyxnq.jpg",
    nombre: "Hotel Tropical Resort",
    descripcion: "Ambiente natural y relajación tropical."
  }
];

export default function Destinos() {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [index, setIndex] = useState(0);

  const prevSlide = () =>
    setIndex(index === 0 ? carrusel.length - 1 : index - 1);

  const nextSlide = () =>
    setIndex(index === carrusel.length - 1 ? 0 : index + 1);

  return (
    <div className="destinos-page">

      {/* MODAL */}
      <ImageModal open={open} onClose={() => setOpen(false)} data={info} />

      {/* TÍTULO PRINCIPAL */}
      <h2 className="titulo-destinos">Destinos Internacionales</h2>

      {/* ░░░ CARRUSEL ░░░ */}
      <div className="carousel-container">
        <button className="carousel-button left-btn" onClick={prevSlide}>❮</button>

        <div className="carousel-content">
          <div
            className="carousel-card"
            onClick={() => {
              setInfo(carrusel[index]);
              setOpen(true);
            }}
          >
            <img src={carrusel[index].img} alt="" />
            <p>{carrusel[index].nombre}</p>
          </div>
        </div>

        <button className="carousel-button right-btn" onClick={nextSlide}>❯</button>
      </div>

      {/* ░░░ GRID DESTINOS ░░░ */}
      <h3 className="subtitulo">Explora el Mundo</h3>

      <div className="destinos-grid">
        {destinos.map((item, i) => (
          <div
            key={i}
            className="destino-card"
            onClick={() => {
              setInfo(item);
              setOpen(true);
            }}
          >
            <img src={item.img} alt="" />
            <p>{item.nombre}</p>
          </div>
        ))}
      </div>

      {/* ░░░ GRID HOTELES ░░░ */}
      <h3 className="subtitulo">Hoteles Recomendados</h3>

      <div className="hoteles-grid">
        {hoteles.map((item, i) => (
          <div
            key={i}
            className="hotel-card"
            onClick={() => {
              setInfo(item);
              setOpen(true);
            }}
          >
            <img src={item.img} alt="" />
            <p>{item.nombre}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
