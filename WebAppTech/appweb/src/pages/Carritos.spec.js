import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Carrito from "../pages/Carrito";
import { CartContext } from "../components/CartContext";

const mockUpdateCantidad = () => {};
const mockRemoveFromCart = () => {};
const mockClearCart = () => {};

const mockCartOneProduct = [
  { nombre: "Catan", precio: "29990", cantidad: 2, imagen: "..." },
];

const mockCartContextValue = {
  cart: [],
  updateCantidad: mockUpdateCantidad,
  removeFromCart: mockRemoveFromCart,
  clearCart: mockClearCart,
};

let updateCantidadSpy, removeFromCartSpy, clearCartSpy;

const renderWithMockContext = (initialCart = mockCartOneProduct, ui = <Carrito />) => {
  mockCartContextValue.cart = initialCart;
  return render(
    <CartContext.Provider value={mockCartContextValue}>
      {ui}
    </CartContext.Provider>
  );
};

describe("Carrito Component Testing - Cobertura de Ramas", () => {
  beforeEach(() => {
    updateCantidadSpy = spyOn(mockCartContextValue, "updateCantidad");
    removeFromCartSpy = spyOn(mockCartContextValue, "removeFromCart");
    clearCartSpy = spyOn(mockCartContextValue, "clearCart");
    spyOn(window, "alert");
  });

  it("debe mostrar el producto en el carrito y calcular el total correctamente", () => {
    renderWithMockContext(mockCartOneProduct);

    // ✅ Jasmine compatible
    expect(screen.getByText("Catan")).not.toBeNull();
    expect(screen.getByText(/Total: \$59.980/i)).not.toBeNull();
  });

  it("debe llamar a updateCantidad al hacer click en '+'", () => {
    renderWithMockContext(mockCartOneProduct);

    const addButton = screen.getByRole("button", { name: /\+/i });
    fireEvent.click(addButton);

    expect(updateCantidadSpy).toHaveBeenCalledWith("Catan", 1);
  });

  it("debe llamar a removeFromCart al hacer click en 'Eliminar'", () => {
    renderWithMockContext(mockCartOneProduct);

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);

    expect(removeFromCartSpy).toHaveBeenCalledWith("Catan");
  });

  it("debe mostrar alerta de éxito y limpiar el carrito al hacer click en 'Comprar'", () => {
    renderWithMockContext(mockCartOneProduct);

    fireEvent.click(screen.getByRole("button", { name: /comprar/i }));

    expect(window.alert).toHaveBeenCalledWith(
      "Compra realizada con éxito! Total: $59.980"
    );
    expect(clearCartSpy).toHaveBeenCalledTimes(1);
  });

  it("debe renderizarse correctamente con el carrito vacío y NO mostrar el botón 'Comprar' (Cubre Ramas)", () => {
    renderWithMockContext([]);

    expect(screen.getByText("Carrito de Compras")).not.toBeNull();
    expect(screen.queryByRole("button", { name: /comprar/i })).toBeNull();
    expect(screen.queryByText(/Total:/i)).toBeNull();
  });
});
