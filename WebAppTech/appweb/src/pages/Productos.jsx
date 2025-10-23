import  { useState, useEffect, useContext } from "react";
import React from "react";

import { CartContext } from "../components/CartContext"; 

const productosData = {
  "Juegos de mesa": [
    { nombre: "Catan", precio: "29990", imagen: "https://www.catan.com/sites/default/files/2021-07/0001021_catan-25th-anniversary-edition.png", link: "DatosDeCompraMiTienda.html" },
    { nombre: "Carcassonne", precio: "22990 ", imagen: "https://cundco.de/media/86/62/1d/1734536358/Carcassonne - Winter (Front).png?ts=1751635108", link: "DatosDeCompraMiTienda.html" },
    { nombre: "Dixit", precio: "24990", imagen: "https://cdn.svc.asmodee.net/production-libellud/uploads/image-converter/2021/12/caroussel-boite-dixit-mobile-1.webp", link: "DatosDeCompraMiTienda.html" }
  ],
  "Accesorios": [
    { nombre: "Auriculares", precio: "15990", imagen: "https://sony.scene7.com/is/image/sonyglobalsolutions/Float-Run_Primary_image_1200x1200?$mediaCarouselSmall$&fmt=png-alpha", link: "DatosDeCompraMiTienda.html" },
    { nombre: "Microfono", precio: "9990", imagen: "https://i0.wp.com/centralgamer.cl/wp-content/uploads/2025/02/1_1739136152000.png?fit=600%2C600&ssl=1", link: "DatosDeCompraMiTienda.html" }
  ],
  
  "Consolas": [
    { nombre: "PS5", precio: "499990", imagen: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-edition-left-image-block-01-en-24jun24?$1600px--t$", link: "DatosDeCompraMiTienda.html" },
    { nombre: "Xbox Series X", precio: "479990", imagen: "https://cms-assets.xboxservices.com/assets/d1/2c/d12cd3b8-3880-4dd4-8fe5-dc072a7904f0.png?n=642227_Hero-Gallery-0_C4_857x676.png", link: "DatosDeCompraMiTienda.html" },
    { nombre: "ROG ally x", precio: "999990", imagen: "https://github.com/DiegoOC111/DesarrolloFullstack2/blob/Carlos/Statics/Images/eshop_rc72la-nh007w_1-Photoroom.png?raw=true", link: "DatosDeCompraMiTienda.html" }
  ],
  "Computadoras Gamers": [
    { nombre: "PC Gamer Ryzen 7", precio: "899990", imagen: "https://i5.walmartimages.com/seo/iBUYPOWER-Gaming-PC-TraceMR258i-Ryzen-7-5700-RTX-3060-12GB-16GB-1TB-SSD-RGB-Windows-11-Home_3b288511-d6ed-4bec-92e9-f212f428a249.f9a9483cbf848f3cb6039f2848e52e2f.png", link: "DatosDeCompraMiTienda.html" },
    { nombre: "PC Gamer Intel i7", precio: "949990", imagen: "https://i5.walmartimages.com/seo/iBUYPOWER-Gaming-PC-TraceMR258i-Ryzen-7-5700-RTX-3060-12GB-16GB-1TB-SSD-RGB-Windows-11-Home_3b288511-d6ed-4bec-92e9-f212f428a249.f9a9483cbf848f3cb6039f2848e52e2f.png", link: "DatosDeCompraMiTienda.html" },
    { nombre: "ROG Strix g17", precio: "2704333", imagen: "https://dlcdnwebimgs.asus.com/files/media/B6E6970A-9728-4F44-A81E-4175939B8925/v1/img/display/strix-g-2022.png", link: "DatosDeCompraMiTienda.html" }
  ],
  "Sillas Gamers": [
    { nombre: "Silla Ergonomica Roja", precio: "129990", imagen: "https://www.sumar.cl/src_tienda/gallery/47556/silla-gamer-roja-png.png", link: "DatosDeCompraMiTienda.html" },
    { nombre: "Silla Gamer Azul", precio: "139990", imagen: "https://cdnx.jumpseller.com/hypelegend/image/25957473/resize/640/640?1701708706", link: "DatosDeCompraMiTienda.html" }
  ],
  "Mouse": [
    { nombre: "Mouse RGB", precio: "19.990", imagen: "https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g305/g305-white-gallery-1.png?v=1", link: "DatosDeCompraMiTienda.html" }
  ],
  "Mousepad": [
    { nombre: "Mousepad Gamer", precio: "9990", imagen: "https://resource.logitech.com/w_350,c_fit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g840/g840-gallery-2-new.png", link: "DatosDeCompraMiTienda.html" }
  ],
  "Poleras Personalizadas": [
    { nombre: "Polera Personalizada 1", precio: "14990", imagen: "data:image/jpeg;base64,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", link: "DatosDeCompraMiTienda.html" }
  ],
  "Poleras Gamers Personalizadas": [
    { nombre: "Polera Gamer 1", precio: "16990", imagen: "https://cycorecords.cl/cdn/shop/files/cf52f9c5-7750-491e-8cb8-18eb9d6970de-d_981059-mlc50381108185_062022-o_grande.jpg?v=1709326205", link: "DatosDeCompraMiTienda.html" }
  ]
};
export default function Productos() {
  const categorias = ["Todos", ...Object.keys(productosData)];
  const [categoria, setCategoria] = useState("Todos");
  const [productos, setProductos] = useState(Object.values(productosData).flat());

  const { cart, addToCart } = useContext(CartContext); // <-- usar contexto

  useEffect(() => {
    if (categoria === "Todos") {
      setProductos(Object.values(productosData).flat());
    } else {
      setProductos(productosData[categoria] || []);
    }
  }, [categoria]);

  const agregarAlCarrito = (producto) => {
    addToCart(producto); // <-- agregar al carrito global
    alert(`${producto.nombre} se ha agregado al carrito!`);
  };

  return (
    <div className="container mt-5" data-testid="productos">
      <h1 className="text-center mb-4">Productos</h1>

      {/* Dropdown de categorías */}
      <div className="dropdown mb-4">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {categoria === "Todos" ? "Selecciona una categoría" : categoria}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {categorias.map((cat) => (
            <li key={cat}>
              <button className="dropdown-item" onClick={() => setCategoria(cat)}>
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="row g-4">
        {productos.map((p, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm" style={{ backgroundColor: "#583BBF", color: "#CAA9D9" }}>
              <img src={p.imagen} className="card-img-top" alt={p.nombre} />
              <div className="card-body text-center">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">  ${Number(p.precio).toLocaleString("es-CL")} CLP</p>
                <button className="btn btn-warning" onClick={() => agregarAlCarrito(p)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


  
    </div>
  );
}