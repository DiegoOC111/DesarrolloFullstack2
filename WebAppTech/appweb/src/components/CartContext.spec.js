import React from "react";
import { render, screen } from "@testing-library/react";
import { CartContext } from "./CartContext";
import CartProvider from "./CartContext";
import { act } from "react-dom/test-utils";

describe("CartProvider", () => {
  it("debe inicializar el carrito vacío", () => {
    let value;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(v) => {
            value = v;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );
    expect(value.cart).toEqual([]);
  });

  it("debe agregar un producto al carrito", () => {
    let value;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(v) => {
            value = v;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );

    act(() => {
      value.addToCart({ nombre: "Mouse", precio: 1000 });
    });

    expect(value.cart.length).toBe(1);
    expect(value.cart[0].nombre).toBe("Mouse");
    expect(value.cart[0].cantidad).toBe(1);
  });

  it("debe incrementar la cantidad si el producto ya existe", () => {
    let value;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(v) => {
            value = v;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );

    act(() => {
      value.addToCart({ nombre: "Teclado", precio: 2000 });
      value.addToCart({ nombre: "Teclado", precio: 2000 });
    });

    expect(value.cart[0].cantidad).toBe(2);
  });

  it("debe eliminar un producto con removeFromCart", () => {
    let value;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(v) => {
            value = v;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );

    act(() => {
      value.addToCart({ nombre: "Monitor", precio: 5000 });
      value.removeFromCart("Monitor");
    });

    expect(value.cart.length).toBe(0);
  });

  it("debe actualizar la cantidad con updateCantidad y eliminar si llega a 0", () => {
    let value;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(v) => {
            value = v;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );

    act(() => {
      value.addToCart({ nombre: "Headset", precio: 3000 });
      value.updateCantidad("Headset", -1);
    });

    expect(value.cart.length).toBe(0);
  });

  it("debe vaciar el carrito con clearCart", () => {
    let value;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(v) => {
            value = v;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );

    act(() => {
      value.addToCart({ nombre: "Laptop", precio: 10000 });
      value.clearCart();
    });

    expect(value.cart).toEqual([]);
  });
});
