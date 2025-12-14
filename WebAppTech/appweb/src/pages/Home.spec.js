import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home"; 

describe("Home Component - Cobertura Total (Jasmine)", () => {
  let container;

  beforeEach(() => {
    // Capturamos el contenedor específico de este render
    const rendered = render(<Home />);
    container = rendered.container;
  });

  it("renderiza el contenedor principal con las clases de diseño correctas", () => {
    // Buscamos por test-id usando screen (estándar RTL)
    const homeContainer = screen.getByTestId("home");
    
    expect(homeContainer).toBeTruthy();

    // Verificamos clases de Bootstrap/CSS
    expect(homeContainer.classList.contains("d-flex")).toBe(true);
    expect(homeContainer.classList.contains("flex-column")).toBe(true);
    expect(homeContainer.classList.contains("min-vh-100")).toBe(true);
  });

  it("renderiza la etiqueta semántica <main> con flex-grow", () => {
    // Usamos container.querySelector para asegurar que buscamos DENTRO de este Home
    const mainElement = container.querySelector("main");

    expect(mainElement).toBeTruthy();
    expect(mainElement.classList.contains("flex-grow-1")).toBe(true);
  });

  it("integra y renderiza el componente Carousel en su interior", () => {
    // Buscamos el ID del carousel dentro del contenedor renderizado
    const carousel = container.querySelector("#carouselExampleIndicators");
    
    expect(carousel).toBeTruthy();
    
    // Verificamos jerarquía: Carousel debe estar dentro de Main
    const mainElement = container.querySelector("main");
    expect(mainElement.contains(carousel)).toBe(true);
  });

});