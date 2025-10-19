import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductList from "./ProductList";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, nombre: "Producto 1", precio: 1000, imagen: "img1.jpg" },
        { id: 2, nombre: "Producto 2", precio: 2000, imagen: "img2.jpg" },
      ]),
  })
);

const sessionStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, "sessionStorage", { value: sessionStorageMock });

describe("ProductList Component", () => {
  beforeEach(() => {
    fetch.mockClear();
    sessionStorage.clear();
  });

  it("debe renderizar título y cargar productos", async () => {
    render(<ProductList />);
    expect(screen.getByText("Productos")).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByText("Producto 1")).toBeTruthy();
      expect(screen.getByText("Producto 2")).toBeTruthy();
    });
  });

  it("cada producto debe mostrar imagen, nombre, precio y botón", async () => {
    render(<ProductList />);
    await waitFor(() => {
      const producto1 = screen.getByText("Producto 1").closest(".card");
      expect(producto1).toBeTruthy();
      expect(screen.getByAltText("Producto 1")).toBeTruthy();
      expect(screen.getByText("$1000")).toBeTruthy();
      expect(screen.getByText("Agregar al carrito")).toBeTruthy();
    });
  });

  it("agregar un producto actualiza carrito y sessionStorage", async () => {
    render(<ProductList />);
    await waitFor(() => screen.getByText("Agregar al carrito"));
    const button = screen.getAllByText("Agregar al carrito")[0];

    fireEvent.click(button);

    await waitFor(() => {
      const stored = JSON.parse(sessionStorage.getItem("carrito"));
      expect(stored.length).toBe(1);
      expect(stored[0].nombre).toBe("Producto 1");
    });
  });

  it("agregar varios productos al carrito", async () => {
    render(<ProductList />);
    await waitFor(() => screen.getAllByText("Agregar al carrito"));

    const botones = screen.getAllByText("Agregar al carrito");
    fireEvent.click(botones[0]); // Producto 1
    fireEvent.click(botones[1]); // Producto 2

    await waitFor(() => {
      const stored = JSON.parse(sessionStorage.getItem("carrito"));
      expect(stored.length).toBe(2);
      expect(stored[0].nombre).toBe("Producto 1");
      expect(stored[1].nombre).toBe("Producto 2");
    });
  });
});
