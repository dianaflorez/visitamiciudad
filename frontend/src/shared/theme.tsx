import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

// modules
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    variant1: true;
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
  palette: {
    primary,
    secondary: purple,
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
      ],
    },
  },
});
