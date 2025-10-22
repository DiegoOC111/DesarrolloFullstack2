import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";


window.alert = jest.fn();

describe("Login Component Testing", () => {

  it("debe mostrar alerta si los campos están vacíos", () => {
    render(<Login />);
    fireEvent.submit(screen.getByRole("button", { name: /register/i }));

    expect(window.alert).toHaveBeenCalledWith("Por favor, completa todos los campos.");
  });

  it("B. debe mostrar alerta de éxito con campos llenos", () => {
    render(<Login />);
    
    // Llenar los campos (usando el atributo name)
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "test@correo.cl" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "123456" } });
    fireEvent.submit(screen.getByRole("button", { name: /registrar/i }));

    expect(window.alert).toHaveBeenCalledWith("Inicio de sesión exitoso para: test@correo.cl");
  });
});