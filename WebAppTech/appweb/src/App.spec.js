import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component Tests", () => {
  // ----- Header, Footer, CartProvider -----
  it("renderiza Header", () => {
    render(<App />);
    expect(screen.getByTestId("header")).toBeTruthy();
  });

  it("renderiza Footer", () => {
    render(<App />);
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  it("envuelve contenido en CartProvider", () => {
    render(<App />);
    expect(screen.getByTestId("cart")).toBeTruthy();
  });

  it("contiene contenedor principal con clase d-flex", () => {
    render(<App />);
    expect(document.querySelector(".d-flex")).toBeTruthy();
  });

  const pages = ["home", "productos", "aboutus", "carrito", "login", "registro", "invalido"];

  pages.forEach((page) => {
    it(`renderiza '${page}' correctamente`, () => {
      render(<App initialPage={page} />);
      const testId = ["home", "productos", "aboutus", "carrito", "login", "registro"].includes(page)
        ? page
        : "home"; // default case
      expect(screen.getByTestId(testId)).toBeTruthy();
    });
  });
});
