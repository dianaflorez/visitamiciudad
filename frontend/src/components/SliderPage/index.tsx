import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Autoplay } from "swiper/modules";
import { Typography, Button, Grid, Card, CardMedia } from "@mui/material";

function SliderPage() {
  const slides = [
    {
      img: "./images/new-hero-3.png",
      title: "San Juan de Pasto",
      description: "Ciudad Sorpresa. Su riqueza histórica, cultural y colonial se puede observar en cada calle, porque se ha guardado su historia a través del tiempo.",
      link: '/ciudad'
    },
    {
      img: "./images/slider-carnavales.png",
      title: "Carnavales",
      description: "El Carnaval de negros y blancos es una expresión de la diversidad cultural de Pasto y del país, el cual se manifiesta a través de comparsas...",
      link: '/carnvales'
    },
    {
      img: "./images/new-hero-3.png",
      title: "Tour Cafes Especiales",
      description: "Concurso que fortalece el consumo de cafés especiales en el departamento de Nariño...",
      link: '/cafe'

    },
  ];

  return (
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
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Navigation, Autoplay]}
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
                    {slide.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {slide.description}
                  </Typography>
                  <Button variant="contained" color="secondary" href={slide.link} >
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
                        height: "auto",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Card>
                </Grid>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
}

export default SliderPage;
