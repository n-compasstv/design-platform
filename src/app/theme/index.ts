import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    secondary: {
      main: green[500],
    },
  },
  typography: {
    fontSize: 13,
    fontFamily: `"Poppins", sans-serif`,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              backgroundColor: "#cc8521",
              textTransform: "capitalize",
            }),
          ...(ownerState.variant === "text" && {
              textTransform: "capitalize",
              color: "#000"
            }),
        }),
      },
    },
  },
});

export default theme;
