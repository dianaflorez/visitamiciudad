import { Container, TextField, Button, Box, Typography, Link } from "@mui/material";
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
  // Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onLogin(values.username, values.password);
    },
  });

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
          <Typography variant="body2" align="center">
            ¿No tienes una cuenta?{" "}
            <Link href="/signin" variant="body2">
              Regístrate
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
