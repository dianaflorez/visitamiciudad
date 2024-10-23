import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { ContactForm, Footer } from "./components";

import BannerList from './components/BannerList';
import { List, ListItem, Link, Card, CardContent, CardMedia, Box, Grid } from '@mui/material';

import ImageGallery from './components/ImageGallery'; // Ajusta la ruta según sea necesario

const Ciudad = () => {

    const bannerData = [
        { imageSrc: './images/banner1.jpg' },
        { imageSrc: './images/banner2.jpg' },
        { imageSrc: './images/banner3.jpg' },
        { imageSrc: './images/banner4.jpg' },
    ];


    const imagesArray = [
        './images/cafe0.jpg',
        './images/cafe1.jpg',
        './images/cafe2.jpg',
        './images/cafe3.jpg',
        './images/cafe4.jpg',
        './images/cafe5.jpg',
    ];

  return (
    <>
        <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 10 }}>

            {/* <BannerList banners={bannerData} /> */}
            
            <Typography
            id="cafe"
            variant="h4"
            align="left"
            gutterBottom
            sx={{ marginTop: "20px" }}
            >
            <span style={{ color: "purple" }}>•</span> Evento Master Coffee{" "}
            <span style={{ color: "purple" }}>•</span>
            </Typography>
                
            
            <List>
                <ListItem>
                <Link href="#que-ver-en-san-juan-de-pasto-y-narino" underline="hover">
                    ¿Qué lugares recorrer?
                </Link>
                </ListItem>
                <ListItem>
                <Link href="#que-hacer-en-san-juan-de-pasto-y-narino-actividades-aventura-colombia" underline="hover">
                    Recorrido Master Coffee
                </Link>
                </ListItem>
            </List>
          
            <Card>
                <Grid container spacing={2}>
                    {/* Imagen al lado */}
                    <Grid item xs={12} sm={4}>
                    <CardMedia
                        component="img"
                        height="100%"
                        image="./images/cafe0.jpg"
                        alt="Pasto"
                    />
                    </Grid>
                    
                    {/* Contenido al lado de la imagen */}
                    <Grid item xs={12} sm={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Cafe de Nariño
                        </Typography>
                        <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                            Un tour de cafés especiales
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                        El café es uno de los elementos estrella de Colombia, se ha caracterizado por la calidad y sabor del mismo. En Nariño se siembra un excelente café en manos de campesinos expertos y que, en la siembra del grano, han encontrado el amor por su tierra.
                        <br></br>
                        <br></br>
                        El café de Nariño es uno de los más conocidos y apetecidos por su sabor y aroma. En su ciclo productivo se involucran condiciones geográficas, fisiológicas de las plantas, de secado, y por supuesto, la dedicación y conocimiento de los cafeteros de la zona quienes hacen que este sea uno de los productos insignia del departamento para el mundo entero.
                        <br></br>
                        <br></br>
                        Su calidad ha conquistado diferentes continentes, y en Pasto, los visitantes, tienen la oportunidad de visitar varios lugares donde el café es el protagonista con sus características únicas

                        
                        <Typography gutterBottom variant="h5" component="div">
                            <Link href="https://turismo.narino.gov.co/rutas/ruta-del-cafe/" underline="hover" target ="_blank" >
                                Recomendamos Ruta Cafe de Nariño
                            </Link>
                        </Typography>
                        
                        </Typography>
                    </CardContent>
                    </Grid>
                </Grid>
            </Card>

            <Typography gutterBottom variant="h4" component="div" sx={{ marginTop: 4, marginBottom: 10 }}>
                Cafeterias de San Juan de Pasto - Nariño
            </Typography>

            <Card sx={{ marginTop: 4, marginBottom: 10 }}>
                <Grid container spacing={2}>
                    {/* Contenido al lado de la imagen */}
                    <Grid item xs={12} sm={8}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                            Obraje
                            </Typography>
                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Nariño, cuna de uno de los mejores cafés del mundo, asi lo refleja por ser el ganador de la taza de la excelencia 2021
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                             El Café el Obraje, ganador de la taza de la excelencia 2021, representa el café de Nariño, uno de los más suaves y reconocidos de Colombia y del mundo. Panela, floral, coco, uchuva. En boca tenemos acidez media, cuerpo sedoso, aromático, con final muy agradable.
                            </Typography>
                        </CardContent>
                    </Grid>
                    {/* Imagen al lado */}
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="https://media.licdn.com/dms/image/v2/C4D1BAQFDb306ULwJOQ/company-background_10000/company-background_10000/0/1610985178559/cafe_el_obraje_cover?e=2147483647&v=beta&t=fEijQBnQy_TKsUOjyG24sQ7OWNCmn4hcgtYxwC9oTuE"
                            alt="Pasto"
                        />
                    </Grid>
                </Grid>
            </Card>
                
            <ImageGallery images={imagesArray} />

        
      </Container>
      <ContactForm />
      <Footer />
    </>
  );
};

export default Ciudad;
