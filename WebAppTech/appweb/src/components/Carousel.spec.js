// Carousel.spec.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Carousel from "./Carousel";

describe("Carousel Component - cobertura total", () => {

  beforeEach(() => {
    render(<Carousel />);
  });

  // Renderizado básico y estructura
  it("debe renderizar el contenedor principal del carousel", () => {
    const carousel = document.querySelector("#carouselExampleIndicators");
    expect(carousel).toBeTruthy();
  });

  it("debe renderizar 3 indicadores", () => {
    const indicators = document.querySelectorAll(".carousel-indicators li");
    expect(indicators.length).toBe(3);
  });

  it("primer indicador tiene clase 'active'", () => {
    const indicators = document.querySelectorAll(".carousel-indicators li");
    expect(indicators[0].classList.contains("active")).toBe(true);
  });

  it("otros indicadores NO tienen clase 'active' (rama ternaria)", () => {
    const indicators = document.querySelectorAll(".carousel-indicators li");
    expect(indicators[1].classList.contains("active")).toBe(false);
    expect(indicators[2].classList.contains("active")).toBe(false);
  });

  it("debe renderizar 3 slides del carousel", () => {
    const items = document.querySelectorAll(".carousel-item");
    expect(items.length).toBe(3);
  });

  it("primer slide tiene clase 'active'", () => {
    const firstItem = document.querySelector(".carousel-item.active");
    expect(firstItem).toBeTruthy();
  });

  it("otros slides NO tienen clase 'active' (rama ternaria)", () => {
    const items = document.querySelectorAll(".carousel-item");
    expect(items[1].classList.contains("active")).toBe(false);
    expect(items[2].classList.contains("active")).toBe(false);
  });

  // Imágenes y enlaces
  it("cada slide tiene imagen con src y alt correcto", () => {
    const imgs = document.querySelectorAll(".carousel-img");
    imgs.forEach(img => {
      expect(img.getAttribute("src")).toBeTruthy();
      expect(img.getAttribute("alt")).toBeTruthy();
    });
  });

  it("cada imagen está dentro de un enlace a /productos", () => {
    const links = document.querySelectorAll(".carousel-item a[href='/productos']");
    expect(links.length).toBe(3);
  });

  // Controles de navegación
  it("botón anterior existe y apunta correctamente", () => {
    const prev = document.querySelector(".carousel-control-prev");
    expect(prev).toBeTruthy();
    expect(prev.getAttribute("data-bs-slide")).toBe("prev");
    expect(prev.getAttribute("data-bs-target")).toBe("#carouselExampleIndicators");
    expect(prev.querySelector(".carousel-control-prev-icon")).toBeTruthy();
    expect(prev.querySelector(".visually-hidden").textContent).toMatch(/Previous/i);
  });

  it("botón siguiente existe y apunta correctamente", () => {
    const next = document.querySelector(".carousel-control-next");
    expect(next).toBeTruthy();
    expect(next.getAttribute("data-bs-slide")).toBe("next");
    expect(next.getAttribute("data-bs-target")).toBe("#carouselExampleIndicators");
    expect(next.querySelector(".carousel-control-next-icon")).toBeTruthy();
    expect(next.querySelector(".visually-hidden").textContent).toMatch(/Next/i);
  });

  // Branches alternativas
  it("cubre ramas del ternario 'activeClass'", () => {
    const items = document.querySelectorAll(".carousel-item");
    items.forEach((item, i) => {
      if (i === 0) {
        expect(item.classList.contains("active")).toBe(true);
      } else {
        expect(item.classList.contains("active")).toBe(false); // rama que antes no se ejecutaba
      }
    });

    const indicators = document.querySelectorAll(".carousel-indicators li");
    indicators.forEach((li, i) => {
      if (i === 0) expect(li.classList.contains("active")).toBe(true);
      else expect(li.classList.contains("active")).toBe(false);
    });
  });

  it("carousel-inner existe y serializa HTML", () => {
    const inner = document.querySelector(".carousel-inner");
    expect(inner).toBeTruthy();
    const html = inner.innerHTML;
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });

});
