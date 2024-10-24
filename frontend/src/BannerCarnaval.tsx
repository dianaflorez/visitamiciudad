import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { ContactForm, Footer } from "./components";

import { List, ListItem, Link, Card, CardContent, CardMedia, Grid } from '@mui/material';

import ImageGallery from './components/ImageGallery'; // Ajusta la ruta según sea necesario

const BannerCarnaval = () => {


    const imagesArray = [
        './images/carnaval0.jpg',
        './images/carnaval1.jpg',
        './images/carnaval2.jpg',
        './images/carnaval3.jpg',
        './images/carnaval4.jpg',
        './images/carnaval5.jpg',
        './images/carnaval6.jpg',
        './images/carnaval7.jpg',
        './images/carnaval8.jpg',
        './images/carnaval9.jpg',
        './images/carnaval10.jpg',
        './images/carnaval11.jpg',
    ];

    const imagesArray6Enero = [
        './images/carnaval12.jpg',
        './images/carnaval13.jpg',
        './images/carnaval14.jpg',
        './images/carnaval15.jpg',
        './images/carnaval16.jpg',
        './images/carnaval17.jpg',
        './images/carnaval18.jpg',
        './images/carnaval19.jpg',
        './images/carnaval20.jpg',
        './images/carnaval21.jpg',
        './images/carnaval22.jpg',
        './images/carnaval23.jpg',
    ];

  return (
    <>
        <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 10 }}>

            {/* <BannerList banners={bannerData} /> */}
            
            <Typography
            id="carnaval"
            variant="h4"
            align="left"
            gutterBottom
            sx={{ marginTop: "20px" }}
            >
            <span style={{ color: "purple" }}>•</span> Carnavales de Negros y Blancos{" "}
            <span style={{ color: "purple" }}>•</span>
            </Typography>
                
            
            <List>
                <ListItem>
                <Link href="#que-ver-en-san-juan-de-pasto-y-narino" underline="hover">
                    ¿Fechas de celebración y actividades?
                </Link>
                </ListItem>
                <ListItem>
                <Link href="#que-hacer-en-san-juan-de-pasto-y-narino-actividades-aventura-colombia" underline="hover">
                    Recorrido Carnavales
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
                        image="./images/carnaval_01.jpg"
                        alt="Pasto"
                    />
                    </Grid>
                    
                    {/* Contenido al lado de la imagen */}
                    <Grid item xs={12} sm={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Carnavales de Pasto - Patrimonio de la humanidad
                        </Typography>
                        <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                            Fechas especiales
                        </Typography>

                        <Typography variant="body1" gutterBottom>
                            El Carnaval es la celebración más importante, su manifestación es única y por ello fue declarado por la UNESCO como Patrimonio Cultural Inmaterial de la Humanidad en 2009. Lo ideal es visitar Pasto en medio de su fiesta, para conocer de cerca todo el fulgor y jolgorio que se vive en los primeros días del año, pero si no pueden venir justo en esas fechas ¡no pasa nada! porque pueden pasarse por el Museo del Carnaval de Negros y Blancos, un espacio de exhibición permanente del arte popular expresado en esta tradición cultural.
                            <br></br>
                            <br></br>
                            En cada sección podrán conocer su historia y apreciar las creaciones de los artesanos en cada una de las expresiones patrimoniales del Carnaval. El museo está ubicado en la Calle 19 con Carrera 42, en el Centro Cultural Pandiaco.
                        
                        <Typography gutterBottom variant="h5" component="div">
                            <Link href="https://carnavaldepasto.org/" underline="hover" target ="_blank" >
                                Recomendamos Carnavales de Pasto Sitio Oficial
                            </Link>
                        </Typography>
                        
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
                            <Typography gutterBottom variant="h4" component="div">
                                31 de Diciembre
                            </Typography>
                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Desfile de Años Viejos
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                             
                            Tradicional desfile y concurso de figuras alegóricas que representan personajes o hechos significativos, generalmente políticos, ocurridos durante el año que termina. Mediante la sátira, el humor y con mensajes críticos, se elaboran los motivos de los años viejos, que desfilan con su respectivo testamento, pues en horas de la noche se quemarán en punto de las doce.
                            <br></br>
                            <br></br>
                            Hora: 9:00 A.M.     Lugar: Senda del Carnaval
                            <br></br>
                            <br></br>

                            </Typography>

                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                            Muestra de Autos Antiguos
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                           
                            Carros antiguos que han sobrevivido al embate del tiempo, como piezas de lujo, recorren la senda del carnaval, para transportarnos a épocas pasadas. Los pilotos y acompañantes, como parte de la muestra, llevan atuendos acordes a los años de circulación de los vehículos. Es un pequeño viaje al pasado y una galería predilecta para los fanáticos del mundo automotriz.

                            Hora: 10:00 A.M.     Lugar: Senda del Carnaval

                            </Typography>
                        </CardContent>
                    </Grid>
                    {/* Imagen al lado */}
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="https://carnavaldepasto.org/wp-content/uploads/2023/12/6_Anos_viejos_31.png"
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
                                2 de Enero
                            </Typography>
                            
                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Ofrenda a la Virgen de las Mercedes
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                En el templo de la Merced, a partir de las siete de la mañana se celebra la eucarística en homenaje a la “Michita Linda”, Patrona de Pasto.
                                <br></br>
                                <br></br>
                                Hora: 7:00 A.M.     Lugar: Templo de la Merced
                                <br></br>
                                <br></br>
                            </Typography>

                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                El Carnavalito
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                La Senda del Carnaval abre un espacio para el disfrute carnavalero de la niñez y la adolescencia, en donde aflora la creatividad, la herencia artística, las prácticas culturales transmitidas de generación en generación y renovadas por la imaginación de la infancia.
                            </Typography>

                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Nariño Musical
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                En la Plaza de Nariño se brinda un espacio para la presentación de reconocidas agrupaciones musicales de las subregiones del departamento de Nariño, creadoras e intérpretes de distintos ritmos.
                            </Typography>

                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Rock Carnaval
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                En la Plaza del Carnaval, nos espera el concierto de música alternativa, con géneros musicales como el rock y el rap, para celebrar las diversas manifestaciones culturales juveniles.
                            </Typography>
                        </CardContent>
                    </Grid>
                    {/* Imagen al lado */}
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="https://carnavaldepasto.org/wp-content/uploads/2023/12/10_Carnavalito_2_2.png"
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
                                3 de Enero
                            </Typography>
                            
                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Canto a la Tierra
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Desfile de Colectivos Coreográﬁcos que traen a la memoria las travesías épicas del legado ancestral andino latinoamericano, en tributo a la madre tierra. Cada colectivo lo conforman mínimo ciento cuarenta integrantes y máximo doscientos veinte, entre danzantes, músicos y zanqueros.
                                <br></br>
                                <br></br>
                            </Typography>

                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Que Viva la Música Campesina 
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                En el tablado de la Plaza de Nariño afinamos oído para compartir la creatividad, el sentimiento y sonoridad de la música campesina.
                            </Typography>

                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Canto a la Vida 
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                En la Plaza del Carnaval vibrará la fuerza, la vitalidad y los saberes musicales de la tradición sonora andina y 
                            </Typography>

                            
                        </CardContent>
                    </Grid>
                    {/* Imagen al lado */}
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="https://carnavaldepasto.org/wp-content/uploads/2023/12/3-Enero.png"
                            alt="Pasto"
                        />
                    </Grid>
                </Grid>
            </Card>


            <Typography gutterBottom variant="h3" component="div">
                Galeria de Fotos 3 de Enero
            </Typography>
            

            <ImageGallery images={imagesArray} />

            <Card sx={{ marginTop: 4, marginBottom: 10 }}>
                <Grid container spacing={2}>
                    {/* Contenido al lado de la imagen */}
                    <Grid item xs={12} sm={8}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                4 de Enero
                            </Typography>
                            
                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                La Llegada de la Familia Castañeda
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Es un desﬁle tradicional que se realiza por la senda del carnaval y recrea pasajes, hechos y personajes de la identidad, de la memoria e historia rural y urbana de la región. La familia Castañeda le da la bienvenida a la oficial a los turistas que arriban a Pasto para disfrutar del mejor carnaval.
                                <br></br>
                                <br></br>
                            </Typography>

                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Rumba Carnavalera
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Presentación de agrupaciones de música bailable. Orquestas y grupos tropicales en se presentan en la Plaza del Carnaval y Plaza de Nariño, desde el 4 y hasta el 6 de enero, entre las cuatro de la tarde y las once de la noche.
                            </Typography>

                        </CardContent>
                    </Grid>
                    {/* Imagen al lado */}
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="https://carnavaldepasto.org/wp-content/uploads/2023/12/9_Castaneda_4_2.png"
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
                                5 de Enero
                            </Typography>
                            
                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Día de Negros “Una pintica por favor”
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                            Juego de identidad, práctica lúdica que dio origen al juego de carnaval como un símbolo de igualdad. Las calles se llenan de la alegría que provoca el compartir el ritual de pintarse el rostro con cosmético negro y celebrar la libertad.
                                <br></br>
                                <br></br>
                            </Typography>

                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Rumba Carnavalera
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                            Orquestas y agrupaciones de música baile se presentan en la Plaza de Nariño y Plaza del Carnaval, desde las 4 de la tarde hasta las 11 de la noche.
                            </Typography>

                        </CardContent>
                    </Grid>
                    {/* Imagen al lado */}
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="https://carnavaldepasto.org/wp-content/uploads/2023/12/Negros.png"
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
                                6 de Enero
                            </Typography>
                            
                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Desfile Magno
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Es el culmen de la ﬁesta, es un día apoteósico con la creatividad a ﬂor de piel. Con profundo compromiso con el patrimonio cultural inmaterial, desﬁlan por la Senda del Carnaval: disfraces individuales, comparsas, carrozas de menores dimensiones y carrozas gigantes, la música festiva de las murgas, emergen ﬁguras ancestrales, lo sagrado y lo profano, mitos y leyendas propias o universales, gigantescas obras de arte.
                                <br></br>
                                <br></br>
                            </Typography>

                            <Typography variant="h6" id="que-ver-en-san-juan-de-pasto-y-narino" gutterBottom>
                                Rumba Carnavalera
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                            Orquestas y agrupaciones de música baile se presentan en la Plaza de Nariño y Plaza del Carnaval, desde las 4 de la tarde hasta las 11 de la noche.
                            </Typography>

                        </CardContent>
                    </Grid>
                    {/* Imagen al lado */}
                    <Grid item xs={12} sm={4}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="https://carnavaldepasto.org/wp-content/uploads/2023/12/6-Enero-1.png"
                            alt="Pasto"
                        />
                    </Grid>
                </Grid>
            </Card>
                

            <Typography gutterBottom variant="h3" component="div">
                Galeria de Fotos 6 de Enero
            </Typography>
            

            <ImageGallery images={imagesArray6Enero} />

        
      </Container>
      <ContactForm />
      <Footer />
    </>
  );
};

export default BannerCarnaval;
