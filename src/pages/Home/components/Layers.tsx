import {
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
    <Drawer open={true} anchor="right" variant="permanent">
      <Toolbar />
      <List
        sx={{ width: "250px", maxWidth: 250, bgcolor: "background.paper" }}
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
    </Drawer>
  );
};

export default Layers;
