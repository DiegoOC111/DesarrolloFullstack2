import React from "react";


export default function Registro() {
  const validarFormulario = (event) => {
    event.preventDefault(); // evita que se recargue la página
    const form = event.target;
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const direccion = form.direccion.value.trim();
    const contrasena = form.Contrasena.value.trim();

    if (!nombre || !email || !direccion || !contrasena) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Aquí puedes agregar la lógica real de registro (por ejemplo, envío al backend)
    alert(`Registro exitoso para: ${nombre}`);
    form.reset();
  };

  return (
    <div className="d-flex flex-column min-vh-100" data-page="formulario">

        <div
          className="Flex_Container"
          style={{ marginTop: "-50px" }}
          id="ContenedorRegistro"
        >
          <form
            id="Form_Registro"
            className="Form_Registro"
            onSubmit={validarFormulario}
          >
            <h1 style={{ textAlign: "center", color: "white" }}>
              Formulario de Registro
            </h1>

            <label htmlFor="nombre" className="Label_Form">
              Nombre:
            </label>
            <br />
            <input type="text" id="nombre" name="nombre" />
            <br />
            <br />

            <label htmlFor="email" className="Label_Form">
              Correo:
            </label>
            <br />
            <input type="email" id="email" name="email" />
            <br />
            <br />

            <label htmlFor="direccion" className="Label_Form">
              Dirección:
            </label>
            <br />
            <input type="text" id="direccion" name="direccion" />
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
