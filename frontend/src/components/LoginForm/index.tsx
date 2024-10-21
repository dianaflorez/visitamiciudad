// import { useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
// import { ContactForm, Footer } from "./components";
// import { useAuth } from "./context/AuthContext";
// import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

// Esquema de validación con Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .email("Debe ser un correo electrónico válido")
    .required("El correo es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  //const [username, setUsername] = useState<string>("");
  //const [password, setPassword] = useState<string>("");
  //const [error, setError] = useState<string | null>(null);

  // const { login } = useAuth();
  // const navigate = useNavigate();

  // Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onLogin(values.username, values.password);
      // login(username);
      // navigate("/sitio-index");
    },
  });

  /*
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // Validación básica
        if (!username || !password) {
          setError("Both fields are required.");
          return;
        }
    
        // Resetea errores si todo está bien
        setError(null);
    
        // Lógica para hacer login
        onLogin(username, password);
      };
      */

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Inicio de Sesión
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            name="username"
            label="Correo electrónico"
            autoComplete="email"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
