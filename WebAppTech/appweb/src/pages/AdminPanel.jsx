import React, { useState } from "react";
// Importamos los componentes
import UsuariosTab from "../components/UsuariosTab";
import ProductosTab from "../components/ProductosTab";
import TiposTab from "../components/TiposTab";
import BoletasTab from "../components/BoletasTab";
import DespachosTab from "../components/DespachosTab";
import DetalleBoletasTab from "../components/DetalleBoletasTab"; // 👈 IMPORTAR NUEVO

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("usuarios");

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold text-primary">Panel de Administración</h2>
      
      {/* Navegación de Pestañas */}
      <ul className="nav nav-tabs mb-4">
        {/* ... (Pestañas existentes: usuarios, productos, tipos) ... */}
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "usuarios" ? "active fw-bold" : ""}`} onClick={() => setActiveTab("usuarios")}>👥 Usuarios</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "productos" ? "active fw-bold" : ""}`} onClick={() => setActiveTab("productos")}>📦 Productos</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "tipos" ? "active fw-bold" : ""}`} onClick={() => setActiveTab("tipos")}>🏷️ Categorías</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "boletas" ? "active fw-bold" : ""}`} onClick={() => setActiveTab("boletas")}>🧾 Boletas</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "detalles" ? "active fw-bold" : ""}`} onClick={() => setActiveTab("detalles")}>
            📑 Detalle Boletas  {/* 👈 NUEVA PESTAÑA */}
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "despachos" ? "active fw-bold" : ""}`} onClick={() => setActiveTab("despachos")}>🚚 Despachos</button>
        </li>
      </ul>

      {/* Contenido Dinámico */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {activeTab === "usuarios" && <UsuariosTab />}
          {activeTab === "productos" && <ProductosTab />}
          {activeTab === "tipos" && <TiposTab />}
          {activeTab === "boletas" && <BoletasTab />}
          {activeTab === "detalles" && <DetalleBoletasTab />} {/* 👈 NUEVO COMPONENTE */}
          {activeTab === "despachos" && <DespachosTab />}
        </div>
      </div>
    </div>
  );
}