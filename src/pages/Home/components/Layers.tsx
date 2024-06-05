import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
} from "@mui/material";
import { IoLayersSharp } from "react-icons/io5";

const Layers = () => {
  return (
    <Box height="100%" bgcolor="background.paper" position="sticky">
      <List
        sx={{ width: "250px", maxWidth: 250}}
        component="nav"
        aria-labelledby="layers"
        subheader={
          <ListSubheader component="div">
            <IoLayersSharp /> Layers
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemText primary="layer 1" />
          <ListItemIcon></ListItemIcon>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Layers;
