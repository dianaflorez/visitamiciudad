import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button, Box, Container } from "@mui/material";

import { Menu, MenuItem } from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function MenuApp() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();

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

          {/* Menú Administrador */}
          {user ? (
            <div>
              <Button
                color="inherit"
                onClick={handleMenuClick}
                style={{ marginTop: 11 }}
              >
                Administrador <ArrowDropDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  to="/sitio-index"
                  onClick={handleMenuClose}
                >
                  Cards/Sitios
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/card-group"
                  onClick={handleMenuClose}
                >
                  CardGroup
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/usuarios"
                  onClick={handleMenuClose}
                >
                  Usuarios
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/publicidad"
                  onClick={handleMenuClose}
                >
                  Publicidad
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/rutas"
                  onClick={handleMenuClose}
                >
                  Rutas
                </MenuItem>
              </Menu>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                onClick={logout}
                style={{ marginTop: 12 }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button color="primary" href="/" style={{ marginTop: 12 }}>
                Inicio
              </Button>
              <Button color="inherit" href="/#sitios" style={{ marginTop: 12 }}>
                Sitios de Interés
              </Button>
              <Button color="inherit" href="/#rutas" style={{ marginTop: 12 }}>
                Rutas
              </Button>
              <Button
                color="inherit"
                href="/#nosotros"
                style={{ marginTop: 12 }}
              >
                Nosotros
              </Button>
              <Button
                color="inherit"
                href="/#contactenos"
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
              <Button
                color="inherit"
                component={Link}
                to="/signin"
                style={{ marginTop: 12 }}
              >
                SignIn
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default MenuApp;
