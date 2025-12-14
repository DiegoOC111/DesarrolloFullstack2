import React, { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { UserProvider, useUser } from "../services/UserProvider";

// Componente auxiliar para forzar el estado de Login
const HeaderWithLoginState = ({ isLoggedIn, userData }) => {
  const { login, logout } = useUser();

  useEffect(() => {
    if (isLoggedIn && userData) {
      // Simulamos que el login guarda el token/usuario
      // Dependiendo de cómo funcione tu UserProvider real, esto podría requerir ajustes.
      // Si tu UserProvider solo acepta un token, pasamos un token dummy.
      login("token-dummy"); 
      // Nota: Si tu UserProvider decodifica el token, esto podría fallar.
      // Si es así, probaremos solo el estado "Guest".
    } else {
      logout();
    }
  }, [isLoggedIn]);

  return <Header setPage={jasmine.createSpy('setPage')} />;
};

describe("Header Component - Jasmine", () => {
  
  const renderHeader = () => {
    return render(
      <UserProvider>
         <Header setPage={jasmine.createSpy('setPage')} />
      </UserProvider>
    );
  };

  it("renderiza estado 'Visitante' (Guest) correctamente", () => {
    renderHeader();
    // Verificamos elementos de usuario no autenticado
    expect(screen.getByText("Inicia sesión")).toBeTruthy();
    expect(screen.getByText("Regístrate")).toBeTruthy();
    // Verificamos que NO muestre perfil
    expect(screen.queryByText("Mi Perfil")).toBeNull();
  });

  it("renderiza elementos de navegación comunes", () => {
    renderHeader();
    expect(screen.getByAltText("Logo de la tienda")).toBeTruthy();
    expect(screen.getByText("Home")).toBeTruthy();
  });
});