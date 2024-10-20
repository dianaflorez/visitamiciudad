import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import Sitios from './Sitios'; // Página de sitios externos
import Login from './Login'; // Página de login

// import { Button, Typography, Chip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Autoplay } from "swiper/modules"; // Importar módulos
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardMedia,
  Container,
} from "@mui/material";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

import { CardRuta } from "./components";


function App() {
  

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* Navbar */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              component="img"
              sx={{ height: 100, mr: 2 }}
              alt="Logo de la empresa"
              src="./images/logo-new.png" // Reemplaza con tu logo
            />
            <div>
              <Button color="primary" href="" style={{ marginTop: 12 }}>
                Inicio
              </Button>
              <Button color="inherit" href="#sitios" style={{ marginTop: 12 }}>
                Sitios de Interés
              </Button>
              <Button color="inherit" href="#rutas" style={{ marginTop: 12 }}>
                Rutas
              </Button>
              <Button color="inherit" href="#nosotros" style={{ marginTop: 12 }}>
                Nosotros
              </Button>
              <Button color="inherit" href="#contactenos" style={{ marginTop: 12 }}>
                contáctenos
              </Button>
              <Button color="inherit" component={Link} to="/login" style={{ marginTop: 12 }}>
                Login
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        {/* Rutas para Login y Sitios */}
        <Routes>
          <Route path="/sitios" element={<Sitios />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* Contenido de la página Home */}
        <Home />
      </Router>
    </ThemeProvider>
  );
}

// Página principal Home
function Home() {

  const navigate = useNavigate(); 

  const handleSitioClick = () => {
    navigate('/sitios');
  };

  const slides = [
    {
      img: "./images/new-hero-3.png",
      title: "Imagen 1",
      description: "Descripción de la imagen 1",
    },
    {
      img: "./images/new-hero-3.png",
      title: "Imagen 1",
      description: "Descripción de la imagen 1",
    },
    {
      img: "./images/new-hero-3.png",
      title: "Imagen 1",
      description: "Descripción de la imagen 1",
    },
  ];

  const sitiosInteres = [
    {
      title: "Turísticos",
      image: "./images/sitios_foto_diego_guerrero.webp",
      photographer: "Foto: Diego Guerrero, Subsecretaría Turismo de Pasto",
    },
    {
      title: "Históricos",
      image: "./images/sitios_historicos.jpg",
      photographer: "Foto: Ricardo Sarasty",
    },
    {
      title: "Comerciales",
      image: "./images/sitios_comerciales.jpg",
      photographer: "Foto: Ricardo Sarasty",
    },
    {
      title: "Valor Espiritual",
      image: "./images/sitio_espiritual.jpg",
    },
    {
      title: "Culturales",
      image: "./images/sitios_culturales.jpg",
      photographer: "Foto: Ricardo Durán",
    },
    {
      title: "Geográficos",
      image: "./images/sitios_geo.jpg",
      photographer: "Foto: Ricardo Sarasty",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <>
        <Container>
          {/* Header */}
          

          {/* Main content */}
          {/*<Container>*/}
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginTop: "50px" }}
          >
            <Grid item xs={12} md={12}>
              <Swiper
                spaceBetween={50}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                slidesPerView={1}
                loop={true} // Activar loop para repetir el carrusel
                pagination={{ clickable: true }}
                navigation={true} // Añadir navegación
                modules={[Navigation, Autoplay]} // Importar los módulos de Swiper
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <Grid container>
                      <Grid
                        item
                        padding={10}
                        xs={12}
                        md={5}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h3"
                          component="h1"
                          gutterBottom
                          sx={{ fontWeight: "bold" }}
                        >
                          San Juan de Pasto
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Ciudad Sorpresa. Su riqueza histórica, cultural y
                          colonial se puede observar en cada calle, porque se ha
                          guardado su historia a través del tiempo.
                        </Typography>
                        <Button variant="contained" color="secondary">
                          Leer Más...
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={7} padding={2}>
                        <Card sx={{ boxShadow: "none", border: "none" }}>
                          <CardMedia
                            component="img"
                            image={slide.img}
                            alt={slide.title}
                            sx={{
                              height: "auto", // Mantiene la proporción de la imagen
                              width: "100%", // Se ajusta al ancho del contenedor
                              objectFit: "cover", // Asegura que la imagen cubra el área sin deformarse
                            }}
                          />
                        </Card>
                      </Grid>
                    </Grid>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
            {/* Left side - Text */}
            {/*
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom>
                San Juan de Pasto
              </Typography>
              <Typography variant="body1" gutterBottom>
                Ciudad Sorpresa. Su riqueza histórica, cultural y colonial se
                puede observar en cada calle, porque se ha guardado su historia
                a través del tiempo.
              </Typography>
              <Button variant="contained" color="secondary">
                Leer Más...
              </Button>
            </Grid>
            */}

            {/* Right side - Carousel of images */}
          </Grid>
        </Container>
        {/* Main content */}
        <Container>
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

          {/* Grid for site cards */}
          <Grid container spacing={3}>
              {sitiosInteres.map((sitio) => (
              <Grid item xs={12} sm={6} md={4} key={sitio.id}>
                <Card 
                  sx={{ position: "relative", overflow: "hidden", borderRadius: "15px" }} 
                  onClick={handleSitioClick} 
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={sitio.image}
                    alt={sitio.title}
                    sx={{ transition: "transform 0.3s ease-in-out", "&:hover": { transform: "scale(1.1)" } }}
                  />
                  {/* Text overlay */}
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
        </Container>
        {/*</Container>*/}

        <Container>
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

          {/* Grid for site cards */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} padding={2}>
              <CardRuta />
            </Grid>
          </Grid>
        </Container>

        <Container>
          <Grid container>
            <Grid item xs={12} md={8} padding={2}>
              <img
                src="./images/about-img.png"
                alt="Example"
                style={{ height: "auto", width: "85%", objectFit: "cover" }} // Ajustar la imagen al contenedor
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
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here , content here', making it
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: 3 }}
              >
                Leer Más...
              </Button>
            </Grid>
          </Grid>
        </Container>

        <Grid
          container
          sx={{ backgroundColor: "#27afdd" }}
          justifyContent="left"
        >
          <Container>
            <Grid id="contactenos" item xs={12} md={6} padding={2}>
              <ContactForm />
            </Grid>
          </Container>
        </Grid>

        <Footer />
      </>

      {/*
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
      */}
    </ThemeProvider>
  );
}

export default App;
