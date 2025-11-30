import React, { useState, useEffect } from "react";
import { useApi } from "../services/ApiProvider";

export default function DetalleBoletasTab() {
  const api = useApi();

  const [detalles, setDetalles] = useState([]);
  const [boletas, setBoletas] = useState([]);
  const [productos, setProductos] = useState([]);

  // Modelo basado en DetalleBoletaPOST.java (idBoleta, idProducto)
  const [form, setForm] = useState({ id: "", idBoleta: "", idProducto: "" });
  const [isEditing, setIsEditing] = useState(false);

  const cargarDatos = async () => {
    try {
      const [detallesData, boletasData, productosData] = await Promise.all([
        api.getDetalleBoletas(),
        api.getBoletas(),
        api.getProductos(),
      ]);
      setDetalles(detallesData);
      setBoletas(boletasData);
      setProductos(productosData);
    } catch (error) {
      console.error("Error cargando datos", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // payload exacto para DetalleBoletaPOST
      const payload = {
        idBoleta: Number(form.idBoleta),
        idProducto: Number(form.idProducto),
      };

      if (isEditing) {
        await api.actualizarDetalleBoleta(form.id, payload);
      } else {
        await api.crearDetalleBoleta(payload);
      }
      setForm({ id: "", idBoleta: "", idProducto: "" });
      setIsEditing(false);
      cargarDatos();
      alert(isEditing ? "Detalle actualizado" : "Producto agregado a boleta");
    } catch (error) {
      console.error(error);
      alert("Error al guardar el detalle");
    }
  };

  const handleEdit = (detalle) => {
    setForm({
      id: detalle.id,
      // Accedemos a los objetos anidados para obtener los IDs actuales
      idBoleta: detalle.idBoleta?.id || "",
      idProducto: detalle.idProducto?.id || "",
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este detalle de la boleta?")) {
      await api.eliminarDetalleBoleta(id);
      cargarDatos();
    }
  };

  return (
    <div>
      
      <form
        onSubmit={handleSubmit}
        className="row g-3 mb-5 p-3 bg-light rounded shadow-sm"
      >
        <h4 className="mb-3">
        {isEditing ? "Editar Detalle" : "Agregar Producto a Boleta"}
      </h4>
        <div className="col-md-5">
          <label className="form-label">Boleta</label>
          <select
            className="form-select"
            required
            value={form.idBoleta}
            onChange={(e) => setForm({ ...form, idBoleta: e.target.value })}
          >
            <option value="">Seleccionar Boleta...</option>
            {boletas.map((b) => (
              <option key={b.id} value={b.id}>
                #{b.id} - {b.usuarioIdUsuario?.correo || "Sin Cliente"} (Total: $
                {b.total})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-5">
          <label className="form-label">Producto</label>
          <select
            className="form-select"
            required
            value={form.idProducto}
            onChange={(e) => setForm({ ...form, idProducto: e.target.value })}
          >
            <option value="">Seleccionar Producto...</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} (Stock: {p.stock})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-5 d-grid gap-2">
          <button
            type="submit"
            className={`btn ${isEditing ? "btn-warning" : "btn-success"} w-100`}
          >
            {isEditing ? "Actualizar" : "Agregar"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setForm({ id: "", idBoleta: "", idProducto: "" });
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID Detalle</th>
              <th>ID Boleta</th>
              <th>Producto</th>
              <th>Precio Ref. (Producto)</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>
                  <span className="badge bg-secondary">
                    Boleta #{d.idBoleta?.id}
                  </span>
                </td>
                <td>{d.idProducto?.nombre || "Producto no encontrado"}</td>
                <td>${d.idProducto?.precioTotal?.toLocaleString("es-CL")}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(d)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(d.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}