import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import Sitios from "./Sitios"; // Página de sitios externos
import Login from "./Login"; // Página de login
import Home from "./Home"; // Página de login
import SitiosDesc from "./SitiosDesc"; // Página de sitios externos

/* slick-carousel CSS */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MenuApp } from "./components";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MenuApp />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sitios" element={<Sitios />} />
          <Route path="/sitios-descripcion" element={<SitiosDesc />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
