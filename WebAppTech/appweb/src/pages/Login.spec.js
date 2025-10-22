import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";
import React from "react";

describe("Login Component Testing", () => {

  beforeEach(() => {
    // Spy de Jasmine para window.alert
    spyOn(window, "alert");
  });

  it("debe mostrar alerta si los campos están vacíos", () => {
    const { container } = render(<Login />);
    
    // Seleccionamos el <form> y disparamos submit
    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(window.alert).toHaveBeenCalledWith("Por favor, completa todos los campos.");
  });

  it("B. debe mostrar alerta de éxito con campos llenos", () => {
    const { container } = render(<Login />);
    
    // Llenar los campos
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "test@correo.cl" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "123456" } });

    // Disparamos submit en el <form>
    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(window.alert).toHaveBeenCalledWith("Inicio de sesión exitoso para: test@correo.cl");
  });
});
