import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Container,
} from "@mui/material";
import { Typography } from "@mui/material";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import apiClient from "./api/axiosConfig";

const SitioNew = () => {
  const validationSchema = Yup.object({
    menuId: Yup.number().required("Menu ID is required"),
    orderNo: Yup.number().required("Order No is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    cardGroupId: Yup.number().required("Card Group ID is required"),
    home: Yup.boolean(),
    active: Yup.boolean(),
  });

  const initialValues = {
    menuId: "",
    orderNo: 0,
    title: "",
    description: "",
    home: false,
    cardGroupId: 1,
    active: true,
  };

  const onSubmit = async (values) => {
    console.log(values);
    const user_id = localStorage.getItem('id')

    const formData = {
      menu_id: values.menuId,
      city_id: 1,
      order_no: values.orderNo,
      title: values.title,
      image_url: "no-one",
      description: values.description,
      home: values.home,
      type: values.menuId,
      card_group_id: values.cardGroupId,
      active: values.active,
      created_id: user_id
    };

    const response = await apiClient.post(
      `${import.meta.env.VITE_API_URL}/card`,
      formData
    );

    console.log(response.data);

    /*
    axios
      .post("https://api.example.com/nuevo-sitio", formData)
      .then((response) => {
        console.log("Formulario enviado exitosamente:", response.data);
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
      */
  };

  const [formData, setFormData] = useState({
    menu_id: "",
    created_id: "", // Es la persona que esta logueada creando este card ... debe ser automatica
    city_id: 1,
    order_no: 0,
    title: "",
    image_url: null,
    description: "",
    home: false,
    type: "Vertical",
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
  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías hacer la lógica para enviar los datos al backend
    console.log("Formulario enviado:", formData);
  };
  */

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, errors, touched, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <Box sx={{ mt: 3, mx: 5 }}>
              <Typography
                id="sitios"
                variant="h4"
                align="left"
                gutterBottom
                sx={{ marginTop: "20px" }}
              >
                <span style={{ color: "purple" }}>•</span> Nuevo Sitio de
                Interés <span style={{ color: "purple" }}>•</span>
              </Typography>

              <Grid container spacing={3}>
                {/* Campo para menu_id */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="menuId"
                    name="menuId"
                    label="Menu ID *"
                    type="number"
                    value={values.menuId}
                    onChange={handleChange}
                    error={touched.menuId && Boolean(errors.menuId)}
                    helperText={touched.menuId && errors.menuId}
                  />
                </Grid>

                {/* Campo para order_no */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Order No"
                    name="orderNo"
                    fullWidth
                    type="number"
                    value={values.orderNo}
                    onChange={handleChange}
                    error={touched.orderNo && Boolean(errors.orderNo)}
                    helperText={touched.orderNo && errors.orderNo}
                  />
                </Grid>

                {/* Campo para title */}
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Title"
                    name="title"
                    fullWidth
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>

                {/* Campo para description */}
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Description"
                    name="description"
                    rows={4}
                    fullWidth
                    value={values.description}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
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
                        checked={values.home}
                        onChange={handleChange}
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
                    name="cardGroupId"
                    fullWidth
                    type="number"
                    value={values.cardGroupId}
                    onChange={handleChange}
                    error={touched.cardGroupId && Boolean(errors.cardGroupId)}
                    helperText={touched.cardGroupId && errors.cardGroupId}
                  />
                </Grid>

                {/* Checkbox para active */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="active"
                        checked={values.active}
                        onChange={handleChange}
                      />
                    }
                    label="Active"
                  />
                </Grid>

                {/* Botón para enviar el formulario */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Guardar Card/Sitio
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SitioNew;
