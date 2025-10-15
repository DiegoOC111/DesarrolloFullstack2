
import React from "react";
import img from "../assets/images/Imagen del equipo.png";

export default function About() {
  return (
    <div className="container mt-5">
      <div className="card card-custom shadow-sm mb-4">
        <img 
          src= {img}
          className="card-img-top" 
          alt="Equipo Level-up Gamer" 
        />
        <div className="card-body text-center">
          <h5 className="card-title">¿Quiénes somos?</h5>
          <p className="card-text" style={{ color: "#000000" }}>
            Somos una tienda online dedicada a satisfacer las necesidades de los entusiastas de los videojuegos en Chile. Lanzada hace dos años como respuesta a la creciente demanda durante la pandemia, Level-Up Gamer ofrece una amplia gama de productos para gamers, desde consolas y accesorios hasta computadores y sillas especializadas.
          </p>
        </div>
      </div>

      <div className="card card-custom shadow-sm mb-4">
        <div className="card-body text-center">
          <h5 className="card-title">Nuestra Misión</h5>
          <p className="card-text"style={{ color: "#000000" }}>
            Proporcionar productos de alta calidad para gamers en todo Chile, ofreciendo una experiencia de compra única y personalizada, con un enfoque en la satisfacción del cliente y el crecimiento de la comunidad gamer.
          </p>
        </div>
      </div>

      <div className="card card-custom shadow-sm mb-4">
        <div className="card-body text-center">
          <h5 className="card-title">Nuestra Visión</h5>
          <p className="card-text"style={{ color: "#000000" }}>
            Ser la tienda online líder en productos para gamers en Chile, reconocida por su innovación, servicio al cliente excepcional, y un programa de fidelización basado en gamificación que recompense a nuestros clientes más fieles.
          </p>
        </div>
      </div>
    </div>
  );
}
