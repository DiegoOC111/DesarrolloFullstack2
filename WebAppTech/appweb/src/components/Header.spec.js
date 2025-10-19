import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import logo from "../assets/images/logo_pagina.png"; // si necesitas validar src

describe("Header Component", () => {
  let setPageMock;

  beforeEach(() => {
    setPageMock = jest.fn();
  });

  it("debe renderizar el navbar y el logo", () => {
    render(<Header setPage={setPageMock} />);
    const navbar = document.querySelector(".navbar");
    expect(navbar).toBeTruthy();

    const logoImg = screen.getByAltText("Logo de la tienda");
    expect(logoImg).toBeTruthy();
    expect(logoImg.src).toContain("logo_pagina.png");
  });

  it("cada enlace llama a setPage con la página correcta", () => {
    render(<Header setPage={setPageMock} />);

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
      expect(setPageMock).toHaveBeenLastCalledWith(page);
    });
  });

  it("click en el logo llama a setPage con 'home'", () => {
    render(<Header setPage={setPageMock} />);
    const logoLink = screen.getByAltText("Logo de la tienda").closest("a");
    fireEvent.click(logoLink);
    expect(setPageMock).toHaveBeenCalledWith("home");
  });
});
