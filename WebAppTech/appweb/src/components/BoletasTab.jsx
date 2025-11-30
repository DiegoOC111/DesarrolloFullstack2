import React, { useState, useEffect } from "react";
import { useApi } from "../services/ApiProvider";




export default function BoletasTab() {
  const api = useApi();

  const [boletas, setBoletas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [despachos, setDespachos] = useState([]);
  
  const initialState = { id: "", totalBruto: "", totalImpuestos: 0, total: 0, usuarioIdUsuario: "", idDespacho: "" };
  const [form, setForm] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);

  const cargarDatos = async () => {
    try {
      const [b, u, d] = await Promise.all([api.getBoletas(), api.getUsuarios(), api.getTiposDespacho()]);
      setBoletas(b); setUsuarios(u); setDespachos(d);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleBrutoChange = (v) => {
    const bruto = Number(v);
    const imp = Math.round(bruto * 0.19);
    setForm({ ...form, totalBruto: bruto, totalImpuestos: imp, total: bruto + imp });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
          totalBruto: form.totalBruto, totalImpuestos: form.totalImpuestos, total: form.total,
          usuarioIdUsuario: Number(form.usuarioIdUsuario), idDespacho: Number(form.idDespacho)
      };
      if (isEditing) await api.actualizarBoleta(form.id, payload);
      else await api.crearBoleta(payload);
      setForm(initialState); setIsEditing(false); cargarDatos();
    } catch (e) { alert("Error guardando boleta"); }
  };

  const handleEdit = (b) => {
    setForm({
        id: b.id, totalBruto: b.totalBruto, totalImpuestos: b.totalImpuestos, total: b.total,
        usuarioIdUsuario: b.usuarioIdUsuario?.id || "", idDespacho: b.idDespacho?.id || ""
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar boleta?")) { await api.eliminarBoleta(id); cargarDatos(); }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row g-3 mb-5 p-3 bg-light rounded">
      <h4 className="mb-3">{isEditing ? "Editar Boleta" : "Nueva Boleta"}</h4>

        <div className="col-md-3"><input type="number" className="form-control" placeholder="Total Bruto" required value={form.totalBruto} onChange={(e)=>handleBrutoChange(e.target.value)}/></div>
        <div className="col-md-2"><input className="form-control" placeholder="Impuestos" readOnly value={form.totalImpuestos}/></div>
        <div className="col-md-2"><input className="form-control fw-bold" placeholder="Total Final" readOnly value={form.total}/></div>
        <div className="col-md-3">
            <select className="form-select" required value={form.usuarioIdUsuario} onChange={(e)=>setForm({...form, usuarioIdUsuario:e.target.value})}>
                <option value="">Cliente...</option>
                {usuarios.map(u=><option key={u.id} value={u.id}>{u.correo}</option>)}
            </select>
        </div>
        <div className="col-md-2">
            <select className="form-select" required value={form.idDespacho} onChange={(e)=>setForm({...form, idDespacho:e.target.value})}>
                <option value="">Despacho...</option>
                {despachos.map(d=><option key={d.id} value={d.id}>{d.nombreDespacho}</option>)}
            </select>
        </div>
        <div className="col-12 text-end">
            <button type="submit" className={`btn ${isEditing ? "btn-warning" : "btn-success"}`}>{isEditing ? "Actualizar" : "Generar"}</button>
            {isEditing && <button type="button" className="btn btn-secondary ms-2" onClick={()=>{setIsEditing(false);setForm(initialState)}}>Cancelar</button>}
        </div>
      </form>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
            <thead className="table-light"><tr><th>ID</th><th>Cliente</th><th>Total</th><th>Acciones</th></tr></thead>
            <tbody>
                {boletas.map(b=>(
                    <tr key={b.id}>
                        <td>#{b.id}</td>
                        <td>{b.usuarioIdUsuario?.correo}</td>
                        <td className="fw-bold">${b.total?.toLocaleString('es-CL')}</td>
                        <td>
                             <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>handleEdit(b)}>✏️</button>
                             <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(b.id)}>🗑️</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}