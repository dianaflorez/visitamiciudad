import { useState } from "react";
import { Container } from "@mui/material";
import { ContactForm, Footer } from "./components";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      login(username);
      navigate("/sitio-index");
    }
  };

  return (
    <>
      <Container>
        <h1>Página de Inicio de Sesión</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Usuario:
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input type="password" name="password" />
          </label>
          <br />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </Container>
      <ContactForm />
      <Footer />
    </>
  );
};

export default LoginPage;
