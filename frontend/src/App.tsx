import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import Sitios from "./Sitios"; // Página de sitios externos
import LoginPage from "./LoginPage"; // Página de login
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
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <MenuApp />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sitios" element={<Sitios />} />
            <Route path="/sitios-descripcion" element={<SitiosDetail />} />
            <Route path="/login" element={<LoginPage />} />

            {/*Rutas Privadas*/}
            <Route
              path="/sitio-index"
              element={
                <PrivateRoute>
                  <SitioIndex />
                </PrivateRoute>
              }
            />
            <Route
              path="/sitio-new"
              element={
                <PrivateRoute>
                  <SitioNew />
                </PrivateRoute>
              }
            />
            <Route
              path="/sitio-edit/:id"
              element={
                <PrivateRoute>
                  <SitioEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/sitio-detail-edit/:id"
              element={
                <PrivateRoute>
                  <SitioDetailEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/sitio-gallery-add/:id"
              element={
                <PrivateRoute>
                  <SitioGalleryAdd />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
