import { Footer, LoginForm } from "./components";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    if (username) {
      login(username);
      navigate("/sitio-index");
    }
    // Aquí puedes manejar la lógica de autenticación, por ejemplo, hacer una petición a una API
    console.log("Login details:", { username, password });
  };

  return (
    <>
      <LoginForm onLogin={handleLogin} />
      <Footer />
    </>
  );
};

export default LoginPage;
