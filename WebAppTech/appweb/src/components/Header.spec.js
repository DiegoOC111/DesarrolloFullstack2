// Header.spec.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header Component - cobertura total", () => {
  let setPageSpy;

  beforeEach(() => {
    setPageSpy = jasmine.createSpy("setPage");
    render(<Header setPage={setPageSpy} />);
  });

  it("renderiza el navbar y el logo", () => {
    const navbar = document.querySelector(".navbar");
    expect(navbar).toBeTruthy();

    const logoImg = screen.getByAltText("Logo de la tienda");
    expect(logoImg).toBeTruthy();
    expect(logoImg.getAttribute("src")).toBeTruthy();
    expect(logoImg.width).toBe(80);
    expect(logoImg.height).toBe(60);
  });

  it("cada enlace llama a setPage con la página correcta", () => {
    const links = [
      { text: "Home", page: "home" },
      { text: "Nuestros Productos", page: "productos" },
      { text: "Sobre nosotros", page: "aboutus" },
      { text: "Carrito", page: "carrito" },
      { text: "Inicia sesión", page: "login" },
      { text: "Regístrate", page: "registro" },
    ];

    links.forEach(({ text, page }) => {
      const link = screen.getByText(text);
      fireEvent.click(link);
      expect(setPageSpy).toHaveBeenCalledWith(page);
    });
  });

  it("click en el logo llama a setPage con 'home'", () => {
    const logoLink = screen.getByAltText("Logo de la tienda").closest("a");
    fireEvent.click(logoLink);
    expect(setPageSpy).toHaveBeenCalledWith("home");
  });

  it("botón toggler y collapse existen", () => {
    const toggler = document.querySelector(".navbar-toggler");
    expect(toggler).toBeTruthy();
    expect(toggler.getAttribute("data-bs-toggle")).toBe("collapse");
    expect(toggler.getAttribute("data-bs-target")).toBe("#navbarNav");

    const collapse = document.getElementById("navbarNav");
    expect(collapse).toBeTruthy();
    expect(collapse.classList.contains("collapse")).toBe(true);
  });
});
