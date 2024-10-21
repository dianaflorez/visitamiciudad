import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Switch, FormControlLabel, Grid } from '@mui/material';
import axios from 'axios';

const SitioGalleryAddImage = ({ cardDetailId }) => {
  const [formData, setFormData] = useState({
    order_no: '',
    image_url: '',
    active: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageList, setImageList] = useState([]);

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
    updatedFormData.append('order_no', formData.order_no);
    updatedFormData.append('active', formData.active);
    updatedFormData.append('card_detail_id', cardDetailId);

    if (imageFile) {
      updatedFormData.append('image_url', imageFile);
    }

    // Enviar datos al servidor
    axios.post('/api/card_detail_image', updatedFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      alert('Imagen agregada con éxito');
      setImageList([...imageList, response.data]); // Añadir la imagen al listado
      setFormData({ order_no: '', active: true }); // Resetear los campos del formulario
      setImageFile(null); // Limpiar el archivo de imagen
    })
    .catch((error) => {
      console.error('Error al agregar la imagen:', error);
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Agregar Imágenes a la Tarjeta
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Orden"
          name="order_no"
          value={formData.order_no}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
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

        {imageFile && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Imagen seleccionada: {imageFile.name}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Agregar Imagen
        </Button>
      </form>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Imágenes Agregadas</Typography>
        <Grid container spacing={2}>
          {imageList.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                component="img"
                sx={{ width: '100%', borderRadius: 2 }}
                src={image.image_url}
                alt={`Imagen ${index + 1}`}
              />
              <Typography variant="body2" align="center">
                Orden: {image.order_no}
              </Typography>
              <Typography variant="body2" align="center">
                Activo: {image.active ? 'Sí' : 'No'}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SitioGalleryAddImage;
