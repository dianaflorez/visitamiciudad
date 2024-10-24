import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button, Box, Container } from "@mui/material";

import { Menu, MenuItem } from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "@mui/material/styles";

function MenuApp() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();

  const [scrolling, setScrolling] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolling(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: scrolling ? theme.palette.primary.main : "transparent",
        color: scrolling ? "#fff" : "#000",
        padding: "12px 0px",
        transition: "background-color 0.5s ease",
      }}
      elevation={0}
    >
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img
              src={
                scrolling ? "/images/logo-small.png" : "/images/logo-new.png"
              }
              alt="Logo"
              style={{
                height: scrolling ? "80px" : "100px",
                transition: "all 0.3s ease",
              }}
            />
          </Box>

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
              <Button color="inherit" href="/" style={{ marginTop: 12 }}>
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
      </Container>
    </AppBar>
  );
}

export default MenuApp;
