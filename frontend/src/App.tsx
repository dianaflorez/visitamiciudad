import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import Sitios from "./Sitios";
import LoginPage from "./LoginPage";
import SigninPage from "./SigninPage";
import Home from "./Home";
import SitiosDetail from "./SitiosDetail";
import SitioNew from "./SitioNew";
import SitioEdit from "./SitioEdit";
import SitioIndex from "./SitioIndex";
import SitioDetailEdit from "./SitioDetailEdit";
import SitioGalleryAdd from "./SitioGalleryAddImage";
import ScrollToTop from "./ScrollToTop"; // Importar el nuevo componente

import Ciudad from "./BannerCiudad";
import Cafe from "./BannerCafe";


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
          <ScrollToTop /> {/* Componente para manejar el scroll */}
          <MenuApp />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sitios/:title" element={<Sitios />} />
            <Route path="/sitios-descripcion/:id" element={<SitiosDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signin" element={<SigninPage />} />


            {/* Rutas Privadas */}
            <Route path="/ciudad" element={<Ciudad />} />
            <Route path="/carnaval" element={<Ciudad />} />
            <Route path="/cafe" element={<Cafe />} />

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