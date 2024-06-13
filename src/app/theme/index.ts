import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    secondary: {
      main: green[500],
    },
    warning: {
      main: "#cc8521",
    },
  },
  typography: {
    fontSize: 13,
    fontFamily: `"Poppins", sans-serif`,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            fontSize: "12px",
          },
          "& .MuiColorInput-Button": {
              width: "18px",
              height: "18px"
            }
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "12px"
        },
      },
    },
  },
});

export default theme;
