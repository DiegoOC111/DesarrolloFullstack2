import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("debe renderizar Header", () => {
    render(<App />);
    const header = screen.getByTestId("header");
    expect(header).toBeTruthy();
  });

  it("debe renderizar Footer", () => {
    render(<App />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeTruthy();
  });

  it("debe renderizar la página Home por defecto", () => {
    render(<App />);
    const homePage = screen.getByTestId("home");
    expect(homePage).toBeTruthy();
  });

  it("debe envolver el contenido en CartProvider", () => {
    render(<App />);
    const cart = screen.getByTestId("cart");
    expect(cart).toBeTruthy();
  });

  it("debe mostrar el contenedor principal con clase d-flex", () => {
    render(<App />);
    const container = document.querySelector(".d-flex");
    expect(container).toBeTruthy();
  });
});
