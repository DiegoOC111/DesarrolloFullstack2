import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "../pages/Home"; 

describe("Home Component Testing", () => {
  
  it("debe renderizar la página principal y sus elementos estructurales", () => {
    // 1. Renderizar el componente
    render(<Home />);

    // 2. Verificar el contenedor principal usando el data-testid="home"
    expect(screen.getByTestId("home")).toBeTruthy(); 

    // 3. Verificar la presencia del elemento semántico <main>
    expect(screen.getByRole("main")).toBeTruthy(); 
  });
});