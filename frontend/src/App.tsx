import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import { Button, Typography, Chip } from "@mui/material";
import { Card } from "./components";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4">
        Proyecto: Visita Mi Ciudad <Chip label="Base React" color="primary" />
      </Typography>
      <hr />
      <Button variant="variant1">Test Button</Button>
      <Button variant="contained" sx={{ ml: 2 }}>
        Button 1
      </Button>
      <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
        Button 2
      </Button>
      <Button variant="outlined" sx={{ ml: 2 }}>
        Button 3
      </Button>
      <hr />
      <Card />
    </ThemeProvider>
  );
}

export default App;
