import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import Sitios from "./Sitios"; // Página de sitios externos
import Login from "./Login"; // Página de login
import Home from "./Home"; // Página de login
import SitiosDetail from "./SitiosDetail";
import SitioNew from "./SitioNew";
import SitioEdit from "./SitioEdit";
import SitioIndex from "./SitioIndex";
import SitioDetailEdit from "./SitioDetailEdit";
import SitioGalleryAdd from "./SitioGalleryAddImage";

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
          <Route path="/sitios-descripcion" element={<SitiosDetail />} />
          <Route path="/login" element={<Login />} />

          <Route path="/sitio-index" element={<SitioIndex />} />
          <Route path="/sitio-new" element={<SitioNew />} />
          <Route path="/sitio-edit/:id" element={<SitioEdit />} />
          <Route path="/sitio-detail-edit/:id" element={<SitioDetailEdit />} />
          <Route path="/sitio-galery-add/:id" element={<SitioGalleryAdd />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
