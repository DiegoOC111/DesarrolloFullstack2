import React, { useState } from "react";
import { useApi } from "../services/ApiProvider";



export default function Login() {
  const [loading, setLoading] = useState(false);
  const api = useApi(); 

  const validarFormulario = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value.trim();
    const contrasena = form.Contrasena.value.trim();

    if (!email || !contrasena) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      // Usando tu clase API
      const data = await api.login({
        correo: email,
        password: contrasena
      });

      if (data.token) {
        alert(`Inicio de sesión exitoso para: ${email}`);
        // aquí podrías redirigir o guardar token en localStorage
        // localStorage.setItem("token", data.token);
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" data-page="formulario" data-testid="login">
      <div className="Flex_Container" style={{ marginTop: "-50px" }} id="Contenedorinicio">
        <form id="Form_inicio" className="Form_inicio" onSubmit={validarFormulario}>
          <h1 style={{ textAlign: "center", color: "white" }}>Formulario de inicio de sesión</h1>

          <label htmlFor="email" className="Label_Form">Correo:</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="Contrasena" className="Label_Form">Password:</label>
          <input type="password" id="Contrasena" name="Contrasena" />

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
