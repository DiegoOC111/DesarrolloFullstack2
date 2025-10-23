import { render, screen, fireEvent } from "@testing-library/react";
import Registro from "../pages/Registro"; 
import React from "react";

describe("Registro Component Testing", () => {
  
  beforeEach(() => {
     spyOn(window, "alert");
  });

  it("debe mostrar alerta si los campos están vacíos", () => {
    const { container } = render(<Registro />);
    
    // Seleccionamos el <form> y disparamos el submit
    const form = container.querySelector("form");
    fireEvent.submit(form);

    // Se espera que la alerta muestre el mensaje de error
    expect(window.alert).toHaveBeenCalledWith("Por favor, completa todos los campos.");
  });

  it("debe mostrar alerta de éxito con todos los campos llenos", () => {
    const { container } = render(<Registro />);
    
    const nombreUsuario = "Juan Perez";

    // Llenar los cuatro campos usando getByLabelText con una expresión regular (case-insensitive)
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: nombreUsuario } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "juan.perez@test.cl" } });
    fireEvent.change(screen.getByLabelText(/dirección/i), { target: { value: "Calle Falsa 123" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "miContraseñaSegura123" } });

    // Disparamos submit en el <form>
    const form = container.querySelector("form");
    fireEvent.submit(form);

    // Se espera que la alerta muestre el mensaje de éxito, incluyendo el nombre
    expect(window.alert).toHaveBeenCalledWith(`Registro exitoso para: ${nombreUsuario}`);
  });
});