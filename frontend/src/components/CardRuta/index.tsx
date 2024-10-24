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
  const [suggestions, setSuggestions] = useState<string | null>(null); // Estado para las sugerencias
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para manejar errores

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // const rawSuggestions = '<h1 style="font-weight:bold">Día 1:</h1>\n<h3>Catedral de Imbabura</h3>\n<p>Visita la impresionante Catedral de Imbabura, ubicada en el centro histórico de la ciudad de Pasto. Disfruta de su arquitectura colonial y las vistas panorámicas desde la torre.</p>\n<img src="https://www.colombia.com/turismo/imagencms/files/crop/uploads/2018/10/23/5bcf86fa0ae3d.r_1563189700578.0-108-2880-1735.jpg" alt="Catedral de Imbabura">\n\n<h1 style="font-weight:bold">Día 2:</h1>\n<h3>Laguna de la Cocha</h3>\n<p>Dirígete hacia la Laguna de la Cocha, a tan solo 30 minutos de Pasto. Disfruta de un paseo en bote por el lago y visita la Isla Corota, un santuario de aves y el único humedal natural en Colombia.</p>\n<img src="https://www.colombia.com/turismo/imagencms/files/crop/uploads/2018/10/23/5bcf882b1e93f.r_1563189970439.0-69-2899-1680.jpg" alt="Laguna de la Cocha">\n\n<h1 style="font-weight:bold">Día 3:</h1>\n<h3>Volcán Galeras</h3>\n<p>Realiza una excursión al Volcán Galeras, uno de los volcanes más activos en Colombia. Disfruta de las impresionantes vistas desde su cráter y aprende sobre la geología de la región.</p>\n<img src="https://www.colombia.com/turismo/imagencms/files/crop/uploads/2018/10/23/5bcf8880357e1.r_1563190166833.0-37-2880-1716.jpg" alt="Volcán Galeras">\n\n<h1 style="font-weight:bold">Día 4:</h1>\n<h3>Santuario de Las Lajas</h3>\n<p>Visita el Santuario de Las Lajas, ubicado en la vecina ciudad de Ipiales. Maravíllate con su arquitectura gótica y su impresionante ubicación en un cañón. No te pierdas las vistas desde el puente.</p>\n<img src="https://www.colombia.com/turismo/imagencms/files/crop/uploads/2018/10/23/5bcf88d7b2b08.r_1563190335049.0-97-2880-1724.jpg" alt="Santuario de Las Lajas">\n\n<h1 style="font-weight:bold">Día 5:</h1>\n<h3>Parque Nacional Natural Puracé</h3>\n<p>Explora el Parque Nacional Natural Puracé, ubicado a unas 2 horas de Pasto. Disfruta de sus paisajes de páramo, termales naturales y la oportunidad de avistar la fauna local, como el cóndor andino.</p>\n<img src="https://www.colombia.com/turismo/imagencms/files/crop/uploads/2018/10/23/5bcf898269365.r_1563190521247.0-106-2880-1719.jpg" alt="Parque Nacional Natural Puracé">\n\n';
    // //const rawSuggestions = 'Día 1:!"';
    // console.log(rawSuggestions);
    // setSuggestions(rawSuggestions);




    //Enviar la solicitud al API
    fetch('http://localhost:3001/api/tour', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group, days }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        //let suggestions = JSON.parse(data.suggestions);
        let suggestions = data.suggestions;
        setSuggestions(suggestions); // Asume que data tiene una propiedad suggestions
        //setSuggestions(data.suggestions || []); // Asume que data tiene una propiedad suggestions
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
        {suggestions && (
          <Box mt={2}>
            <Typography variant="body1" color="text.primary">
              Sugerencias de rutas:
            </Typography>

            <Typography
              variant="body2"
              color="text.primary"
              dangerouslySetInnerHTML={{ __html: suggestions }} // Renderiza el HTML
            />
           
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
