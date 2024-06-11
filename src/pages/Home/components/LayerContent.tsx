import { Box, Typography, Collapse, Stack, TextField } from "@mui/material";
import { orange } from "@mui/material/colors";
import { KonvaElementType } from "../../../app/types/KonvaTypes";
import { ChangeEvent, FC, useState } from "react";
import { MuiColorInput } from "mui-color-input";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/useStore";
import { setLayers } from "../../../app/slices/layerSlice";

type LayerContentProps = {
  layer: KonvaElementType;
  selectedLayer: KonvaElementType | undefined;
};

const LayerContent: FC<LayerContentProps> = ({ layer, selectedLayer }) => {
  const { layers } = useAppSelector((s) => s.layer);
  const dispatch = useAppDispatch();
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

  const handleStrokeChange = (color: string) => {
    const index = layers.findIndex((f) => f.elementId == layer.elementId);

    if (index > -1) {
      let newLayers = [...layers];
      newLayers[index] = { ...layer, stroke: color };

      dispatch(setLayers(newLayers));
    }
  };

  const handleStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = layers.findIndex((f) => f.elementId == layer.elementId);
    const width = +event.target.value ?? 0
    if (index > -1 && width > -1) {
      let newLayers = [...layers];
      newLayers[index] = { ...layer, strokeWidth: +width };

      dispatch(setLayers(newLayers));
    }
  }

  return (
    <Box sx={{ cursor: "pointer", width: "250px" }}>
      <Box
        className="collapse-trigger"
        sx={{
          px: 2,
          py: 1,

          background: isLayerSelected ? orange[100] : "inherit",
        }}
      >
        <Typography noWrap sx={{ maxWidth: "150px" }}>
          <small className="collapse-trigger">{header}</small>
        </Typography>
      </Box>
      <Box
        sx={{
          px: 2,
          py: isLayerSelected ? 1 : 0,
        }}
      >
        <Collapse in={isLayerSelected} timeout="auto">
          <Stack component="form" spacing={1} sx={{ py: 1 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="X"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                size="small"
                value={layer.x}
              />
              <TextField
                label="Y"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                size="small"
                value={layer.y}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Width"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                size="small"
                value={layer.width}
              />
              <TextField
                label="Height"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                size="small"
                value={layer.height}
              />
            </Stack>
            {["media", "circle", "rectangle", "triangle"].includes(
              layer.type || ""
            ) && (
              <Stack direction="row" spacing={2}>
                <MuiColorInput
                  format="hex"
                  label="Stroke"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  size="small"
                  value={layer.stroke || ""}
                  onChange={handleStrokeChange}
                />
                <TextField
                  label="Stroke Width"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  size="small"
                  value={layer.strokeWidth}
                  onChange={handleStrokeWidthChange}
                />
              </Stack>
            )}
          </Stack>
        </Collapse>
      </Box>
    </Box>
  );
};

export default LayerContent;
