import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import Sitios from "./Sitios"; // Página de sitios externos
import Login from "./Login"; // Página de login
import Home from "./Home"; // Página de login

import { MenuApp } from "./components";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MenuApp />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sitios" element={<Sitios />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
