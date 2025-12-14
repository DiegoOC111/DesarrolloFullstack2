import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { ApiProvider } from "./services/ApiProvider";
import ApiService from "./services/ApiService";

describe("App Component - Frontend Puro", () => {

  beforeEach(() => {
    // Mocks vacíos para evitar llamadas a la red al cargar App
    spyOn(ApiService.prototype, "getProductos").and.returnValue(Promise.resolve([]));
    spyOn(ApiService.prototype, "getTiposProducto").and.returnValue(Promise.resolve([]));
    spyOn(ApiService.prototype, "getTiposDespacho").and.returnValue(Promise.resolve([]));
    spyOn(ApiService.prototype, "login").and.returnValue(Promise.resolve({}));
    spyOn(ApiService.prototype, "crearUsuarioRegister").and.returnValue(Promise.resolve({}));
  });

  const renderApp = (initialPage = "home") =>
    render(
      <ApiProvider>
        <App initialPage={initialPage} />
      </ApiProvider>
    );



  it("renderiza header visualmente", () => {
    renderApp();
    expect(screen.getByTestId("header")).toBeTruthy();
  });
});