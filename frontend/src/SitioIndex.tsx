import { useState } from 'react';
import CardTable from './components/CardTable';
import { Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';

const SitioIndex = () => {
  // Ejemplo de array de cards
  const [cards, setCards] = useState([
    {
      id: 1,
      menu_id: 2,
      menu_name: 'Main Menu',
      created_id: 3,
      order_no: 1,
      title: 'Sample Card 1',
      image_url: 'https://via.placeholder.com/150',
      description: 'This is a sample description for card 1.',
      home: true,
      type: 'Vertical',
      active: true,
    },
    {
      id: 2,
      menu_id: 3,
      menu_name: 'Sub Menu',
      created_id: 4,
      order_no: 2,
      title: 'Sample Card 2',
      image_url: 'https://via.placeholder.com/150',
      description: 'This is a sample description for card 2.',
      home: false,
      type: 'Horizontal',
      active: false,
    },
  ]);

  // Función para manejar la edición
  const handleEdit = (id) => {
    console.log('Editing card with id:', id);
    // Aquí puedes navegar a una página de edición o abrir un modal
  };

  // Función para manejar la eliminación
  const handleDelete = (id) => {
    console.log('Deleting card with id:', id);
    // Aquí puedes realizar la lógica de eliminación, como hacer una llamada a la API
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div style={{ margin: '30px' }}>
        <Typography
          id="sitios"
          variant="h4"
          align="left"
          gutterBottom
          sx={{ marginTop: "20px" }}
        >
          <span style={{ color: "purple" }}>•</span> Lista de Cards/Sitios{" "}
          <span style={{ color: "purple" }}>•</span>
        </Typography>
        
        <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/sitio-new" // Aquí rediriges a la página de nuevo sitio
            style={{ marginBottom: '20px' }} // Margen inferior para separación
        >
            Nuevo Card/Sitio
        </Button>
        
        <CardTable cards={cards} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default SitioIndex;
