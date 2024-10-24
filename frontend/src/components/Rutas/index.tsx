import { Grid, Typography, Container } from "@mui/material";
import { CardRuta } from "../../components";

const Rutas = () => {
  const routesData = [
    {
      imageSrc: "images/ruta_familia.png",
      altText: "Familia",
      title: "Familia",
      group: "familia",
    },
    {
      imageSrc: "images/ruta_pareja.png",
      altText: "Pareja",
      title: "Pareja",
      group: "pareja",
    },
    {
      imageSrc: "images/ruta_viajera.png",
      altText: "Individual",
      title: "Individual",
      group: "individual",
    },
    {
      imageSrc: "images/ruta_institucional.png",
      altText: "Grupal",
      title: "Grupal",
      group: "Grupal",
    },
  ];

  return (
    <Grid
      container
      sx={{ marginTop: "2rem", backgroundColor: "#9c27b0" }}
      justifyContent="left"
    >
      <Container sx={{ paddingBottom: "2rem", backgroundColor: "#9c27b0" }}>
        <Typography
          id="rutas"
          variant="h4"
          align="left"
          gutterBottom
          sx={{ marginTop: "30px", color: "white" }}
        >
          <span style={{ color: "purple" }}>•</span> Rutas{" "}
          <span style={{ color: "purple" }}>•</span>
        </Typography>
        <Grid container spacing={2}>
          {routesData.map((route, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CardRuta
                imageSrc={route.imageSrc}
                altText={route.altText}
                title={route.title}
                group={route.group} // Pasamos el grupo aquí
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};

export default Rutas;

// import { Typography, Grid } from "@mui/material";

// import { CardRuta } from "../../components";

// function Rutas() {
//   return (
//     <>
//       <Typography
//         id="rutas"
//         variant="h4"
//         align="left"
//         gutterBottom
//         sx={{ marginTop: "20px" }}
//       >
//         <span style={{ color: "purple" }}>•</span> Rutas{" "}
//         <span style={{ color: "purple" }}>•</span>
//       </Typography>

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={12} padding={2}>
//           <CardRuta />

//         </Grid>
//       </Grid>
//     </>
//   );
// }

// export default Rutas;
