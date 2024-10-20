import { Typography, Grid, Box, Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Sitios() {
  const navigate = useNavigate();

  const sitiosInteres = [
    {
      id: 1,
      title: "Turísticos",
      image: "./images/sitios_foto_diego_guerrero.webp",
      photographer: "Foto: Diego Guerrero, Subsecretaría Turismo de Pasto",
    },
    {
      id: 2,
      title: "Históricos",
      image: "./images/sitios_historicos.jpg",
      photographer: "Foto: Ricardo Sarasty",
    },
    {
      id: 3,
      title: "Comerciales",
      image: "./images/sitios_comerciales.jpg",
      photographer: "Foto: Ricardo Sarasty",
    },
    {
      id: 4,
      title: "Valor Espiritual",
      image: "./images/sitio_espiritual.jpg",
    },
    {
      id: 5,
      title: "Culturales",
      image: "./images/sitios_culturales.jpg",
      photographer: "Foto: Ricardo Durán",
    },
    {
      id: 6,
      title: "Geográficos",
      image: "./images/sitios_geo.jpg",
      photographer: "Foto: Ricardo Sarasty",
    },
  ];

  const handleSitioClick = () => {
    navigate("/sitios");
  };
  return (
    <>
      <Typography
        id="sitios"
        variant="h4"
        align="left"
        gutterBottom
        sx={{ marginTop: "20px" }}
      >
        <span style={{ color: "purple" }}>•</span> Sitios de Interés{" "}
        <span style={{ color: "purple" }}>•</span>
      </Typography>

      <Grid container spacing={3}>
        {sitiosInteres.map((sitio) => (
          <Grid item xs={12} sm={6} md={4} key={sitio.id}>
            <Card
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "15px",
              }}
              onClick={handleSitioClick}
            >
              <CardMedia
                component="img"
                height="250"
                image={sitio.image}
                alt={sitio.title}
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease-in-out",
                  "&:hover": { opacity: 1 },
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {sitio.title}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Sitios;
