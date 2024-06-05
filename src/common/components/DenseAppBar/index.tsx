import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { FaChartLine } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant="dense" sx={{ bgcolor: "#1c2731" }}>
          <Typography variant="h6" color="inherit">
            News template Sample
          </Typography>

          <Box
            sx={{ justifyContent: "end", flexGrow: 1, display: { md: "flex" } }}
          >
            <Button
              variant="contained"
              sx={{ my: 2, mr: 1 }}
              endIcon={<FaChartLine size={14} />}
            >
              Dashboard
            </Button>
            <Button
              variant="contained"
              sx={{ my: 2, mr: 1 }}
              endIcon={<FaHome size={14} />}
            >
              Home
            </Button>
            <Button
              variant="contained"
              sx={{ my: 2, mr: 1 }}
              endIcon={<FaSave size={14} />}
            >
              Save
            </Button>
            <Button
              variant="contained"
              sx={{ my: 2, mr: 1 }}
              endIcon={<FaPlus size={14} />}
            >
              Save As
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
