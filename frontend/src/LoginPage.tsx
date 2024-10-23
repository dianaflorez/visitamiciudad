import { Footer, LoginForm } from "./components";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null); // Estado para el mensaje de error

  const handleLogin = async (username: string, password: string) => {
    try {
      setError(null); // Reinicia el error al intentar iniciar sesión
      await login(username, password); // Llama a login con ambos argumentos
      navigate("/sitio-index"); // Navega después de iniciar sesión
    } catch (error) {
      console.error("Error en el login:", error);
      setError("Credenciales inválidas. Por favor, intenta de nuevo."); // Establece el mensaje de error
    }
  };

  return (
    <>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <LoginForm onLogin={handleLogin} />
      <Footer />
    </>
  );
};

export default LoginPage;