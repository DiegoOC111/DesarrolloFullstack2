import React, { useState, useEffect } from "react";
import { useApi } from "../services/ApiProvider";



export default function TiposTab() {
  const api = useApi();

  const [tipos, setTipos] = useState([]);

  const [form, setForm] = useState({ id: "", nombre: "" });
  const [isEditing, setIsEditing] = useState(false);

  const cargarTipos = async () => {
    try { setTipos(await api.getTiposProducto()); } catch (error) {}
  };

  useEffect(() => { cargarTipos(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) await api.actualizarTipoProducto(form.id, form);
      else await api.crearTipoProducto(form);
      setForm({ id: "", nombre: "" });
      setIsEditing(false);
      cargarTipos();
    } catch (error) { alert("Error guardando categoría"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar categoría?")) {
      await api.eliminarTipoProducto(id);
      cargarTipos();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row g-3 mb-5 p-3 bg-light rounded">
      <h4 className="mb-3">{isEditing ? "Editar Categoría" : "Nueva Categoría"}</h4>

        <div className="col-md-9"><input className="form-control" placeholder="Nombre Categoría" required value={form.nombre} onChange={(e)=>setForm({...form, nombre:e.target.value})}/></div>
        <div className="col-md-3 d-grid gap-2">
            <button type="submit" className={`btn ${isEditing ? "btn-warning" : "btn-success"}`}>{isEditing ? "Actualizar" : "Crear"}</button>
            {isEditing && <button type="button" className="btn btn-secondary" onClick={()=>{setIsEditing(false);setForm({id:"",nombre:""})}}>Cancelar</button>}
        </div>
      </form>
      <table className="table table-hover">
        <thead className="table-light"><tr><th>ID</th><th>Nombre</th><th className="text-end">Acciones</th></tr></thead>
        <tbody>
          {tipos.map((t)=>(
            <tr key={t.id}>
                <td>{t.id}</td><td>{t.nombre}</td>
                <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>{setForm(t);setIsEditing(true)}}>✏️</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(t.id)}>🗑️</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}