import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Definir el tipo de usuario
interface User {
  username: string;
  token?: string;
}

// Definir el contexto de autenticación
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, password: string) => Promise<void>;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el AuthContext
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}

// Proveedor del AuthContext
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate(); // Hook de navegación

  // Función de login que hace una solicitud al backend
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      const { token } = response.data;
      setUser({ username, token });
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error en login:", error);
      throw new Error("Credenciales inválidas");
    }
  };

  // Nueva función de signup
  const signup = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        username,
        password,
      });
      const { token } = response.data;
      setUser({ username, token });
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error en signup:", error);
      throw new Error("Error en el registro");
    }
  };

  // Modificar la función de logout para redirigir al home
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/"); // Redirige al home después del logout
  };

  const value = {
    user,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};