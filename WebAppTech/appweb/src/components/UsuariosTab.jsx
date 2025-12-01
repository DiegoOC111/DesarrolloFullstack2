import React, { useState, useEffect } from "react";
import { useApi } from "../services/ApiProvider";


export default function UsuariosTab() {
  const api = useApi();

  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ id: "", correo: "", password: "", role: "USER" });
  const [isEditing, setIsEditing] = useState(false);

  const cargarUsuarios = async () => {
    try {
      const data = await api.getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios", error);
    }
  };

  useEffect(() => { cargarUsuarios(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const payload = { contrasena: form.password, rol: form.role };
        await api.actualizarUsuario(form.id, payload);
      } else {
        const payload = { correo: form.correo, password: form.password, role: form.role };
        await api.crearUsuarioRegister(payload);
      }
      limpiarFormulario();
      cargarUsuarios();
      alert(isEditing ? "Usuario actualizado" : "Usuario creado");
    } catch (error) {
      alert("Error al guardar usuario");
    }
  };

  const limpiarFormulario = () => {
    setForm({ id: "", correo: "", password: "", role: "USER" });
    setIsEditing(false);
  };

  const handleEdit = (user) => {
    setForm({ 
        id: user.id, 
        correo: user.correo, 
        password: "", 
        role: user.rol || "USER" 
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar usuario permanentemente?")) {
      await api.eliminarUsuario(id);
      cargarUsuarios();
    }
  };

  return (
    <div>
<form onSubmit={handleSubmit} className="row g-3 mb-5 p-3 bg-light rounded shadow-sm">
  <div className="col-12">
    <h4 className="mb-2">{isEditing ? "Editar Usuario" : "Nuevo Usuario"}</h4>
  </div>


  
  <div className="col-md-4">
    <label className="form-label visually-hidden">Correo</label>
    <input 
      type="email" 
      className="form-control" 
      placeholder="Correo Electrónico" 
      required 
      disabled={isEditing}
      value={form.correo} 
      onChange={(e) => setForm({...form, correo: e.target.value})} 
    />
  </div>

  <div className="col-md-4">
    <label className="form-label visually-hidden">Rol</label>
    <select 
      className="form-select" 
      value={form.role} 
      onChange={(e) => setForm({...form, role: e.target.value})}
    >
      <option value="USER">Usuario Normal</option>
      <option value="ADMIN">Administrador</option>
    </select>
  </div>

  <div className="col-md-4">
    <label className="form-label visually-hidden">Contraseña</label>
    <input 
      type="password" 
      className="form-control" 
      placeholder={isEditing ? "Nueva contraseña (opcional)" : "Contraseña"} 
      required={!isEditing}
      value={form.password} 
      onChange={(e) => setForm({...form, password: e.target.value})} 
    />
  </div>

  {/* --- FILA DE BOTONES (ABAJO) --- */}
  {/* Usamos col-12 para que ocupe una nueva línea entera */}
  {/* mt-3 da un poco de margen arriba para separarlo de los inputs */}
  {/* d-flex justify-content-end alinea los botones a la derecha */}
  
  <div className="col-12 mt-4 d-flex justify-content-end gap-2">
    {isEditing && (
      <button 
        type="button" 
        className="btn btn-secondary" 
        onClick={limpiarFormulario}
      >
        Cancelar
      </button>
    )}
    
    <button type="submit" className={`btn ${isEditing ? "btn-warning" : "btn-success"}`}>
      {isEditing ? "Actualizar Usuario" : "Crear Usuario"}
    </button>
  </div>
</form>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr><th>ID</th><th>Correo</th><th>Rol</th><th className="text-end">Acciones</th></tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.correo}</td>
                <td><span className={`badge ${u.rol === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>{u.rol}</span></td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(u)}>✏️</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}