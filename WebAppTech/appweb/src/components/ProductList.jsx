import { useState, useEffect } from "react";
import React from "react";
import { useApi } from "../services/ApiProvider";


export default function ProductList() {
  const [productos, setProductos] = useState([]);
  const api = useApi();
  const [carrito, setCarrito] = useState(() => {
    const saved = sessionStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await api.getProductos(); // Llama al método de tu API
        setProductos(res.data); // Axios devuelve los datos en res.data
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  return (
    <div className="container mt-4">
      <h2>Productos</h2>
      <div className="row">
        {productos.map((p) => (
          <div key={p.id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <img src={p.imagenUrl} className="card-img-top" alt={p.nombre} />
              <div className="card-body">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">${p.precioTotal}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => agregarAlCarrito(p)}
                >
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
