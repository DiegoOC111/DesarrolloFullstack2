import { render, screen } from "@testing-library/react";
import React from "react";
import AboutUs from "../pages/AboutUs"; 

describe("AboutUs Component Testing", () => {
  
  it("debe renderizar todos los títulos de sección principales", () => {
    // 1. Renderizar el componente
    render(<AboutUs />);

    // 2. Verificar que el título principal de la sección "¿Quiénes somos?" 
    expect(screen.getByRole("heading", { name: /¿quiénes somos\?/i })).toBeTruthy();

    // 3. Verificar que el título de "Nuestra Misión" esté presente.
    expect(screen.getByRole("heading", { name: /nuestra misión/i })).toBeTruthy();

    // 4. Verificar que el título de "Nuestra Visión" esté presente.
    expect(screen.getByRole("heading", { name: /nuestra visión/i })).toBeTruthy();
  });

  it("debe verificar que el componente AboutUs se renderiza y contiene texto clave", () => {
    render(<AboutUs />);

    expect(screen.getByText(/somos una tienda online dedicada a satisfacer las necesidades/i)).toBeTruthy();
  });
});