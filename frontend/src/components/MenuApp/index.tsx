import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button, Box, Container } from "@mui/material";

import { Menu, MenuItem, IconButton } from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";


function MenuApp() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
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
            <Button
              color="inherit"
              href="./#nosotros"
              style={{ marginTop: 12 }}
            >
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



            {/* Menú Administrador */}
            <IconButton
              color="inherit"
              onClick={handleMenuClick}
              style={{ marginTop: 11 }}
            >
              Administrador <ArrowDropDownIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/sitio-index" onClick={handleMenuClose}>
                Cards/Sitios
              </MenuItem>
              <MenuItem component={Link} to="/card-group" onClick={handleMenuClose}>
                CardGroup
              </MenuItem>
              <MenuItem component={Link} to="/usuarios" onClick={handleMenuClose}>
                Usuarios
              </MenuItem>
              <MenuItem component={Link} to="/publicidad" onClick={handleMenuClose}>
                Publicidad
              </MenuItem>
              <MenuItem component={Link} to="/rutas" onClick={handleMenuClose}>
                Rutas
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default MenuApp;
