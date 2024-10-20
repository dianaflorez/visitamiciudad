import { Typography, Grid } from "@mui/material";

import { CardRuta } from "../../components";

function Rutas() {
  return (
    <>
      <Typography
        id="rutas"
        variant="h4"
        align="left"
        gutterBottom
        sx={{ marginTop: "20px" }}
      >
        <span style={{ color: "purple" }}>•</span> Rutas{" "}
        <span style={{ color: "purple" }}>•</span>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12} padding={2}>
          <CardRuta />
        </Grid>
      </Grid>
    </>
  );
}

export default Rutas;
