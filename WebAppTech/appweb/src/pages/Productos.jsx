import { useState, useEffect, useContext } from "react";
import React from "react";
import { CartContext } from "../components/CartContext"; 
import { useApi } from "../services/ApiProvider";
import { ToastContainer, toast } from 'react-toastify'; // Para notificaciones
import 'react-toastify/dist/ReactToastify.css';

// Componente para reemplazar el alert()
const CustomAlert = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Notificación</h2>
            <p className="mb-6 text-gray-600">{message}</p>
            <button
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-150"
                onClick={onClose}
            >
                Entendido
            </button>
        </div>
    </div>
);


export default function Productos() {
 const [productos, setProductos] = useState([]);
 const [categorias, setCategorias] = useState(["Todos"]);
 const [categoria, setCategoria] = useState("Todos");
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
 const api = useApi();
 const { addToCart } = useContext(CartContext);

// Traer categorías desde API
useEffect(() => {
 const fetchCategorias = async () => {
      setLoading(true); // Iniciar carga
 try {
 // CORRECCIÓN 1: 'res' ya es el array de datos, NO necesitas 'res.data'
 const categoriasArray = await api.getTiposProducto(); 
 
        // CORRECCIÓN 2: El 'res' puede ser undefined si falló la petición (CORS o Red)
        // Usamos la comprobación y mapeamos directamente
        if (categoriasArray && Array.isArray(categoriasArray)) {
            // CORRECCIÓN 3: Corregir error de variable en console.log
            const categoriasApi = categoriasArray.map(c => c.nombre); 
            console.log("Categorías cargadas:", categoriasApi); 
            setCategorias(["Todos", ...categoriasApi]);
        }
} catch (error) {
 console.error("Error al obtener categorías:", error);
        // Notificar al usuario sobre el error de CORS/Red
        toast.error("Error de conexión al cargar categorías. Revisa tu backend (CORS/Puerto 8080).", { autoClose: 5000 });
 }
 };

 fetchCategorias();
 }, [api]); // Dependencia 'api' es correcta ya que viene del contexto

// Traer productos desde API
useEffect(() => {
 const fetchProductos = async () => {
 try {
// CORRECCIÓN 1: 'res' ya es el array de datos, NO necesitas 'res.data'
 const productosArray = await api.getProductos();
        
        // CORRECCIÓN 2: Asegurarse de que el array exista antes de guardarlo
        if (productosArray && Array.isArray(productosArray)) {
setProductos(productosArray);
        } else {
            setProductos([]); // Establecer un array vacío si la respuesta no es un array válido
        }
 } catch (error) {
 console.error("Error al obtener productos:", error);
        toast.error("Error de conexión al cargar productos. Revisa tu backend (CORS/Puerto 8080).", { autoClose: 5000 });
 } finally {
          setLoading(false); // Finalizar carga
      }
};

 fetchProductos();
 }, [api]); // Dependencia 'api' es correcta

// Filtrado por categoría
console.log("productos:", productos);
const productosFiltrados =
 categoria === "Todos"
? productos
: productos.filter((p) => p.idProd && p.idProd.nombre === categoria);

 const agregarAlCarrito = (producto) => {
 addToCart(producto);
 // REGLA IMPORTANTE: No usar alert(). Usamos Toastify o un componente modal.
    toast.success(`${producto.nombre} se ha agregado al carrito!`, { autoClose: 2000 });
 };
    
  // Mostrar estado de carga
  if (loading) {
      return (
          <div className="container mt-5 text-center p-5">
              <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3">Cargando productos...</p>
          </div>
      );
  }

 return (
 <div className="container mt-5">
        <ToastContainer position="top-right" /> {/* Contenedor de notificaciones */}
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
          {/* CORRECCIÓN 3: Aseguramos que categorias sea un array antes de mapear */}
{categorias && Array.isArray(categorias) && categorias.map((cat) => (
<li key={cat}>
 <button className="dropdown-item" onClick={() => setCategoria(cat)}>
 {cat}
 </button>
 </li>
))}
 </ul>
 </div>
        
      {/* Mensaje si no hay productos filtrados */}
      {productosFiltrados.length === 0 && !loading && (
          <div className="alert alert-info text-center">No se encontraron productos en esta categoría.</div>
      )}


<div className="row g-4">
        {productosFiltrados.map((p, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm" style={{ backgroundColor: "#583BBF", color: "#CAA9D9" }}>
              <img src={p.imagenUrl} className="card-img-top" alt={p.nombre} />
              <div className="card-body text-center">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">  ${Number(p.precioBruto).toLocaleString("es-CL")} CLP</p>
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