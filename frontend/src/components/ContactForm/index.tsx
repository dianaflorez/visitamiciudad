import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";

function ContactForm() {
  return (
    <Grid container sx={{ backgroundColor: "#27afdd" }} justifyContent="left">
      <Container>
        <Grid id="contactenos" item xs={12} md={6} padding={2}>
          <Box sx={{ backgroundColor: "#27afdd", padding: "40px" }}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Contáctanos
                </Typography>
              </Grid>

              {/* Campo para Nombre */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Nombre"
                  InputProps={{
                    sx: {
                      borderRadius: "30px",
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>

              {/* Campo para Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  InputProps={{
                    sx: {
                      borderRadius: "30px",
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>

              {/* Campo para Celular */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Celular"
                  InputProps={{
                    sx: {
                      borderRadius: "30px",
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>

              {/* Campo para Mensaje */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Mensaje"
                  multiline
                  rows={4}
                  InputProps={{
                    sx: {
                      borderRadius: "30px",
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>

              {/* Botón Enviar */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#4a0d7a",
                    borderRadius: "30px",
                    color: "white",
                    width: "200px",
                    padding: "10px 0",
                    "&:hover": {
                      backgroundColor: "#3b095e",
                    },
                  }}
                >
                  ENVIAR
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Grid>
  );
}

export default ContactForm;
