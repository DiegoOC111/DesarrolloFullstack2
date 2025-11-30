import React, { createContext, useState } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Agregar producto (Ahora comparamos por ID)
  const addToCart = (producto) => {
    // IMPORTANTE: 'producto' debe venir con 'id' desde la API
    setCart((prev) => {
      const existing = prev.find((p) => p.id === producto.id);
      if (existing) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Eliminar producto (Recibe ID, no nombre)
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Actualizar cantidad (Recibe ID, no nombre)
  const updateCantidad = (id, delta) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad + delta } : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCantidad, clearCart }}
    >
      <div data-testid="cart">{children}</div>
    </CartContext.Provider>
  );
}

export { CartContext };