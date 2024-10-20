import { createTheme } from "@mui/material/styles";

// modules
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    variant1: true;
    variant2: true;
  }
}

// colors
const primary = {
  main: "#1976d2",
  light: "#42a5f5",
  dark: "#1565c0",
  contrastText: "#fff",
};

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

export const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
  },
  palette: {
    primary,
  },
  breakpoints: {
    values: {
      xl,
      lg,
      md,
      sm,
      xs,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "variant1" },
          style: {
            textTransform: "none",
            border: `2px dashed ${primary.main}`,
            color: primary.main,
          },
        },
        {
          props: { variant: "variant2" }, // Nueva variante
          style: {
            textTransform: "none",
            backgroundColor: `${primary.main}`, // Color de fondo típico de "contained"
            color: "#fff", // Color del texto típico de "contained"
            padding: "6px 16px", // Mantener el padding estándar de "contained"
            boxShadow: "none", // Evitar sombras
            width: "auto", // Hacer que el ancho sea automático (no abarque todo el contenedor)
            display: "inline-block", // Permitir que el botón se ajuste al contenido
          },
        },
      ],
    },
  },
});
