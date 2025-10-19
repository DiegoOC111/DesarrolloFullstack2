import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mockeamos los componentes hijos que se importan
jest.mock("./components/Header", () => () => <div data-testid="header" />);
jest.mock("./components/Footer", () => () => <div data-testid="footer" />);
jest.mock("./pages/Home", () => () => <div data-testid="home" />);
jest.mock("./pages/Productos", () => () => <div data-testid="productos" />);
jest.mock("./pages/AboutUs", () => () => <div data-testid="aboutus" />);
jest.mock("./pages/Carrito", () => () => <div data-testid="carrito" />);
jest.mock("./pages/Login", () => () => <div data-testid="login" />);
jest.mock("./pages/Registro", () => () => <div data-testid="registro" />);
jest.mock("./components/CartContext", () => ({ children }) => <div data-testid="cart">{children}</div>);

describe("App component", () => {
  it("debe renderizar Header y Footer", () => {
    render(<App />);
    expect(screen.getByTestId("header")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  it("debe renderizar Home por defecto", () => {
    render(<App />);
    expect(screen.getByTestId("home")).toBeTruthy();
  });

  it("debe mostrar el contenedor principal con la clase d-flex", () => {
    render(<App />);
    const container = document.querySelector(".d-flex");
    expect(container).toBeTruthy();
  });

  it("CartProvider debe envolver el contenido", () => {
    render(<App />);
    expect(screen.getByTestId("cart")).toBeTruthy();
  });
});
