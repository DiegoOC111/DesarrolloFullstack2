import { useState, useEffect } from "react";

export default function ProductList() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState(() => {
    const saved = sessionStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Simular carga de productos desde JSON o API
    fetch("/data/productos.json")
      .then((res) => res.json())
      .then((data) => setProductos(data));
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
              <img src={p.imagen} className="card-img-top" alt={p.nombre} />
              <div className="card-body">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">${p.precio}</p>
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
