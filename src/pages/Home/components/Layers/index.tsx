import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FaLayerGroup } from "react-icons/fa";
import DraggableList from "../../../../common/components/DraggableList";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/useStore";
import { DraggableItemType } from "../../../../app/types/draggable";
import { DropResult } from "react-beautiful-dnd";
import { reorder } from "../../../../app/helpers/array";
import { useEffect, useState } from "react";
import { setLayers, setSelectedLayer } from "../../../../app/slices/layerSlice";
import LayerContent from "./LayerContent";

const Layers = () => {
  const { layers, selectedLayer } = useAppSelector((s) => s.layer);
  const [draggableLayers, setDraggableLayers] = useState<DraggableItemType[]>(
    []
  );
  const dispatch = useAppDispatch();

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

  const onClickLayer = (event: any, id: string) => {
    if (event.target.classList.contains("collapse-trigger")) {
      if (selectedLayer && selectedLayer.elementId == id) {
        dispatch(setSelectedLayer(undefined));
      } else {
        dispatch(setSelectedLayer(layers.find((f) => f.elementId == id)));
      }
    }
  };

  //if ever there are changes in the canvas. Layer list should be updated.
  useEffect(() => {
    const draggablesList = layers.map((m, index) => {
      const draggableLayer: DraggableItemType = {
        id: m.elementId,
        content: (
          <Box key={index}>
            <LayerContent layer={m} selectedLayer={selectedLayer} />
          </Box>
        ),
        isSelected: selectedLayer?.elementId == m.elementId,
      };
      return draggableLayer;
    });
    setDraggableLayers(draggablesList);
  }, [layers, selectedLayer]);

  return (
    <Box
      height="100%"
      bgcolor="background.paper"
      position="sticky"
      sx={{ overflowY: "auto" }}
    >
      <List
        sx={{ width: "300px", py: 0 }}
        component="nav"
        aria-labelledby="layers"
      >
        <ListItem>
          <ListItemIcon sx={{ minWidth: 28 }}>
            <FaLayerGroup />
          </ListItemIcon>
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
