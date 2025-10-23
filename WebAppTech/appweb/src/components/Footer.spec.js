// Footer.spec.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component - cobertura total", () => {

  beforeEach(() => {
    render(<Footer />);
  });

  it("renderiza el footer principal", () => {
    const footer = screen.getByTestId("footer");
    expect(footer).toBeTruthy();
    const container = footer.querySelector(".container");
    expect(container).toBeTruthy();
  });

  it("muestra el copyright", () => {
    expect(screen.getByText("© 2025 Carlos y Diego")).toBeTruthy();
  });

  it("renderiza los iconos de redes sociales", () => {
    const twitter = screen.getByText((content, element) =>
      element.tagName === "I" && element.classList.contains("bi-twitter")
    );
    const instagram = screen.getByText((content, element) =>
      element.tagName === "I" && element.classList.contains("bi-instagram")
    );
    const facebook = screen.getByText((content, element) =>
      element.tagName === "I" && element.classList.contains("bi-facebook")
    );
    expect(twitter).toBeTruthy();
    expect(instagram).toBeTruthy();
    expect(facebook).toBeTruthy();
  });

  it("cada icono está dentro de un enlace con href correcto", () => {
    const links = document.querySelectorAll("ul.nav li a");
    expect(links.length).toBe(3);
    links.forEach((link) => {
      expect(link.getAttribute("href")).toBe("#");
    });
  });

  it("cubre branches: existencia de contenedor y iconos", () => {
    const container = document.querySelector(".container");
    expect(container).toBeTruthy();
    const icons = document.querySelectorAll("i.bi-twitter, i.bi-instagram, i.bi-facebook");
    expect(icons.length).toBe(3);
  });

});
