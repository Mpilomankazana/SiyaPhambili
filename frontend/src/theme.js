/**
 * SiyaPhambili MUI theme tokens.
 * Placeholder brand palette — swap in the real SiyaPhambili colours
 * (see docs/logo/) before the hackathon if you have brand guidelines.
 */
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0B6E4F", // civic green — placeholder
    },
    secondary: {
      main: "#F2A104", // amber accent — placeholder
    },
    background: {
      default: "#F5F7F6",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export default theme;
