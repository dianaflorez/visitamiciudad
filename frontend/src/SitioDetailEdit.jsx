import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, FormControlLabel, Switch } from '@mui/material';
import axios from 'axios';

const SitioDetailEdit = ({ cardId }) => {
  const [formData, setFormData] = useState({
    card_id: '',
    title: '',
    image_url: '',
    subtitle: '',
    location: '',
    longitude: '',
    latitude: '',
    phone: '',
    schedule: '',
    prices: '',
    description: '',
    active: true,
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Cargar datos de la tarjeta usando cardId cuando el componente se monta
    axios.get(`/api/card_detail/${cardId}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los datos de la tarjeta:', error);
      });
  }, [cardId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSwitchChange = (e) => {
    setFormData({
      ...formData,
      active: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // FormData para enviar la imagen y otros campos al servidor
    const updatedFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      updatedFormData.append(key, formData[key]);
    });

    if (imageFile) {
      updatedFormData.append('image_url', imageFile);
    }

    axios.put(`/api/card_detail/${cardId}`, updatedFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      alert('Tarjeta actualizada con éxito');
    })
    .catch((error) => {
      console.error('Error al actualizar la tarjeta:', error);
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Editar Tarjeta
      </Typography>
      <form onSubmit={handleSubmit}>

        <TextField
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Subtítulo"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Ubicación"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Longitud"
          name="longitude"
          value={formData.longitude}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Latitud"
          name="latitude"
          value={formData.latitude}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Horario"
          name="schedule"
          value={formData.schedule}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Precios"
          name="prices"
          value={formData.prices}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.active}
              onChange={handleSwitchChange}
              name="active"
              color="primary"
            />
          }
          label="Activo"
        />

        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Subir Imagen
          <input type="file" hidden onChange={handleImageChange} />
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Guardar Cambios
        </Button>
      </form>
    </Box>
  );
};

export default SitioDetailEdit;
