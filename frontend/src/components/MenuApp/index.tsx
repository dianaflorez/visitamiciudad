import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button, Box } from "@mui/material";
function MenuApp() {
  return (
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
          <Button
            color="inherit"
            href="./#contactenos"
            style={{ marginTop: 12 }}
          >
            contáctenos
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            style={{ marginTop: 12 }}
          >
            Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MenuApp;
