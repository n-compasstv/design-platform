import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    secondary: {
      main: green[500],
    },
    warning: {
      main: "#cc8521",
    }
  },
  typography: {
    fontSize: 13,
    fontFamily: `"Poppins", sans-serif`,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          textTransform: "capitalize",
        }),
      },
    }
  },
});

export default theme;
