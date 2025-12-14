import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component - Cobertura Total (Jasmine)", () => {
  let container;

  beforeEach(() => {
    // 1. Renderizamos y guardamos el 'container' (el div que envuelve al componente)
    // Esto es mejor práctica en Karma que usar 'document' global.
    const rendered = render(<Footer />);
    container = rendered.container;
  });

  it("renderiza el footer principal y su contenedor interno", () => {
    // Buscamos por test-id
    const footer = screen.getByTestId("footer");
    expect(footer).toBeTruthy();
    
    // Verificamos clases de Bootstrap
    expect(footer.classList.contains("bg-dark")).toBe(true);
    
    // Buscamos el div .container dentro
    const innerContainer = container.querySelector(".container");
    expect(innerContainer).toBeTruthy();
  });

  it("muestra el texto de copyright exacto", () => {
    // getByText es perfecto aquí porque sí hay texto visible
    expect(screen.getByText("© 2025 Carlos y Diego")).toBeTruthy();
  });

  it("renderiza los 3 iconos de redes sociales correctamente", () => {
    // Usamos querySelector directo a las clases. 
    // Es más robusto que buscar "texto" en un icono vacío.
    const twitter = container.querySelector("i.bi-twitter");
    const instagram = container.querySelector("i.bi-instagram");
    const facebook = container.querySelector("i.bi-facebook");

    expect(twitter).toBeTruthy();
    expect(instagram).toBeTruthy();
    expect(facebook).toBeTruthy();
  });

  it("verifica que los iconos están dentro de enlaces", () => {
    // Buscamos todos los <a> dentro del footer
    const links = container.querySelectorAll("a");
    
    expect(links.length).toBe(3);

    links.forEach(link => {
      // 1. Verificar href
      expect(link.getAttribute("href")).toBe("#");
      
      // 2. Verificar que tiene clase de texto blanco
      expect(link.classList.contains("text-white")).toBe(true);

      // 3. Verificar que TIENE un hijo <i> (el icono)
      expect(link.querySelector("i")).toBeTruthy();
    });
  });

});