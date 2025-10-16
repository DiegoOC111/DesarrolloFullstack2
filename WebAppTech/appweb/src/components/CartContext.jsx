import React, { createContext, useState } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Agregar producto
  const addToCart = (producto) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.nombre === producto.nombre);
      if (existing) {
        return prev.map((p) =>
          p.nombre === producto.nombre ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Eliminar producto
  const removeFromCart = (nombre) => {
    setCart((prev) => prev.filter((p) => p.nombre !== nombre));
  };

  // Cambiar cantidad (+1 o -1)
  const updateCantidad = (nombre, delta) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.nombre === nombre ? { ...p, cantidad: p.cantidad + delta } : p
        )
        .filter((p) => p.cantidad > 0) // eliminar si cantidad llega a 0
    );
  };

  // Vaciar carrito (opcional)
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCantidad, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
