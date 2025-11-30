import React, { useState, useEffect } from "react";
import { useUser } from "../services/UserProvider";
import { useApi } from "../services/ApiProvider";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 

export default function Perfil() {
  const { user } = useUser();
  const api = useApi();

  const [activeTab, setActiveTab] = useState("seguridad"); 
  const [boletas, setBoletas] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [selectedBoleta, setSelectedBoleta] = useState(null);
  const [passForm, setPassForm] = useState({ newPass: "", confirmPass: "" });

  // 1. Cargar Historial
  useEffect(() => {
    const cargarDatos = async () => {
      if (!user) return;
      try {
        const allBoletas = await api.getBoletas();
        // Filtramos por ID (ajusta la comparación según tu tipo de dato)
        const misBoletas = allBoletas.filter(b => b.usuarioIdUsuario?.id == user.id);
        const allDetalles = await api.getDetalleBoletas();
        
        setBoletas(misBoletas);
        setDetalles(allDetalles);
      } catch (error) {
        console.error("Error cargando historial", error);
      }
    };
    cargarDatos();
  }, [user, api]);

  // 2. Cambiar Contraseña
  const handleChangePass = async (e) => {
    e.preventDefault();
    if (passForm.newPass !== passForm.confirmPass) return alert("Las contraseñas no coinciden.");
    if (!passForm.newPass) return;

    try {
      const payload = {
        contrasena: passForm.newPass,
        rol: user.rol,
        correo: user.correo
      };
      await api.actualizarUsuario(user.id, payload);
      alert("¡Contraseña actualizada con éxito!");
      setPassForm({ newPass: "", confirmPass: "" });
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la contraseña.");
    }
  };

  const getDetallesDeBoleta = (idBoleta) => detalles.filter(d => d.idBoleta?.id === idBoleta);

  if (!user) return <div className="p-5 text-center text-white" style={{backgroundColor: "#35245c", minHeight: "100vh"}}>Cargando perfil...</div>;

  return (
    // 1. FONDO DE PÁGINA ESPECÍFICO (#35245c)
    <div className="container-fluid min-vh-100 py-5 font-monospace" style={{ backgroundColor: "#35245c" }}>
      <div className="container">
        
        {/* HEADER (Texto Blanco para contrastar con el fondo oscuro) */}
        <div className="d-flex justify-content-between align-items-center mb-5 text-white">
            <div>
                <h2 className="fw-bold mb-0">Mi Cuenta</h2>
                <p className="opacity-75">Gestiona tus datos y revisa tus pedidos</p>
            </div>
            <div className="d-none d-md-block bg-white bg-opacity-10 px-4 py-2 rounded-pill shadow-sm border border-light border-opacity-25">
                <span className="small fw-bold">
                    📅 {new Date().toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
            </div>
        </div>

        <div className="row g-4">
            
            {/* === COLUMNA IZQ: TARJETA DE USUARIO === */}
            <div className="col-lg-4">
                {/* 2. PANELES BLANCOS (bg-white) */}
                <div className="card border-0 shadow-lg h-100 bg-white" style={{ borderRadius: "24px" }}>
                    <div className="card-body text-center p-5">
                        <div className="mb-4 position-relative d-inline-block">
                            <div className="bg-light text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm" 
                                 style={{width: "120px", height: "120px", fontSize: "3rem", color: "#35245c"}}>
                                {user.correo.charAt(0).toUpperCase()}
                            </div>
                            <span className="position-absolute bottom-0 end-0 bg-success border border-4 border-white rounded-circle p-2"></span>
                        </div>
                        
                        <h5 className="fw-bold text-dark mb-1 text-truncate" title={user.correo}>{user.correo}</h5>
                        <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill mt-2">
                            {user.rol || "CLIENTE"}
                        </span>

                        <div className="mt-5 d-grid gap-3">
                            <button 
                                onClick={() => setActiveTab("seguridad")}
                                className={`btn py-3 px-4 rounded-4 text-start d-flex align-items-center justify-content-between transition-all ${activeTab === 'seguridad' ? 'btn-primary shadow-lg' : 'btn-light text-muted'}`}
                                style={activeTab === 'seguridad' ? {backgroundColor: "#35245c", borderColor: "#35245c"} : {}}
                            >
                                <span>🔒 Seguridad</span>
                                {activeTab === 'seguridad' && <span>➔</span>}
                            </button>
                            <button 
                                onClick={() => setActiveTab("compras")}
                                className={`btn py-3 px-4 rounded-4 text-start d-flex align-items-center justify-content-between transition-all ${activeTab === 'compras' ? 'btn-primary shadow-lg' : 'btn-light text-muted'}`}
                                style={activeTab === 'compras' ? {backgroundColor: "#35245c", borderColor: "#35245c"} : {}}
                            >
                                <span>🛍️ Mis Compras</span>
                                {activeTab === 'compras' && <span>➔</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* === COLUMNA DER: CONTENIDO === */}
            <div className="col-lg-8">
                
                {/* --- TAB: SEGURIDAD (PANEL BLANCO) --- */}
                {activeTab === "seguridad" && (
                    <div className="card border-0 shadow-lg h-100 bg-white" style={{ borderRadius: "24px" }}>
                        <div className="card-body p-5">
                            <h4 className="fw-bold mb-2 text-dark">Datos de Acceso</h4>
                            <p className="text-muted mb-5 small">Mantén tu cuenta segura.</p>
                            
                            <div className="mb-4">
                                <label className="form-label text-uppercase text-muted x-small fw-bold" style={{fontSize: "0.75rem"}}>Correo Electrónico</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0 rounded-start-4 ps-3">✉️</span>
                                    <input type="email" className="form-control form-control-lg bg-light border-0 text-muted" value={user.correo} disabled />
                                    <span className="input-group-text bg-light border-0 rounded-end-4 pe-3"><i className="bi bi-lock-fill text-muted"></i></span>
                                </div>
                            </div>

                            <hr className="my-5 border-light" />

                            <form onSubmit={handleChangePass}>
                                <h5 className="fw-bold mb-4" style={{color: "#35245c"}}>Cambiar Contraseña</h5>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label text-uppercase text-muted fw-bold" style={{fontSize: "0.75rem"}}>Nueva Contraseña</label>
                                        <input type="password" className="form-control form-control-lg bg-light border-0 rounded-4" placeholder="••••••••" required
                                            value={passForm.newPass} onChange={(e) => setPassForm({...passForm, newPass: e.target.value})} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-uppercase text-muted fw-bold" style={{fontSize: "0.75rem"}}>Confirmar</label>
                                        <input type="password" className="form-control form-control-lg bg-light border-0 rounded-4" placeholder="••••••••" required
                                            value={passForm.confirmPass} onChange={(e) => setPassForm({...passForm, confirmPass: e.target.value})} />
                                    </div>
                                    <div className="col-12 text-end mt-4">
                                        <button className="btn btn-lg px-5 rounded-pill shadow-sm text-white" 
                                                style={{backgroundColor: "#35245c"}} type="submit">
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* --- TAB: COMPRAS (PANEL BLANCO) --- */}
                {activeTab === "compras" && (
                    <div className="card border-0 shadow-lg h-100 bg-white" style={{ borderRadius: "24px" }}>
                        <div className="card-body p-5">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold mb-0 text-dark">Historial de Pedidos</h4>
                                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">{boletas.length} Ordenes</span>
                            </div>
                            
                            {boletas.length === 0 ? (
                                <div className="text-center py-5 bg-light rounded-4">
                                    <div className="mb-3 display-4">🛒</div>
                                    <h5 className="fw-bold text-muted">Aún no tienes pedidos</h5>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="text-uppercase text-muted small bg-white">
                                            <tr>
                                                <th className="border-0 py-3"># Orden</th>
                                                <th className="border-0 py-3">Envío</th>
                                                <th className="border-0 py-3">Total</th>
                                                <th className="border-0 py-3 text-end">Detalle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {boletas.map(b => (
                                                <tr key={b.id}>
                                                    <td className="fw-bold py-3">#{b.id}</td>
                                                    <td className="py-3">
                                                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill border border-primary border-opacity-10">
                                                            {b.idDespacho?.nombreDespacho || "Estándar"}
                                                        </span>
                                                    </td>
                                                    <td className="fw-bold py-3 text-dark">${b.total?.toLocaleString('es-CL')}</td>
                                                    <td className="text-end py-3">
                                                        <button 
                                                            className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold"
                                                            onClick={() => setSelectedBoleta(b)}
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#detalleModal"
                                                        >
                                                            Ver
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* === MODAL DETALLES === */}
      <div className="modal fade" id="detalleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg" style={{borderRadius: "24px"}}>
                <div className="modal-header border-0 p-4 pb-0">
                    <div>
                        <h5 className="modal-title fw-bold">Orden #{selectedBoleta?.id}</h5>
                        <p className="text-muted small mb-0">Resumen de compra</p>
                    </div>
                    <button type="button" className="btn-close bg-light rounded-circle p-2" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body p-4">
                    {/* Resumen Total */}
                    {selectedBoleta && (
                        <div className="bg-light rounded-4 p-3 mb-3 d-flex justify-content-between">
                            <div>
                                <small className="text-muted d-block fw-bold">TOTAL PAGADO</small>
                                <span className="fs-4 fw-bold text-success">${selectedBoleta.total?.toLocaleString('es-CL')}</span>
                            </div>
                            <div className="text-end">
                                <small className="text-muted d-block fw-bold">IMPUESTOS</small>
                                <span className="fw-bold">${selectedBoleta.totalImpuestos?.toLocaleString('es-CL')}</span>
                            </div>
                        </div>
                    )}

                   <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="text-muted small">
                                <tr><th className="border-0 ps-3">PRODUCTO</th><th className="border-0 text-end pe-3">VALOR</th></tr>
                            </thead>
                            <tbody>
                                {selectedBoleta && getDetallesDeBoleta(selectedBoleta.id).map((d, i) => (
                                    <tr key={i} className="border-bottom border-light">
                                        <td className="ps-3 py-3">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-white border rounded-3 p-2 me-3 shadow-sm text-center">📦</div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold text-dark">{d.idProducto?.nombre}</h6>
                                                    <small className="text-muted text-truncate d-block" style={{maxWidth: "200px"}}>
                                                        {d.idProducto?.descripcion || "Sin descripción"}
                                                    </small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-end pe-3 fw-bold text-secondary">
                                            ${d.idProducto?.precioTotal?.toLocaleString('es-CL')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                   </div>
                </div>
                <div className="modal-footer border-0 p-4 pt-0">
                    <button type="button" className="btn btn-light rounded-pill px-4 fw-bold" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}