import React, { createContext, useContext, useMemo } from "react";
import ApiService from "./ApiService"; // Asegúrate de la ruta correcta

const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  // Inicializamos la API una sola vez
  const api = useMemo(() => new ApiService(), []);
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

// Hook para consumir la API desde cualquier componente
export const useApi = () => useContext(ApiContext);
