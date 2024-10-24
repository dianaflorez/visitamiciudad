import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, CardActions, Link, Box } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "./api/axiosConfig";
import BannerList from './components/BannerList';

// Interfaz para los datos del cardDetail
interface CardDetailData {
  card_id: number;
  title: string;
  image_url: string;
  subtitle: string;
  location: string;
  longitude: string;
  latitude: string;
  phone: string;
  schedule: string;
  prices: string;
  description: string;
}

const bannerData = [
  { imageSrc: './images/banner1.jpg' },
  { imageSrc: './images/banner2.jpg' },
  { imageSrc: './images/banner3.jpg' },
  { imageSrc: './images/banner4.jpg' },
];

// Componente para la tarjeta con imagen
const CardWithImage: React.FC<{ image_url: string; title: string }> = ({ image_url, title }) => {
  return (
    <Link href="#" underline="none">
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          height="140"
          image={image_url}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
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
const QuoteCard: React.FC<{ cardDetail: CardDetailData }> = ({ cardDetail }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {cardDetail.title}
        </Typography>
        <blockquote>
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
          <strong>Descripcion:</strong>{cardDetail.description}
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

// Componente principal que muestra el detalle del sitio
const SitiosDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cardDetail, setCardDetail] = useState<CardDetailData | null>(null);

  useEffect(() => {
    // Verificar si hay un ID en la URL
    if (!id) {
      navigate("/"); // Redirigir al inicio si no hay ID
      return;
    }

    // Función para obtener los datos del card_detail
    const fetchCardDetail = async () => {
      try {
        const response = await apiClient.get(`/card_detail/${id}`);
        if (response.data.success && response.data.data) {
          setCardDetail(response.data.data);
        } else {
          navigate("/"); // Redirigir al inicio si no se encuentra el detalle
        }
      } catch (error) {
        console.error("Error al obtener el detalle del card:", error);
        navigate("/"); // Redirigir al inicio si hay un error
      }
    };

    fetchCardDetail();
  }, [id, navigate]);

  // Renderizar si no se encuentra el detalle
  if (!cardDetail) {
    return <Typography variant="h5">Cargando...</Typography>;
  }

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
          <CardWithImage image_url={`https://lomerezcotodo.com/wiwoweb/web/archivos/${cardDetail.image_url}`} title={cardDetail.title} />
        </Grid>

        {/* Columna con la tarjeta de cita */}
        <Grid item xs={12} sm={9}>
          <QuoteCard cardDetail={cardDetail} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SitiosDetail;
