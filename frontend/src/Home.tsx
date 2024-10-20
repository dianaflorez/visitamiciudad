import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import { Container } from "@mui/material";

import { SliderPage, ContactForm, Footer, Sitios, Rutas } from "./components";
import AboutUs from "./components/AboutUs";

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Container>
          <SliderPage />
          <Sitios />
          <Rutas />
          <AboutUs />
        </Container>

        <ContactForm />
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default Home;
