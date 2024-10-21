import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";

const SitioEdit = ({ cardData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    home: false,
    type: "",
    active: true,
    // Agrega otros campos según sea necesario
  });

  // Cargar los datos de la tarjeta en el formulario
  useEffect(() => {
    if (cardData) {
      setFormData({
        title: cardData.title || "",
        description: cardData.description || "",
        image_url: cardData.image_url || "",
        home: cardData.home || false,
        type: cardData.type || "",
        active: cardData.active || true,
        // Otros campos
      });
    }
  }, [cardData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Enviar los datos editados al componente padre
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mx: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Title"
            name="title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Image URL"
            name="image_url"
            fullWidth
            value={formData.image_url}
            onChange={handleChange}
            type="file" // Si se suben imágenes directamente
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.home}
                name="home"
                onChange={handleChange}
                color="primary"
              />
            }
            label="Featured in Home"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Type"
            name="type"
            fullWidth
            value={formData.type}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.active}
                name="active"
                onChange={handleChange}
                color="primary"
              />
            }
            label="Active"
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Editar Cambios
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SitioEdit;
