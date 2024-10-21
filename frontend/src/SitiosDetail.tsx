
import { Card, CardContent, CardMedia, Typography, Grid, CardActions, Link, Box } from '@mui/material';
import BannerList from './components/BannerList';

const cardDetail = 
    {
      card_id: 1,
      title: 'Card Title 1',
      image_url: 'https://via.placeholder.com/300',
      subtitle: 'This is a subtitle 1',
      location: 'Location 1',
      longitude: '12.345',
      latitude: '67.890',
      phone: '123-456-7890',
      schedule: '9:00 AM - 6:00 PM',
      prices: '10 USD',
      description: 'This is a brief description of the first card.'
    };

const bannerData = [
    { imageSrc: './images/banner1.jpg' },
    { imageSrc: './images/banner2.jpg' },
    { imageSrc: './images/banner3.jpg' },
    { imageSrc: './images/banner4.jpg' },
    ];

// Componente para la tarjeta con imagen
const CardWithImage = () => {
  return (
    <Link href="sitios-descripcion.html" underline="none">
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Card image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Card Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="caption" color="text.secondary" sx={{ paddingLeft: 2 }}>
            2 days ago
          </Typography>
        </CardActions>
      </Card>
    </Link>
  );
};

// Componente para la tarjeta con la cita
const QuoteCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
            {cardDetail.title}
        </Typography>
        <blockquote>
            <Typography gutterBottom variant="h5" component="div">
                
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {cardDetail.subtitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Ubicación:</strong> {cardDetail.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Coordenadas:</strong> {cardDetail.longitude}, {cardDetail.latitude}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Teléfono:</strong> {cardDetail.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Horario:</strong> {cardDetail.schedule}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Precios:</strong> {cardDetail.prices}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {cardDetail.description}
            </Typography>
          <footer>
            <Typography variant="body2" color="text.secondary">
              Someone famous in <cite>Source Title</cite>
            </Typography>
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
};

// Componente principal que muestra ambas tarjetas
const SitiosDetail = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>

        <BannerList banners={bannerData} />
            
        <Typography
            id="sitios"
            variant="h4"
            align="left"
            gutterBottom
            sx={{ marginTop: "20px" }}
        >
            <span style={{ color: "purple" }}>•</span> Detalle del sitio de Interés{" "}
            <span style={{ color: "purple" }}>•</span>
        </Typography>
        
        <Grid container spacing={3}>
        {/* Columna con la tarjeta de imagen */}
        <Grid item xs={12} sm={3}>
            <CardWithImage />
        </Grid>
        
        {/* Columna con la tarjeta de cita */}
        <Grid item xs={12} sm={9}>
            <QuoteCard />
        </Grid>
        </Grid>
    </Box>
  );
};

export default SitiosDetail;
