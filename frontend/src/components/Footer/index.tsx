import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

import { styled } from "@mui/system";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomLink = styled(Link)(() => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  "&:before": {
    content: '""',
    width: "7px",
    height: "7px",
    backgroundColor: "#d3d3d3",
    marginRight: "7px",
  },
}));

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#023f52",
        color: "white",
        py: 4,
        textAlign: "center",
        position: "relative",
        bottom: 0,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Menú */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Menú
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <CustomLink href="/" color="inherit">
                  Inicio
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/#sitios" color="inherit">
                  Sitios de Interés
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/#rutas" color="inherit">
                  Rutas
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/#nosotros" color="inherit">
                  Nosotros
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/#contactenos" color="inherit">
                  Contáctanos
                </CustomLink>
              </li>
            </ul>
          </Grid>

          {/* Localización */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Localización
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <img
                src="./images/location.png"
                alt="Localización"
                style={{ width: "20px", marginRight: "8px" }}
              />
              <Typography>520001</Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <img
                src="./images/telephone.png"
                alt="Teléfono"
                style={{ width: "24px", marginRight: "8px" }}
              />
              <Typography>(+57 300777000)</Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <img
                src="./images/envelope.png"
                alt="Correo electrónico"
                style={{ width: "24px", marginRight: "8px" }}
              />
              <Typography>infovisitamiciudad@gmail.com</Typography>
            </Box>
          </Grid>

          {/* Social Link */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Social Link
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Facebook />
              <Twitter />
              <Instagram />
              <LinkedIn />
            </Box>
          </Grid>

          {/* Suscripción de Noticias */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Noticias
            </Typography>
            <TextField
              label="Ingrese su email"
              variant="filled"
              fullWidth
              InputProps={{
                style: { backgroundColor: "white", borderRadius: "4px" },
              }}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#03a9f4", color: "white" }}
            >
              SUBSCRIBIRSE
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
