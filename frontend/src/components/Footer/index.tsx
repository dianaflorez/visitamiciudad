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
                <Link href="#" color="inherit">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#" color="inherit">
                  Sitios de Interés
                </Link>
              </li>
              <li>
                <Link href="#" color="inherit">
                  Rutas
                </Link>
              </li>
              <li>
                <Link href="#" color="inherit">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#" color="inherit">
                  Contáctanos
                </Link>
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
