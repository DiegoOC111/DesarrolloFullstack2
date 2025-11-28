import React, { useState } from "react";
import { useApi } from "../services/ApiProvider";
import { toast } from 'react-toastify'; // Importamos toast para notificaciones

export default function Registro() {
  const api = useApi();
  // Definición del estado de carga (loading) y su setter (setLoading)
  const [loading, setLoading] = useState(false); 

  // Definición del estado de error (para mostrar mensajes si falla el registro)
  const [error, setError] = useState(null);

  const validarFormulario = async (event) => {
    event.preventDefault();
    setError(null); // Limpiar errores anteriores
    
    const form = event.target;
    const email = form.email.value.trim();
    const contrasena = form.Contrasena.value.trim();
    
    if (!email || !contrasena) {
      // Reemplazado alert() por toast.error
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true); // Iniciar carga
    try {
      // Llamada a la API para crear el usuario
      await api.crearUsuarioRegister({
        correo: email,
        password: contrasena
      });

      // Reemplazado alert() por toast.success
      toast.success(`Registro exitoso para: ${email}. Ya puedes iniciar sesión.`);
      form.reset();
    } catch (apiError) {
      console.error("Error al registrar el usuario:", apiError);
      setError("Ocurrió un error al registrar el usuario. Inténtalo de nuevo.");
      // Manejar errores de la API (ej: usuario ya existe, error de servidor)
      const errorMessage = apiError.response?.data?.message || "Ocurrió un error al registrar el usuario.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Detener carga
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" data-page="formulario" data-testid="registro">
      <div className="Flex_Container" style={{ marginTop: "-50px" }} id="ContenedorRegistro">
        <form id="Form_Registro" className="Form_Registro" onSubmit={validarFormulario}>
          <h1 style={{ textAlign: "center", color: "white" }}>Formulario de Registro</h1>

          <label htmlFor="email" className="Label_Form">Correo:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="Contrasena" className="Label_Form">Password:</label>
          <input type="password" id="Contrasena" name="Contrasena" required />

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          {/* Se usa 'loading' para deshabilitar y cambiar el texto del botón */}
          <button 
            type="submit" 
            className="btn btn-primary mt-3" 
            disabled={loading} // ⬅️ 'loading' definido
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </div>
    </div>
  );
}