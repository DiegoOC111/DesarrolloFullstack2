// Header.jsx
import React from "react";
import logo from "../assets/images/logo_pagina.png";
import { useUser } from '../services/UserProvider';

export default function Header({ setPage }) {
  const { user, isLoggedIn, logout } = useUser(); 
  if (user) {
    console.log("Objeto usuario completo:", user);
    console.log("Valor exacto del rol:", `"${user.rol}"`); // Las comillas ayudan a ver espacios
  }
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setPage('home');
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light shadow-sm" data-testid="header">
      <div className="container-fluid">
        {/* Botón de Logo */}
        <a 
          className="navbar-brand" 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            setPage("home");
          }}
        >
          <img src={logo} width="80" height="60" alt="Logo de la tienda" />
        </a>
        
        {/* Botón Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            
            {/* Elementos de Navegación Fijos */}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); setPage("home"); }}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); setPage("productos"); }}>Nuestros Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); setPage("aboutus"); }}>Sobre nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); setPage("carrito"); }}>Carrito</a>
            </li>
            
            {isLoggedIn ? (
              
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => { 
                        e.preventDefault(); 
                        
                        const targetPage = (user.rol === "ADMIN") ? "adminpanel" : "perfil";
                        setPage(targetPage);
                    }} 
                  >
                    {user.rol == "ADMIN" ? "Panel de Admin" : "Mi Perfil"} 
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </a>
                </li>
              </>
            ) : (
              // --- SI NO ESTÁ LOGEADO: Mostrar Inicia sesión y Regístrate ---
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage("login");
                    }}
                  >
                    Inicia sesión
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage("registro");
                    }}
                  >
                    Regístrate
                  </a>
                </li>
              </>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}