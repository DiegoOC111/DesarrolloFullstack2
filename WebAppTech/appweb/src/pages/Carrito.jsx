import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";

export default function Carrito() {
  const { cart, updateCantidad, removeFromCart, clearCart } = useContext(CartContext);

  const cambiarCantidad = (index, delta) => {
    const producto = cart[index];
    if (producto) {
      updateCantidad(producto.nombre, delta);
    }
  };

  const eliminarProducto = (index) => {
    const producto = cart[index];
    if (producto) {
      removeFromCart(producto.nombre);
    }
  };

  const comprarCarrito = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    alert(`Compra realizada con éxito! Total: $${total.toLocaleString("es-CL")}`);
    clearCart();
  };

  return (
    <div id="ContenedorCarrito" className="container py-4">
      <div className="carritoContainer">
        <h1 className="mb-4 text-center">Carrito de Compras</h1>
        <div id="carritoItems" className="row g-3 justify-content-center">
          {cart.map((prod, index) => (
            <div key={index} className="card h-100 shadow-sm" style={{ width: "18rem" }}>
              <img src={prod.imagen} className="card-img-top" alt={prod.nombre} />
              <div className="card-body text-center">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text bg-white text-dark fw-bold p-2 rounded shadow-sm">
                  ${Number(prod.precio).toLocaleString("es-CL")} CLP
                </p>
                <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => cambiarCantidad(index, -1)}
                  >
                    -
                  </button>
                  <span>{prod.cantidad}</span>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => cambiarCantidad(index, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => eliminarProducto(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div
            className="d-flex justify-content-between align-items-center bg-white shadow-sm rounded p-3 mt-4"
            style={{ position: "sticky", bottom: 0, zIndex: 1000 }}
          >
            <h4 className="mb-0">
              Total: $
              {cart
                .reduce((acc, item) => acc + Number(item.precio) * item.cantidad, 0)
                .toLocaleString("es-CL")}
            </h4>
            <button
              className="btn btn-lg btn-success px-5"
              onClick={comprarCarrito}
            >
              Comprar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
