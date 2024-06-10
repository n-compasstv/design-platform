import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import { IoLayersSharp } from "react-icons/io5";
import DraggableList from "../../common/components/DraggableList";
import { useAppDispatch, useAppSelector } from "../../app/hooks/useStore";
import { DraggableItemType } from "../../app/types/draggable";
import { DropResult } from "react-beautiful-dnd";
import { reorder } from "../../app/helpers/array";
import { useEffect, useState } from "react";
import { setLayers } from "../../app/slices/layerSlice";
import { KonvaElementType } from "../../app/types/KonvaTypes";

const Layers = () => {
  const { layers, selectedLayer } = useAppSelector((s) => s.layer);
  const [draggableLayers, setDraggableLayers] = useState<DraggableItemType[]>(
    []
  );
  const dispatch = useAppDispatch();

  const getLayerContent = (layer: KonvaElementType) => {
    var content = <></>;
    if (layer.type == "media") {
      content = <>{`media-${layer.src}`}</>;
    } else if (layer.type == "text") {
      content = <>{`text-${layer.text}-${layer.elementId}`}</>;
    } else {
      content = <>{`shape-${layer.elementId}`}</>;
    }
    return content;
  };

  useEffect(() => {
    const draggablesList = layers.map((m, index) => {
      const draggableLayer: DraggableItemType = {
        id: m.elementId,
        content: (
          <Typography noWrap width="250px">
            <small>{index}</small> {getLayerContent(m)}
          </Typography>
        ),
      };
      return draggableLayer;
    });
    setDraggableLayers(draggablesList);
  }, [layers.length]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const orderedDraggableLayers = reorder(
      draggableLayers,
      source.index,
      destination.index
    );
    const orderedLayers = reorder(layers, source.index, destination.index);
    setDraggableLayers(orderedDraggableLayers);
    dispatch(setLayers(orderedLayers));
  };

  return (
    <Box height="100%" bgcolor="background.paper" position="sticky">
      <List
        sx={{ width: "250px" }}
        component="nav"
        aria-labelledby="layers"
        subheader={
          <ListSubheader component="div">
            <IoLayersSharp /> Layers
          </ListSubheader>
        }
      ></List>
      <DraggableList items={draggableLayers} onDragEnd={onDragEnd} />
    </Box>
  );
};

export default Layers;
