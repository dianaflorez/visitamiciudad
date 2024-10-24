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
      title: "Culturales",
      image: "./images/sitios_historicos.jpg",
      photographer: "Foto: Ricardo Sarasty",
    },
    {
      id: 3,
      title: "Gastronomía",
      image: "./images/sitios_comerciales.jpg",
      photographer: "Foto: Ricardo Sarasty",
    },
    {
      id: 4,
      title: "Entretenimiento",
      image: "./images/sitio_espiritual.jpg",
    },
  ];

  const normalizeTitle = (title: string): string => {
    return title
      .normalize("NFD") // Normaliza el string a una forma donde los caracteres diacríticos se separan
      .replace(/[\u0300-\u036f]/g, "") // Remueve los caracteres diacríticos
      .toLowerCase(); // Convierte a minúsculas
  };

  const handleSitioClick = (title: string) => {
    navigate(`/sitios/${normalizeTitle(title)}`);
  };
  return (
    <>
      <Typography
        id="sitios"
        variant="h4"
        align="left"
        gutterBottom
        sx={{ marginTop: "120px" }}
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
              onClick={() => handleSitioClick(sitio.title)}
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
