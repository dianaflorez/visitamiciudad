import { Container, TextField, Button, Box, Typography, Link } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

interface SigninFormProps {
  onSignin: (username: string, password: string, name: string) => void;
  error: string | null;
}

// Esquema de validación con Yup
const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  username: Yup.string()
    .email("Debe ser un correo electrónico válido")
    .required("El correo es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Las contraseñas deben coincidir")
    .required("Confirmar la contraseña es requerido"),
});

const SigninForm: React.FC<SigninFormProps> = ({ onSignin, error }) => {
  // Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      try {
        // Llamar a la función onSignin con los valores del formulario
        onSignin(values.username, values.password, values.name);
      } catch (err) {
        if (err instanceof Error) {
          // Si es un error, muestra el mensaje en el campo 'username'
          setFieldError("username", err.message);
        } else {
          // Si no es un error, muestra un mensaje genérico
          setFieldError("username", "Error en el registro");
        }
      } finally {
        setSubmitting(false); // Finalizar el estado de envío
      }
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
          Registro
        </Typography>

        {error && (
          <Box sx={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </Box>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            name="name"
            label="Nombre"
            autoComplete="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            id="username"
            name="username"
            label="Correo electrónico"
            autoComplete="email"
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
            autoComplete="new-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Registrarse
          </Button>
          <Typography variant="body2" align="center">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" variant="body2">
              Iniciar sesión
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SigninForm;
