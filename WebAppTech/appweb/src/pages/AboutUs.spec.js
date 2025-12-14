import React from "react";
import { render, screen } from "@testing-library/react";
// CORRECCIÓN IMPORTANTE: Verifica si tu archivo es About.jsx o AboutUs.jsx
// Si el archivo en la carpeta pages se llama AboutUs.jsx, usa esto:
import AboutUs from "./AboutUs"; 

describe("AboutUs Component - Cobertura Total (Jasmine)", () => {
  let container;

  beforeEach(() => {
    // Renderizamos y guardamos el contenedor para búsquedas seguras
    const rendered = render(<AboutUs />);
    container = rendered.container;
  });

  // 1. Estructura General
  it("renderiza el contenedor principal y las 3 tarjetas de información", () => {
    const mainContainer = screen.getByTestId("aboutus");
    expect(mainContainer).toBeTruthy();
    expect(mainContainer.classList.contains("container")).toBe(true);

    // Usamos container.querySelectorAll en lugar de document
    const cards = container.querySelectorAll(".card");
    expect(cards.length).toBe(3);
    
    cards.forEach(card => {
        expect(card.classList.contains("card-custom")).toBe(true);
        expect(card.classList.contains("shadow-sm")).toBe(true);
    });
  });

  // 2. Imagen
  it("renderiza la imagen del equipo con sus atributos", () => {
    const img = container.querySelector("img.card-img-top");
    
    expect(img).toBeTruthy();
    expect(img.getAttribute("alt")).toBe("Equipo Level-up Gamer");
    expect(img.getAttribute("src")).toBeTruthy();
  });

  // 3. Títulos (Headings)
  it("renderiza los 3 títulos de sección correctamente", () => {
    const titles = container.querySelectorAll(".card-title");
    
    expect(titles.length).toBe(3);
    expect(titles[0].textContent).toBe("¿Quiénes somos?");
    expect(titles[1].textContent).toBe("Nuestra Misión");
    expect(titles[2].textContent).toBe("Nuestra Visión");
  });

  // 4. Contenido de Texto y Estilos
  it("renderiza los párrafos de texto con el color negro forzado", () => {
    const paragraphs = container.querySelectorAll("p.card-text");
    
    expect(paragraphs.length).toBe(3);

    // Verificamos contenido
    // toMatch funciona igual en Jasmine
    expect(paragraphs[0].textContent).toMatch(/Somos una tienda online dedicada/i);
    expect(paragraphs[1].textContent).toMatch(/Proporcionar productos de alta calidad/i);
    expect(paragraphs[2].textContent).toMatch(/Ser la tienda online líder/i);

    // Verificamos el estilo inline
    paragraphs.forEach(p => {
        const color = p.style.color;
        // Los navegadores en Karma pueden normalizar a RGB o Hex
        const esNegro = color === "rgb(0, 0, 0)" || color === "#000000" || color === "black";
        expect(esNegro).toBe(true);
    });
  });

});