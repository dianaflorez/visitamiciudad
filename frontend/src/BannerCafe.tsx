import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { ContactForm, Footer } from "./components";

import { List, ListItem, Link, Card, CardContent, CardMedia, Grid } from '@mui/material';

import ImageGallery from './components/ImageGallery'; // Ajusta la ruta según sea necesario

const Ciudad = () => {


    const imagesArray = [
        './images/cafe0.jpg',
        './images/cafe1.jpg',
        './images/cafe2.jpg',
        './images/cafe3.jpg',
        './images/cafe4.jpg',
        './images/cafe5.jpg',
        './images/cafe6.jpg',
        './images/cafe7.jpg',
        './images/cafe8.jpg',
        './images/cafe9.jpg',
        './images/cafe10.jpg',
        './images/cafe11.jpg',
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


            <Card sx={{ marginTop: 4, marginBottom: 10 }}>
                <Grid container spacing={2}>
                    {/* Contenido al lado de la imagen */}
                    <Grid item xs={12} sm={8}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                            Caffeto
                            </Typography>
                            
                            <Typography variant="body1" gutterBottom>
                                Caffeto, marca especializada en cafés de Nariño, proyecta una línea de productos que busca enriquecer la experiencia del huésped a la hora de degustar esta bebida aromática.
                                <br></br>
                                <br></br>

                                Gracias a los variados pisos términos con los que ha sido privilegiado Nariño, los frutos de café que allí se desarrollan tienen propiedades diferenciales y de altísima calidad. Estas características, muy apetecidas en los mercados internacionales, las ha sabido aprovechar Caffeto, un referente de esta zona del país, que desde 1996 procesa y comercializa un café único. 
                            </Typography>

                            <Link href="https://caffeto.com.co/" underline="hover" target ="_blank" >
                                Caffeto
                            </Link>
                        </CardContent>
                    </Grid>
                    {/* Imagen al lado */}
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="./images/cafe_caffeto.jpg"
                            alt="Pasto"
                        />
                    </Grid>
                </Grid>
            </Card>


            <Card sx={{ marginTop: 4, marginBottom: 10 }}>
                <Grid container spacing={2}>
                    {/* Contenido al lado de la imagen */}
                    <Grid item xs={12} sm={8}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                            Moneta
                            </Typography>
                            
                            <Typography variant="body1" gutterBottom>
                                Desde las montañas de Aponte hasta el Pacífico en Tumaco, nuestra bebida de autor Cordillera y Mar combina el café honey de altura con cáscara de cacao tumaqueño y la frescura del coco. Un tributo al territorio nariñense y su historia.

                                ¡Prueba su sabor y vota por Moneta en el Coffee Master!
                                ☕Bebida solo disponible en Moneta Sede Versalles

                                #café #cafeteria #coffemaster #pacifico #pastonariño #sabornariñense
                            </Typography>

                            <Link href="https://caffeto.com.co/" underline="hover" target ="_blank" >
                                Caffeto
                            </Link>
                        </CardContent>
                    </Grid>
                    {/* Imagen al lado */}
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="./images/cafe_moneta.jpg"
                            alt="Pasto"
                        />
                    </Grid>
                </Grid>
            </Card>
                

            <Typography gutterBottom variant="h3" component="div">
                Evento Master Coffe
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
                Concurso que fortalece el consumo de cafés especiales en el departamento de Nariño. Las cafeterias participantes seleccionan una bebida, la cual 

            </Typography>

            <ImageGallery images={imagesArray} />

        
      </Container>
      <ContactForm />
      <Footer />
    </>
  );
};

export default Ciudad;
