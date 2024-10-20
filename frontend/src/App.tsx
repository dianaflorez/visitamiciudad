
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import Sitios from './Sitios'; // Página de sitios externos
import Login from './Login'; // Página de login
import Home from './Home'; // Página de login

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
} from "@mui/material";

function App() {
  

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* Navbar */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              component="img"
              sx={{ height: 100, mr: 2 }}
              alt="Logo de la empresa"
              src="./images/logo-new.png" // Reemplaza con tu logo
            />
            <div>
              <Button color="primary" href="./" style={{ marginTop: 12 }}>
                Inicio
              </Button>
              <Button color="inherit" href="./#sitios" style={{ marginTop: 12 }}>
                Sitios de Interés
              </Button>
              <Button color="inherit" href="./#rutas" style={{ marginTop: 12 }}>
                Rutas
              </Button>
              <Button color="inherit" href="./#nosotros" style={{ marginTop: 12 }}>
                Nosotros
              </Button>
              <Button color="inherit" href="./#contactenos" style={{ marginTop: 12 }}>
                contáctenos
              </Button>
              <Button color="inherit" component={Link} to="/login" style={{ marginTop: 12 }}>
                Login
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        {/* Rutas para Login y Sitios */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Renderiza Home cuando la ruta sea / */}
          <Route path="/sitios" element={<Sitios />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </Router>
    </ThemeProvider>
  );
}

export default App;
