import React, { useState, useEffect } from "react";
import { useApi } from "../services/ApiProvider";



export default function ProductosTab() {
  const api = useApi();

  const [productos, setProductos] = useState([]);
  const [tipos, setTipos] = useState([]);
  
  const initialState = { id: "", nombre: "", descripcion: "", imagenUrl: "", precioBruto: "", stock: "", id_tipo: "" };
  const [form, setForm] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);

  const cargarDatos = async () => {
    try {
      const [prodData, tiposData] = await Promise.all([api.getProductos(), api.getTiposProducto()]);
      setProductos(prodData);
      setTipos(tiposData);
    } catch (error) { console.error("Error", error); }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pBruto = Number(form.precioBruto);
      const impuestos = Math.round(pBruto * 0.19);
      const pTotal = pBruto + impuestos;

      const payload = { 
          nombre: form.nombre,
          descripcion: form.descripcion,
          imagenUrl: form.imagenUrl,
          precioBruto: pBruto,
          stock: Number(form.stock),
          id_tipo: Number(form.id_tipo),
          valorImpuestos: impuestos,
          precioTotal: pTotal
      };

      if (isEditing) await api.actualizarProducto(form.id, payload);
      else await api.crearProducto(payload);
      
      setForm(initialState);
      setIsEditing(false);
      cargarDatos();
    } catch (error) { alert("Error guardando producto"); }
  };

  const handleEdit = (p) => {
    try { 
    setForm({ 
        id: p.id, nombre: p.nombre, descripcion: p.descripcion || "", imagenUrl: p.imagenUrl || "",
        precioBruto: p.precioBruto, stock: p.stock, id_tipo: p.idProd?.id || "" 
    });
    setIsEditing(true);}
    catch (error) { alert("Error al cargar datos del producto"); }
  };

  const handleDelete = async (id) => {
    try {
    if (window.confirm("¿Borrar producto?")) {
      console.log("Borrando producto ID:", id);
      await api.eliminarProducto(id);
      cargarDatos();
    }} catch (error) { alert("Error borrando producto"); }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row g-3 mb-5 p-3 bg-light rounded">
      <h4 className="mb-3">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h4>

        <div className="col-md-6"><input className="form-control" placeholder="Nombre" required value={form.nombre} onChange={(e)=>setForm({...form, nombre:e.target.value})}/></div>
        <div className="col-md-6"><input className="form-control" placeholder="URL Imagen" required value={form.imagenUrl} onChange={(e)=>setForm({...form, imagenUrl:e.target.value})}/></div>
        <div className="col-12"><textarea className="form-control" placeholder="Descripción" required value={form.descripcion} onChange={(e)=>setForm({...form, descripcion:e.target.value})}/></div>
        <div className="col-md-3">
             <input type="number" className="form-control" placeholder="Precio Bruto" required min="1" value={form.precioBruto} onChange={(e)=>setForm({...form, precioBruto:e.target.value})}/>
             <div className="form-text">El sistema sumará el IVA.</div>
        </div>
        <div className="col-md-3"><input type="number" className="form-control" placeholder="Stock" required min="0" value={form.stock} onChange={(e)=>setForm({...form, stock:e.target.value})}/></div>
        <div className="col-md-3">
            <select className="form-select" required value={form.id_tipo} onChange={(e)=>setForm({...form, id_tipo:e.target.value})}>
                <option value="">Categoría...</option>
                {tipos.map(t=><option key={t.id} value={t.id}>{t.nombre}</option>)}
            </select>
        </div>
        <div className="col-md-3 d-grid gap-2">
            <button type="submit" className={`btn ${isEditing ? "btn-warning" : "btn-success"}`}>{isEditing ? "Guardar" : "Crear"}</button>
            {isEditing && <button type="button" className="btn btn-secondary" onClick={()=>{setIsEditing(false);setForm(initialState)}}>Cancelar</button>}
        </div>
      </form>
      <table className="table table-hover align-middle">
        <thead className="table-light"><tr><th>Img</th><th>Nombre</th><th>Categoría</th><th>P. Total</th><th>Stock</th><th>Acciones</th></tr></thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.imagenUrl} alt="mini" style={{width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px"}} onError={(e) => e.target.src = "https://via.placeholder.com/40"}/>
              </td>
              <td>{p.nombre}</td>
              <td><span className="badge bg-secondary">{p.idProd?.nombre || "N/A"}</span></td>
              <td>${p.precioTotal?.toLocaleString('es-CL')}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>handleEdit(p)}>✏️</button>
                <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(p.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}