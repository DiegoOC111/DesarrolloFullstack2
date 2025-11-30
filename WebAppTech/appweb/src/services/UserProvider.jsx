import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de que esta importación esté aquí

const UserContext = createContext();

// --- Función de Decodificación Integrada ---
/**
 * Decodifica un token JWT para obtener los datos del usuario (claims).
 * @param {string} token El token JWT que recibiste de la API.
 * @returns {object | null} Los claims del usuario si el token es válido, o null si falla.
 */
const decodeJwtToken = (token) => {
  if (!token) {
    return null;
  }
  try {
    const decoded = jwtDecode(token);

    // Verificación de expiración
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      console.warn("Token ha expirado.");
      return null;
    }

    // Devolvemos los datos (claims) que te interesan
    return {
      correo: decoded.correo,
      rol: decoded.rol,
      id: decoded.id

      // sub: decoded.sub,
    };
  } catch (error) {
    console.error("Error al decodificar el token JWT:", error);
    return null;
  }
};
// ---------------------------------------------


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. Persistencia: Cargar el usuario al iniciar la app ---
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      // Usar la función de decodificación integrada
      const userData = decodeJwtToken(storedToken);
      
      if (userData) {
        setUser(userData);
      } else {
        // Limpiar si el token es inválido/expirado
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    const userData = decodeJwtToken(token);
    
    if (userData) {
      localStorage.setItem('authToken', token);
      
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  if (loading) {
    // return <div>Cargando sesión de usuario...</div>; 
  }
  
  const contextValue = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};