// CartContext.spec.js
import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartContext, default as CartProvider } from "./CartContext";

describe("CartContext - cobertura total", () => {

  // Componente de prueba para acceder al contexto
  function TestComponent() {
    const { cart, addToCart, removeFromCart, updateCantidad, clearCart } = useContext(CartContext);

    return (
      <div>
        <button onClick={() => addToCart({ nombre: "Manzana", precio: 10 })} data-testid="add-manzana">Add Manzana</button>
        <button onClick={() => addToCart({ nombre: "Banana", precio: 5 })} data-testid="add-banana">Add Banana</button>
        <button onClick={() => removeFromCart("Manzana")} data-testid="remove-manzana">Remove Manzana</button>
        <button onClick={() => updateCantidad("Banana", 2)} data-testid="update-banana-up">Banana +2</button>
        <button onClick={() => updateCantidad("Banana", -1)} data-testid="update-banana-down">Banana -1</button>
        <button onClick={() => clearCart()} data-testid="clear-cart">Clear Cart</button>

        <ul data-testid="cart-items">
          {cart.map((p) => (
            <li key={p.nombre}>{`${p.nombre} x ${p.cantidad}`}</li>
          ))}
        </ul>
      </div>
    );
  }

  let container;

  beforeEach(() => {
    const { container: c } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    container = c;
  });

  it("agrega un producto nuevo", () => {
    fireEvent.click(screen.getByTestId("add-manzana"));
    expect(screen.getByText("Manzana x 1")).toBeTruthy();
  });

  it("incrementa cantidad si se agrega producto existente", () => {
    fireEvent.click(screen.getByTestId("add-manzana"));
    fireEvent.click(screen.getByTestId("add-manzana"));
    expect(screen.getByText("Manzana x 2")).toBeTruthy();
  });

  it("agrega un producto distinto", () => {
    fireEvent.click(screen.getByTestId("add-manzana"));
    fireEvent.click(screen.getByTestId("add-banana"));
    expect(screen.getByText("Manzana x 1")).toBeTruthy();
    expect(screen.getByText("Banana x 1")).toBeTruthy();
  });

  it("elimina un producto existente", () => {
    fireEvent.click(screen.getByTestId("add-manzana"));
    fireEvent.click(screen.getByTestId("remove-manzana"));
    expect(screen.queryByText("Manzana x 1")).toBeNull();
  });

  it("incrementa cantidad con updateCantidad", () => {
    fireEvent.click(screen.getByTestId("add-banana"));
    fireEvent.click(screen.getByTestId("update-banana-up"));
    expect(screen.getByText("Banana x 3")).toBeTruthy();
  });

  it("decrementa cantidad con updateCantidad y elimina si llega a 0", () => {
    fireEvent.click(screen.getByTestId("add-banana")); // 1
    fireEvent.click(screen.getByTestId("update-banana-down")); // 0 -> elimina
    expect(screen.queryByText("Banana x 1")).toBeNull();
  });

  it("limpia todo el carrito con clearCart", () => {
    fireEvent.click(screen.getByTestId("add-manzana"));
    fireEvent.click(screen.getByTestId("add-banana"));
    fireEvent.click(screen.getByTestId("clear-cart"));
    expect(screen.queryByText("Manzana x 1")).toBeNull();
    expect(screen.queryByText("Banana x 1")).toBeNull();
  });

});
