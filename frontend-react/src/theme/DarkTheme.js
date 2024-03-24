import { createTheme } from "@mui/material";

const darkTheme = createTheme({
 palette: {
    mode: "light", // This sets the theme to light mode
    primary: {
      main: "#7132F9", // Customize the primary color to your preference
    },
    secondary: {
      main: "#5A20CB", // Customize the secondary color to your preference
    },
    black: {
      main: "#242B2E",
    },
    background: {
      main: "#FFFFFF", // Set background color to white
      default: "#FFFFFF", // Set default background color to white
      paper: "#FFFFFF", // Set paper background color to white
    },
    textColor: {
      main: "#111111", // Set text color to black
    },
  },
});


export default darkTheme;
