import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function CardRuta() {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      {/* Imagen */}
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CardMedia
          component="img"
          height="140"
          image="/images/ruta_familia.png"
          alt="Familia"
          sx={{ maxWidth: 200 }} // Ajusta el tamaño si es necesario
        />
      </Box>
      {/* Detalles */}
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          Familia
        </Typography>
      </CardContent>
      {/* Número de días y botón */}
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Número de días
        </Typography>
        <TextField
          type="number"
          name="days"
          defaultValue="1"
          inputProps={{ min: 1, max: 30 }}
          className="form-control ruta-combo"
          sx={{ width: "100%", mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Consultar Rutas
        </Button>
      </CardContent>
    </Card>
  );
}
