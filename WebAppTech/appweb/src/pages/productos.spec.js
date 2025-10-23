import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Productos from "../pages/Productos"; 
import { CartContext } from "../components/CartContext"; 

// 1. Configuración del Mock Mínimo para CartContext
const mockContextValue = {
  cart: [],
  addToCart: () => {}, 
};

let addToCartSpy;

const renderWithMockContext = (ui) => {
  return render(
    // Inyectamos el valor mock
    <CartContext.Provider value={mockContextValue}>
      {ui}
    </CartContext.Provider>
  );
};


describe("Productos Component Testing - Cobertura de Funciones", () => {
  
  beforeEach(() => {
    addToCartSpy = spyOn(mockContextValue, 'addToCart');
    spyOn(window, "alert");
  });


  it("debe renderizar la página y mostrar el título principal y un producto inicial", () => {
    renderWithMockContext(<Productos />);
    
    expect(screen.getByRole("heading", { name: /productos/i })).toBeTruthy();
    
    expect(screen.getByText("Catan")).toBeTruthy();
  });
  

  it("debe filtrar y mostrar solo productos de la categoría 'Consolas'", () => {
    renderWithMockContext(<Productos />);


    fireEvent.click(screen.getByRole("button", { name: /selecciona una categoría/i }));

    // 2. Simular click en el item "Consolas"

    fireEvent.click(screen.getByRole("button", { name: /consolas/i }));


    // 'PS5' debería estar visible
    expect(screen.getByText("PS5")).toBeTruthy();
    
    // 'Catan' (Juegos de mesa) NO debería estar visible (Usamos queryByText y toBeNull)
    expect(screen.queryByText("Catan")).toBeNull();
  });
  

  it("debe llamar a addToCart y mostrar alerta al hacer click en 'Agregar al carrito'", () => {
    renderWithMockContext(<Productos />);
    
    // Localizar el botón "Agregar al carrito" del primer producto
    const addButton = screen.getAllByRole("button", { name: /agregar al carrito/i })[0];
    
    fireEvent.click(addButton);
    
    // Verifica que la función addToCart fue llamada
    expect(addToCartSpy).toHaveBeenCalledTimes(1);
    
    // Verifica que se mostró la alerta

    expect(window.alert).toHaveBeenCalledWith("Catan se ha agregado al carrito!");
  });
});