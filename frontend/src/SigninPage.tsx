import { Footer, SigninForm } from "./components";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SigninPage = () => {
  const { signup } = useAuth(); // Usa la función de registro
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null); // Estado para el manejo de errores

  const handleSignin = async (username: string, password: string) => {
    try {
      setError(null); // Reinicia el estado de error
      await signup(username, password); // Llama a signup con ambos argumentos
      navigate("/sitio-index"); // Navega después de un registro exitoso
    } catch (error) {
      console.error("Error en el registro:", error);
      setError("Error en el registro. Por favor, intenta de nuevo.");
    }
  };

  return (
    <>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <SigninForm onSignin={handleSignin} />
      <Footer />
    </>
  );
};

export default SigninPage;
