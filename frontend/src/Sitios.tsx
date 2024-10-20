import { Container } from "@mui/material";
import { ContactForm, Footer } from "./components";

const Sitios = () => {
  return (
    <>
      <Container>
        <h1>Página de Sitios</h1>
        <p>Aquí estarán listados los sitios turísticos.</p>
      </Container>
      <ContactForm />
      <Footer />
    </>
  );
};

export default Sitios;
