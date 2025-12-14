import React from "react";
import { render } from "@testing-library/react";
import Carousel from "./Carousel";

describe("Carousel Component - Cobertura Total (Jasmine)", () => {
  let container;

  beforeEach(() => {
    // Renderizamos el componente y capturamos el contenedor
    const rendered = render(<Carousel />);
    container = rendered.container;
  });

  // Renderizado básico y estructura
  it("debe renderizar el contenedor principal del carousel", () => {
    // Usamos 'container.querySelector' en vez de 'document.querySelector' para aislar el test
    const carousel = container.querySelector("#carouselExampleIndicators");
    expect(carousel).toBeTruthy();
  });

  it("debe renderizar 3 indicadores", () => {
    const indicators = container.querySelectorAll(".carousel-indicators li");
    expect(indicators.length).toBe(3);
  });

  it("primer indicador tiene clase 'active'", () => {
    const indicators = container.querySelectorAll(".carousel-indicators li");
    expect(indicators[0].classList.contains("active")).toBe(true);
  });

  it("otros indicadores NO tienen clase 'active'", () => {
    const indicators = container.querySelectorAll(".carousel-indicators li");
    expect(indicators[1].classList.contains("active")).toBe(false);
    expect(indicators[2].classList.contains("active")).toBe(false);
  });

  it("debe renderizar 3 slides del carousel", () => {
    const items = container.querySelectorAll(".carousel-item");
    expect(items.length).toBe(3);
  });

  it("primer slide tiene clase 'active'", () => {
    const firstItem = container.querySelector(".carousel-item.active");
    expect(firstItem).toBeTruthy();
  });

  it("otros slides NO tienen clase 'active'", () => {
    const items = container.querySelectorAll(".carousel-item");
    expect(items[1].classList.contains("active")).toBe(false);
    expect(items[2].classList.contains("active")).toBe(false);
  });

  // Imágenes y enlaces
  it("cada slide tiene imagen con src y alt correcto", () => {
    const imgs = container.querySelectorAll(".carousel-img");
    
    // Verificamos que existen 3 imágenes
    expect(imgs.length).toBe(3);

    imgs.forEach(img => {
      expect(img.getAttribute("src")).toBeTruthy();
      expect(img.getAttribute("alt")).toBeTruthy();
    });
  });

  it("cada imagen está dentro de un enlace a /productos", () => {
    // Selector CSS para buscar <a> que tengan href='/productos'
    const links = container.querySelectorAll(".carousel-item a[href='/productos']");
    expect(links.length).toBe(3);
  });

  // Controles de navegación
  it("botón anterior existe y apunta correctamente", () => {
    const prev = container.querySelector(".carousel-control-prev");
    expect(prev).toBeTruthy();
    
    expect(prev.getAttribute("data-bs-slide")).toBe("prev");
    expect(prev.getAttribute("data-bs-target")).toBe("#carouselExampleIndicators");
    
    // Verificamos el icono y el texto oculto
    expect(prev.querySelector(".carousel-control-prev-icon")).toBeTruthy();
    // Jasmine usa toMatch para regex igual que Jest
    expect(prev.querySelector(".visually-hidden").textContent).toMatch(/Previous/i);
  });

  it("botón siguiente existe y apunta correctamente", () => {
    const next = container.querySelector(".carousel-control-next");
    expect(next).toBeTruthy();
    
    expect(next.getAttribute("data-bs-slide")).toBe("next");
    expect(next.getAttribute("data-bs-target")).toBe("#carouselExampleIndicators");
    
    expect(next.querySelector(".carousel-control-next-icon")).toBeTruthy();
    expect(next.querySelector(".visually-hidden").textContent).toMatch(/Next/i);
  });

  // Branches y HTML
  it("carousel-inner existe y contiene HTML", () => {
    const inner = container.querySelector(".carousel-inner");
    expect(inner).toBeTruthy();
    
    const html = inner.innerHTML;
    expect(html.length).toBeGreaterThan(0);
  });

});