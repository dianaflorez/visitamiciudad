import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

// Define una interfaz para las props
interface CardItemProps {
  imageSrc: string;
  title: string;
  text: string;
  link: string;
}

const CardItem: React.FC<CardItemProps> = ({ imageSrc, title, text, link }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Link to={link} style={{ textDecoration: 'none' }}>
        <Card style={{ width: '18rem' }}>
          <CardMedia
            component="img"
            height="140"
            image={imageSrc}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {text}
            </Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Leer Más
            </Button>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default CardItem;
