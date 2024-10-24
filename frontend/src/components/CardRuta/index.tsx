import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField, Box } from '@mui/material';

interface CardRutaProps {
  imageSrc: string;
  altText: string;
  title: string;
  group: string;
}

const CardRuta: React.FC<CardRutaProps> = ({ imageSrc, altText, title, group }) => {
  const [days, setDays] = useState<number>(1);
  const [suggestions, setSuggestions] = useState<string[]>([]); // Estado para las sugerencias
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para manejar errores

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Enviar la solicitud al API
    fetch('http://localhost:3001/api/tour', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group, days }),
    })
      .then(response => response.json())
      .then(data => {
        setSuggestions(data.suggestions || []); // Asume que data tiene una propiedad suggestions
        setErrorMessage(null); // Reinicia el error si la respuesta es correcta
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Hubo un problema al obtener las sugerencias.'); // Establece un mensaje de error
      });
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
      <CardMedia component="img" height="257" image={imageSrc} alt={altText} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="body2" color="text.secondary">
            Número de días
          </Typography>
          <TextField
            type="number"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            inputProps={{ min: 1, max: 30 }}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Consultar Rutas
          </Button>
        </Box>

        {/* Mostrar el resultado de las sugerencias */}
        {suggestions.length > 0 && (
          <Box mt={2}>
            <Typography variant="body1" color="text.primary">
              Sugerencias de rutas:
            </Typography>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </Box>
        )}

        {/* Mostrar un mensaje de error si ocurre algún problema */}
        {errorMessage && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CardRuta;
