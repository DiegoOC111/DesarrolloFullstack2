import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../components/CartContext";
import { useUser } from "../services/UserProvider";
import { useApi } from "../services/ApiProvider";

export default function Carrito() {
  const { cart, updateCantidad, removeFromCart, clearCart } = useContext(CartContext);
  const { user, isLoggedIn } = useUser();
  const api = useApi();

  const [despachos, setDespachos] = useState([]);
  const [selectedDespacho, setSelectedDespacho] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const cargarDespachos = async () => {
      try {
        const data = await api.getTiposDespacho();
        setDespachos(data);
        if (data.length > 0) setSelectedDespacho(data[0].id);
      } catch (error) {
        console.error("Error cargando despachos", error);
      }
    };
    cargarDespachos();
  }, [api]);

  // ============================================================
  // 🛠️ HELPER: FUNCIÓN PARA OBTENER EL PRECIO SEGURO
  // ============================================================
  // Esta función evita el NaN. Busca el precio en este orden:
  // 1. precioTotal (El ideal)
  // 2. precioBruto * 1.19 (Calculado)
  // 3. precio (Genérico)
  // 4. 0 (Si todo falla)
  const obtenerPrecio = (prod) => {
    if (prod.precioTotal != null) return Number(prod.precioTotal);
    if (prod.precioBruto != null) {
        // Si tienes impuestos guardados, úsalos, si no, calcula el 19%
        const impuestos = prod.valorImpuestos != null ? Number(prod.valorImpuestos) : Number(prod.precioBruto) * 0.19;
        return Number(prod.precioBruto) + impuestos;
    }
    if (prod.precio != null) return Number(prod.precio);
    return 0;
  };

  const handleCambiarCantidad = (id, delta) => {
    updateCantidad(id, delta);
  };

  const handleEliminar = (id) => {
    removeFromCart(id);
  };

  const comprarCarrito = async () => {
    if (cart.length === 0) return alert("El carrito está vacío.");
    
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para completar la compra.");
      return ;
    }
    
    if (!selectedDespacho) return alert("Por favor selecciona un método de despacho.");

    setIsProcessing(true);

    try {
      // Usamos el helper obtenerPrecio para calcular los totales de la boleta
      const totalFinal = cart.reduce((acc, item) => acc + (obtenerPrecio(item) * item.cantidad), 0);
      
      // Calculamos bruto e impuestos inversamente si es necesario, o sumamos propiedades
      const totalBruto = cart.reduce((acc, item) => acc + (Number(item.precioBruto || 0) * item.cantidad), 0);
      const totalImpuestos = totalFinal - totalBruto; // Diferencia simple

      const boletaPayload = {
        totalBruto: Math.round(totalBruto),
        totalImpuestos: Math.round(totalImpuestos),
        total: Math.round(totalFinal),
        usuarioIdUsuario: user.id || user.sub,
        idDespacho: Number(selectedDespacho)
      };

      const boletaCreada = await api.crearBoleta(boletaPayload);
      console.log("Boleta creada ID:", boletaCreada.id);

      for (const item of cart) {
        if (!item.id) continue;

        const detallePayload = {
          idBoleta: boletaCreada.id,
          idProducto: item.id
        };

        for(let i=0; i < item.cantidad; i++) {
             await api.crearDetalleBoleta(detallePayload);
        }
      }

      alert(`¡Compra realizada con éxito! Orden #${boletaCreada.id}`);
      clearCart();
   

    } catch (error) {
      console.error("Error en la compra:", error);
      alert("Hubo un error al procesar tu compra.");
    } finally {
      setIsProcessing(false);
    }
  };

  // CALCULO DEL TOTAL PARA PANTALLA (Usando el mismo helper)
  const totalPantalla = cart.reduce((acc, item) => {
      return acc + (obtenerPrecio(item) * item.cantidad);
  }, 0);

  return (
    <div id="ContenedorCarrito" className="container py-4" data-testid="carrito">
      <div className="carritoContainer">
        <h1 className="mb-4 text-center text-black fw-bold">Carrito de Compras</h1>
        
        <div id="carritoItems" className="row g-3 justify-content-center">
          {cart.map((prod, index) => (
            <div key={index} className="card h-100 shadow-sm mb-3" style={{ width: "18rem" }}>
              <img 
                src={prod.imagenUrl || "https://via.placeholder.com/200"} 
                className="card-img-top" 
                alt={prod.nombre} 
                style={{height: "200px", objectFit: "cover"}}
                onError={(e) => e.target.src = "https://via.placeholder.com/200"}
              />
              <div className="card-body text-center">
                <h5 className="card-title text-truncate" title={prod.nombre}>{prod.nombre}</h5>
                
                {/* AQUI USAMOS EL HELPER PARA EVITAR NaN */}
                <p className="card-text bg-light text-dark fw-bold p-2 rounded">
                  ${obtenerPrecio(prod).toLocaleString("es-CL")}
                </p>
                
                <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleCambiarCantidad(prod.id, -1)}
                    disabled={prod.cantidad <= 1}
                  >
                    -
                  </button>
                  <span className="fw-bold px-2 fs-5">{prod.cantidad}</span>
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => handleCambiarCantidad(prod.id, 1)}
                    disabled={prod.cantidad >= prod.stock} 
                  >
                    +
                  </button>
                </div>
                
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => handleEliminar(prod.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 ? (
          <div className="card shadow border-0 mt-5 bg-white">
            <div className="card-body p-4">
                <h4 className="card-title mb-4 border-bottom pb-2">Resumen del Pedido</h4>
                
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Método de Despacho:</label>
                        <select 
                            className="form-select" 
                            value={selectedDespacho} 
                            onChange={(e) => setSelectedDespacho(e.target.value)}
                        >
                            {despachos.map(d => (
                                <option key={d.id} value={d.id}>{d.nombreDespacho}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 p-3 bg-light rounded">
                    <div className="mb-3 mb-md-0">
                        <h3 className="mb-0 fw-bold text-success">
                            {/* AQUI TAMBIÉN USAMOS EL TOTAL CALCULADO CON EL HELPER */}
                            Total: ${totalPantalla.toLocaleString("es-CL")}
                        </h3>
                        <small className="text-muted">IVA incluido</small>
                    </div>
                    
                    <button
                        className="btn btn-lg btn-primary px-5 shadow"
                        onClick={comprarCarrito}
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Procesando..." : "Confirmar Compra"}
                    </button>
                </div>
            </div>
          </div>
        ) : (
            <div className="text-center mt-5 py-5">
                <h3 className="text-muted mb-3">Tu carrito está vacío 🛒</h3>
                
            </div>
        )}
      </div>
    </div>
  );
}