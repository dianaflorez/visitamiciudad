import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import { Container } from "@mui/material";

import {
  SliderPage,
  ContactForm,
  Footer,
  Sitios,
  Rutas,
  AboutUs,
} from "./components";

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Container>
          <SliderPage />
          <Sitios />
        </Container>
        
        <Rutas />
        <AboutUs />

        <ContactForm />
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default Home;
