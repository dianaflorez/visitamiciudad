import { Container } from "@mui/material";
import { ContactForm, Footer } from "./components";

const Login = () => {
  return (
    <>
      <Container>
        <h1>Página de Inicio de Sesión</h1>
        <form>
          <label>
            Usuario:
            <input type="text" name="username" />
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

export default Login;
