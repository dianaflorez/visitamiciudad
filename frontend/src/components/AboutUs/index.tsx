import { Typography, Button, Grid } from "@mui/material";

function AboutUs() {
  return (
    <Grid container>
      <Grid item xs={12} md={8} padding={2}>
        <img
          src="./images/about-img.png"
          alt="Example"
          style={{ height: "auto", width: "85%", objectFit: "cover" }}
        />
      </Grid>
      <Grid
        item
        padding={2}
        xs={12}
        md={4}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          id="nosotros"
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Nosotros <span style={{ color: "purple" }}>•</span>
        </Typography>

        <Typography variant="body1" gutterBottom>
          "Visita Mi Ciudad" es una aplicación web turística diseñada para 
          ayudar a los usuarios a visualizar y registrar eventos, así como 
          sitios culturales y turísticos de la ciudad San Juan de Pasto.
        </Typography>
        {/* <Button variant="contained" color="secondary" sx={{ marginTop: 3 }}>
          Leer Más...
        </Button> */}
      </Grid>
    </Grid>
  );
}

export default AboutUs;
