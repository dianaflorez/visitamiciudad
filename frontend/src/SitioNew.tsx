import { useState } from 'react';
import { TextField, Button, Grid, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { Typography } from "@mui/material";

const SitioNew = () => {
  const [formData, setFormData] = useState({
    menu_id: '',
    created_id: '', // Es la persona que esta logueada creando este card ... debe ser automatica
    city_id: 1,
    order_no: 0,
    title: '',
    image_url: null,
    description: '',
    home: false,
    type: 'Vertical',
    card_group_id: 1,
    active: true,
  });

  // Maneja los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja la selección del archivo
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image_url: e.target.files[0], // Almacena el archivo seleccionado
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías hacer la lógica para enviar los datos al backend
    console.log('Formulario enviado:', formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mx: 5 }}>
        <Typography
          id="sitios"
          variant="h4"
          align="left"
          gutterBottom
          sx={{ marginTop: "20px" }}
        >
          <span style={{ color: "purple" }}>•</span> Nuevo Sitio de Interés{" "}
          <span style={{ color: "purple" }}>•</span>
        </Typography>

        <Grid container spacing={3}>
            {/* Campo para menu_id */}
            <Grid item xs={12} sm={6}>
                <TextField
                required
                label="Menu ID"
                name="menu_id"
                value={formData.menu_id}
                onChange={handleInputChange}
                fullWidth
                />
            </Grid>

            {/* Campo para order_no */}
            <Grid item xs={12} sm={6}>
                <TextField
                required
                label="Order No"
                name="order_no"
                type="number"
                value={formData.order_no}
                onChange={handleInputChange}
                fullWidth
                />
            </Grid>

            {/* Campo para title */}
            <Grid item xs={12}>
                <TextField
                required
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                />
            </Grid>

            {/* Campo para description */}
            <Grid item xs={12}>
                <TextField
                required
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                />
            </Grid>

            {/* Campo para image_url (input tipo archivo) */}
            <Grid item xs={12}>
                <Button variant="contained" component="label">
                Subir Imagen
                <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {formData.image_url && <p>{formData.image_url.name}</p>}
            </Grid>

            {/* Checkbox para home */}
            <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Checkbox
                    name="home"
                    checked={formData.home}
                    onChange={(e) =>
                        setFormData({ ...formData, home: e.target.checked })
                    }
                    />
                }
                label="Home"
                />
            </Grid>

            {/* Select para el tipo de tarjeta */}
            {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    fullWidth
                >
                    <MenuItem value="Vertical">Vertical</MenuItem>
                    <MenuItem value="Horizontal">Horizontal</MenuItem>
                </Select>
                </FormControl>
            </Grid> */}

            {/* Campo para card_group_id */}
            <Grid item xs={12} sm={6}>
                <TextField
                required
                label="Card Group ID"
                name="card_group_id"
                value={formData.card_group_id}
                onChange={handleInputChange}
                fullWidth
                />
            </Grid>

            {/* Checkbox para active */}
            <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Checkbox
                    name="active"
                    checked={formData.active}
                    onChange={(e) =>
                        setFormData({ ...formData, active: e.target.checked })
                    }
                    />
                }
                label="Active"
                />
            </Grid>

            {/* Botón para enviar el formulario */}
            <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                Guardar Card/Sitio
                </Button>
            </Grid>
        </Grid>
    </Box>
  );
};

export default SitioNew;
