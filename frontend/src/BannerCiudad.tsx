import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { ContactForm, Footer } from "./components";

import { List, ListItem, Link, Card, CardContent, CardMedia, Box, Grid } from '@mui/material';

import ImageGallery from './components/ImageGallery'; // Ajusta la ruta según sea necesario

const BannerCiudad = () => {

    const imagesArray = [
        './images/ciudad0.jpg',
        './images/ciudad1.jpg',
        './images/ciudad2.jpg',
        './images/ciudad3.jpg',
        './images/ciudad4.jpg',
        './images/ciudad5.jpg',
        './images/ciudad6.jpg',
        './images/ciudad7.jpg',
        './images/ciudad8.jpg',
        './images/ciudad9.jpg',
        './images/ciudad10.jpg',
        './images/ciudad11.jpg',
        './images/ciudad12.jpg',
    ];

  return (
    <>
        <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 10 }}>

            {/* <BannerList banners={bannerData} /> */}
            
            <Typography
            id="Ciudad"
            variant="h4"
            align="left"
            gutterBottom
            sx={{ marginTop: "20px" }}
            >
            <span style={{ color: "purple" }}>•</span> San Juan de Pasto{" "}
            <span style={{ color: "purple" }}>•</span>
            </Typography>
                
            
            <List>
                <ListItem>
                <Link href="#que-ver-en-san-juan-de-pasto-y-narino" underline="hover">
                    ¿Qué ver en San Juan de Pasto y Nariño?
                </Link>
                </ListItem>
                <ListItem>
                <Link href="#que-hacer-en-san-juan-de-pasto-y-narino-actividades-aventura-colombia" underline="hover">
                    Qué hacer en San Juan de Pasto y Nariño - Actividades Aventura Colombia
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
                        image="./images/sitios_geo.png"
                        alt="Pasto"
                    />
                    </Grid>
                    
                    {/* Contenido al lado de la imagen */}
                    <Grid item xs={12} sm={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Pasto
                        </Typography>
                        <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                            ¿Qué ver en San Juan de Pasto y Nariño?
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                        ¿Alguna vez se han preguntado por qué a<strong> Pasto</strong> le dicen la <strong>Ciudad Sorpresa de Colombia</strong>? &nbsp;Resulta que después de recorrer muchos kilómetros por la Cordillera de los Andes, llega un momento en el que dentro del paisaje montañoso se abre un panorama inesperado para los visitantes: <strong>una metrópoli, organizada en medio del Valle de Atriz y justo al lado del Volcán Galeras, una de las montañas de fuego más peligrosas del Latinoamérica.</strong>
                        Ahí, en ese territorio, la herencia cultural de sus antepasados indígenas confluye con el legado colonial, sumado a las expresiones presentes del acervo pacifico-amazónico de todo el departamento.<strong> Pasto es una ciudad diversa, ancestral, gastronómica, artesanal, teológica, artística, ambiental.</strong> Es, sin lugar a dudas una ciudad sorpresa.
                        </Typography>
                    </CardContent>
                    </Grid>
                </Grid>
            </Card>

            <Card sx={{ marginTop: 4, marginBottom: 10 }}>
                <Grid container spacing={2}>
                    {/* Contenido al lado de la imagen */}
                    <Grid item xs={12} sm={8}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Un recorrido por las iglesias
                            </Typography>
                            
                            <Typography variant="body1" gutterBottom>
                            La presencia de grandes y majestuosos templos católicos con más de 5 siglos de existencia le ha dado a la Pasto el nombre de ciudad teológica de Colombia, en este punto el recorrido puede ser una ruta de fe o arquitectónica. Las edificaciones cuentan historias, el pasado colonial y el sincretismo religioso está reflejado en los monumentos de gran valor artístico, con varios estilos e inmensos oleos que hacen de cada iglesia una obra de arquitectura digna de admirar. En el centro de la ciudad pueden encontrar, en menos de 2 km a la redonda, los templos de: San Juan Bautista, La Catedral, La Merced, Cristo Rey, San Agustín, San Andrés, San Felipe, Santiago, entre otras.
                            </Typography>
                        </CardContent>
                    </Grid>
                    {/* Imagen al lado */}
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="https://aventurecolombia.com/wp-content/uploads/2021/04/Pasto-2.jpg"
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

export default BannerCiudad;
