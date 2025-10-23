import React from "react";
export default function Login() {
  const validarFormulario = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value.trim();
    const contrasena = form.Contrasena.value.trim();

    if (!email || !contrasena) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    alert(`Inicio de sesión exitoso para: ${email}`);
  };

  return (
    <div className="d-flex flex-column min-vh-100" data-page="formulario"data-testid="login">
        <div
          className="Flex_Container"
          style={{ marginTop: "-50px" }}
          id="Contenedorinicio"
        >
          <form
            id="Form_inicio"
            className="Form_inicio"
            onSubmit={validarFormulario}
          >
            <h1 style={{ textAlign: "center", color: "white" }}>
              Formulario de inicio de sesión
            </h1>

            <label htmlFor="email" className="Label_Form">
              Correo:
            </label>
            <br />
            <input type="email" id="email" name="email" />
            <br />
            <br />

            <label htmlFor="Contrasena" className="Label_Form">
              Password:
            </label>
            <br />
            <input type="password" id="Contrasena" name="Contrasena" />
            <br />
            <br />

            <input type="submit" value="Registrar" />
            <br />
            <br />
          </form>
        </div>
    </div>
  );
}