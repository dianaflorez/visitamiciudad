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

// import locationImg from './images/location.png'; // Asegúrate de que la ruta sea correcta
// import telephoneImg from './images/telephone.png'; // Asegúrate de que la ruta sea correcta
// import envelopeImg from './images/envelope.png'; // Asegúrate de que la ruta sea correcta

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
    <Box sx={{ bgcolor: "#023f52", color: "white", py: 4 }}>
      <Container>
        <Grid container spacing={4}>
          {/* Menú */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Menú
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <CustomLink href="./" color="inherit">
                  Inicio
                </CustomLink>
              </li>
              <li>
                <CustomLink href="./#sitios" color="inherit">
                  Sitios de Interés
                </CustomLink>
              </li>
              <li>
                <CustomLink href="./#rutas" color="inherit">
                  Rutas
                </CustomLink>
              </li>
              <li>
                <CustomLink href="./#nosotros" color="inherit">
                  Nosotros
                </CustomLink>
              </li>
              <li>
                <CustomLink href="./#contactenos" color="inherit">
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
            <Typography>520001</Typography>
            <Typography>(+57 300777000)</Typography>
            <Typography>infovisitamiciudad@gmail.com</Typography>
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
