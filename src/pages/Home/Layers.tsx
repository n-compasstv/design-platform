import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import { FaLayerGroup } from "react-icons/fa";
import DraggableList from "../../common/components/DraggableList";
import { useAppDispatch, useAppSelector } from "../../app/hooks/useStore";
import { DraggableItemType } from "../../app/types/draggable";
import { DropResult } from "react-beautiful-dnd";
import { reorder } from "../../app/helpers/array";
import { useEffect, useState } from "react";
import { setLayers, setSelectedLayer } from "../../app/slices/layerSlice";
import { KonvaElementType } from "../../app/types/KonvaTypes";
import { orange } from "@mui/material/colors";

const Layers = () => {
  const { layers, selectedLayer } = useAppSelector((s) => s.layer);
  const [draggableLayers, setDraggableLayers] = useState<DraggableItemType[]>(
    []
  );
  const dispatch = useAppDispatch();

  const getLayerContent = (layer: KonvaElementType) => {
    let content = "test";
    let header = "";
    const isLayerSelected = selectedLayer?.elementId == layer.elementId;

    if (layer.type == "media") {
      header = `media-${layer.src}`;
    } else if (layer.type == "text") {
      header = `text-${layer.text}-${layer.elementId}`;
    } else if (["circle", "rectangle", "triangle"].includes(layer.type || "")) {
      header = `${layer.type}-${layer.elementId}`;
    }
    return (
      <Box sx={{ cursor: "pointer", width: "250px" }}>
        <Box
          sx={{
            px: 2,
            py: 1,

            background: isLayerSelected ? orange[100] : "inherit",
          }}
        >
          <Typography noWrap sx={{ maxWidth: "150px" }}>
            <small>{header}</small>
          </Typography>
        </Box>
        <Box
          sx={{
            px: 2,
            py: isLayerSelected ? 1 : 0,
          }}
        >
          <Collapse in={isLayerSelected} timeout="auto">
            <Box>{content}</Box>
          </Collapse>
        </Box>
      </Box>
    );
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const orderedDraggableLayers = reorder(
      draggableLayers,
      source.index,
      destination.index
    );
    setDraggableLayers(orderedDraggableLayers);

    const orderedLayers = reorder(layers, source.index, destination.index);
    dispatch(setLayers(orderedLayers));
  };

  const onClickLayer = (id: string) => {
    if (selectedLayer && selectedLayer.elementId == id) {
      dispatch(setSelectedLayer(undefined));
    } else {
      dispatch(setSelectedLayer(layers.find((f) => f.elementId == id)));
    }
  };

  useEffect(() => {
    const draggablesList = layers.map((m, index) => {
      const draggableLayer: DraggableItemType = {
        id: m.elementId,
        content: <Box>{getLayerContent(m)}</Box>,
        isSelected: selectedLayer?.elementId == m.elementId,
      };
      return draggableLayer;
    });
    setDraggableLayers(draggablesList);
  }, [layers.length, selectedLayer]);

  return (
    <Box height="100%" bgcolor="background.paper" position="sticky">
      <List
        sx={{ width: "250px", py: 0 }}
        component="nav"
        aria-labelledby="layers"
      >
        <ListItem>
          <ListItemIcon sx={{minWidth: 28}}><FaLayerGroup /></ListItemIcon>
          <ListItemText primary="Layers" />
        </ListItem>
      </List>
      <DraggableList
        items={draggableLayers}
        onDragEnd={onDragEnd}
        onClickItem={onClickLayer}
      />
    </Box>
  );
};

export default Layers;
