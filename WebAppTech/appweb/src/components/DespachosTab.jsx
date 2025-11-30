import React, { useState, useEffect } from "react";
import { useApi } from "../services/ApiProvider";



export default function DespachosTab() {
  const api = useApi();

  const [despachos, setDespachos] = useState([]);
  const [form, setForm] = useState({ id: "", nombreDespacho: "" }); 
  const [isEditing, setIsEditing] = useState(false);

  const cargarDespachos = async () => {
    try {
      const data = await api.getTiposDespacho();
      setDespachos(data);
    } catch (error) {
      console.error("Error cargando despachos", error);
    }
  };

  useEffect(() => { cargarDespachos(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.actualizarTipoDespacho(form.id, form);
      } else {
        await api.crearTipoDespacho(form);
      }
      setForm({ id: "", nombreDespacho: "" });
      setIsEditing(false);
      cargarDespachos();
    } catch (error) {
      alert("Error al guardar despacho");
    }
  };

  const handleEdit = (item) => {
    setForm({ id: item.id, nombreDespacho: item.nombreDespacho });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este tipo de despacho?")) {
      await api.eliminarTipoDespacho(id);
      cargarDespachos();
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="row g-3 mb-5 p-3 bg-light rounded shadow-sm align-items-end">
  {/* 1. El Título debe estar en una columna completa (12) */}
  <div className="col-12">
    <h4 className="mb-0">{isEditing ? "Editar Despacho" : "Nuevo Tipo de Despacho"}</h4>
  </div>

  {/* 2. El Input ocupa la mayoría del espacio (8 de 12) */}
  <div className="col-md-8">
    <label className="form-label visually-hidden">Nombre</label>
    <input 
      type="text" 
      className="form-control" 
      placeholder="Nombre (Ej: Retiro en Tienda)" 
      required 
      value={form.nombreDespacho} 
      onChange={(e) => setForm({...form, nombreDespacho: e.target.value})} 
    />
  </div>

  {/* 3. Los Botones ocupan el espacio restante (4 de 12) */}
  <div className="col-md-4 d-grid gap-2">
    <button type="submit" className={`btn ${isEditing ? "btn-warning" : "btn-success"}`}>
      {isEditing ? "Actualizar" : "Crear"}
    </button>
    {isEditing && (
      <button 
        type="button" 
        className="btn btn-secondary" 
        onClick={() => { setIsEditing(false); setForm({ id: "", nombreDespacho: "" }); }}
      >
        Cancelar
      </button>
    )}
  </div>
</form>
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre Despacho</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {despachos.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.nombreDespacho}</td>
              <td className="text-end">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(d)}>✏️</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(d.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}