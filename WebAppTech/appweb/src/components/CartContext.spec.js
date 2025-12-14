import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// Importamos tanto el componente Provider por defecto como el Contexto nombrado
import CartProvider, { CartContext } from "./CartContext";

describe("CartContext - Lógica de Negocio (Jasmine)", () => {

  // Componente auxiliar para consumir el contexto dentro del test
  function TestComponent() {
    const { cart, addToCart, removeFromCart, updateCantidad, clearCart } = useContext(CartContext);

    // Datos de prueba con IDs
    const manzana = { id: 101, nombre: "Manzana", precio: 10 };
    const banana = { id: 102, nombre: "Banana", precio: 5 };

    return (
      <div>
        {/* Botones de Acción */}
        <button onClick={() => addToCart(manzana)} data-testid="add-manzana">Add Manzana</button>
        <button onClick={() => addToCart(banana)} data-testid="add-banana">Add Banana</button>
        
        <button onClick={() => removeFromCart(manzana.id)} data-testid="remove-manzana">Remove Manzana</button>
        
        <button onClick={() => updateCantidad(banana.id, 2)} data-testid="update-banana-up">Banana +2</button>
        <button onClick={() => updateCantidad(banana.id, -1)} data-testid="update-banana-down">Banana -1</button>
        
        <button onClick={() => clearCart()} data-testid="clear-cart">Clear Cart</button>

        {/* Visualización del Estado */}
        <ul data-testid="cart-items">
          {cart.map((p) => (
            <li key={p.id}>
              {`${p.nombre} x ${p.cantidad}`}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Renderizamos el componente envuelto en el Provider REAL antes de cada test
  beforeEach(() => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
  });

  // --- TESTS DE LÓGICA ---

  it("agrega un producto nuevo al carrito", () => {
    fireEvent.click(screen.getByTestId("add-manzana"));
    
    // getByText lanza error si no lo encuentra, así que esto confirma existencia
    expect(screen.getByText("Manzana x 1")).toBeTruthy();
  });

  it("incrementa la cantidad si se agrega el mismo producto (mismo ID)", () => {
    fireEvent.click(screen.getByTestId("add-manzana")); // x1
    fireEvent.click(screen.getByTestId("add-manzana")); // x2
    
    expect(screen.getByText("Manzana x 2")).toBeTruthy();
  });

  it("maneja múltiples productos distintos", () => {
    fireEvent.click(screen.getByTestId("add-manzana"));
    fireEvent.click(screen.getByTestId("add-banana"));
    
    expect(screen.getByText("Manzana x 1")).toBeTruthy();
    expect(screen.getByText("Banana x 1")).toBeTruthy();
  });

  it("elimina un producto por ID", () => {
    fireEvent.click(screen.getByTestId("add-manzana"));
    expect(screen.getByText("Manzana x 1")).toBeTruthy();

    fireEvent.click(screen.getByTestId("remove-manzana"));
    
    // queryByText devuelve null si no existe (ideal para verificar eliminación)
    expect(screen.queryByText("Manzana x 1")).toBeNull();
  });

  it("actualiza cantidades manualmente (updateCantidad)", () => {
    fireEvent.click(screen.getByTestId("add-banana")); // x1
    
    // Sumamos 2
    fireEvent.click(screen.getByTestId("update-banana-up"));
    expect(screen.getByText("Banana x 3")).toBeTruthy();
  });

  it("elimina el producto si la cantidad baja a 0", () => {
    fireEvent.click(screen.getByTestId("add-banana")); // x1
    
    // Restamos 1 -> Debería llegar a 0 y desaparecer
    fireEvent.click(screen.getByTestId("update-banana-down"));
    
    expect(screen.queryByText("Banana x 1")).toBeNull();
  });

  it("limpia todo el carrito (clearCart)", () => {
    fireEvent.click(screen.getByTestId("add-manzana"));
    fireEvent.click(screen.getByTestId("add-banana"));
    
    fireEvent.click(screen.getByTestId("clear-cart"));
    
    expect(screen.queryByText("Manzana x 1")).toBeNull();
    expect(screen.queryByText("Banana x 1")).toBeNull();
  });

});