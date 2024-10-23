import { Footer, SigninForm } from "./components";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SigninPage = () => {
  const { signup } = useAuth(); // Usa la función de registro
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null); // Estado para el manejo de errores

  const handleSignin = async (email: string, password: string, name: string) => {
    try {
      setError(null); // Reinicia el estado de error
      await signup(email, password, name); // Llama a signup con los tres argumentos
      navigate("/sitio-index"); // Navega después de un registro exitoso
    } catch (err: unknown) { // Usar 'unknown' en lugar de 'any'
      if (err instanceof Error) {
        console.error("Error en el registro:", err.message);
        setError(err.message); // Mostrar el mensaje de error
      } else {
        console.error("Error en el registro:", err);
        setError("Error en el registro. Por favor, intenta de nuevo.");
      }
    }
  };

  return (
    <>
      <SigninForm onSignin={handleSignin} error={error} />
      <Footer />
    </>
  );
};

export default SigninPage;
