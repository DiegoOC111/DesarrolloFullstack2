import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  it("debe renderizar el footer principal", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo") || document.getElementById("mainFooter");
    expect(footer).toBeTruthy();
  });

  it("debe mostrar el copyright", () => {
    render(<Footer />);
    expect(screen.getByText("© 2025 Carlos y Diego")).toBeTruthy();
  });

  it("debe renderizar los iconos de redes sociales", () => {
    render(<Footer />);
    const twitter = document.querySelector(".bi-twitter");
    const instagram = document.querySelector(".bi-instagram");
    const facebook = document.querySelector(".bi-facebook");

    expect(twitter).toBeTruthy();
    expect(instagram).toBeTruthy();
    expect(facebook).toBeTruthy();
  });

  it("cada icono debe estar dentro de un enlace", () => {
    render(<Footer />);
    const links = document.querySelectorAll("ul.nav li a");
    expect(links.length).toBe(3);
    links.forEach((link) => {
      expect(link.getAttribute("href")).toBe("#");
    });
  });
});
