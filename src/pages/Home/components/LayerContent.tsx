import {
  Box,
  Typography,
  Collapse,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { KonvaElementType } from "../../../app/types/KonvaTypes";
import { ChangeEvent, FC, useState } from "react";
import { MuiColorInput } from "mui-color-input";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/useStore";
import { setLayers } from "../../../app/slices/layerSlice";
import { fontFamilyList, textAlignList } from "../../../common/constants/text";

type LayerContentProps = {
  layer: KonvaElementType;
  selectedLayer: KonvaElementType | undefined;
};

const LayerContent: FC<LayerContentProps> = ({ layer, selectedLayer }) => {
  const { layers } = useAppSelector((s) => s.layer);
  const dispatch = useAppDispatch();
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

  const handleFillChange = (color: string) => {
    const index = layers.findIndex((f) => f.elementId == layer.elementId);

    if (index > -1) {
      let newLayers = [...layers];
      newLayers[index] = { ...layer, fill: color };

      dispatch(setLayers(newLayers));
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = layers.findIndex((f) => f.elementId == layer.elementId);
    const text = event.target.value;
    if (index > -1) {
      let newLayers = [...layers];
      newLayers[index] = { ...layer, text: text };

      dispatch(setLayers(newLayers));
    }
  };

  const handleTextAlignChange = (event: SelectChangeEvent<string>) => {
    const index = layers.findIndex((f) => f.elementId == layer.elementId);
    const align = event.target.value;
    if (index > -1) {
      let newLayers = [...layers];
      newLayers[index] = { ...layer, align: align };

      dispatch(setLayers(newLayers));
    }
  };

  const handleFontFamilyChange = (event: SelectChangeEvent<string>) => {
    const index = layers.findIndex((f) => f.elementId == layer.elementId);
    const font = event.target.value;
    if (index > -1) {
      let newLayers = [...layers];
      newLayers[index] = { ...layer, fontFamily: font };

      dispatch(setLayers(newLayers));
    }
  };

  const handleTextColorChange = (color: string) => {
    const index = layers.findIndex((f) => f.elementId == layer.elementId);

    if (index > -1) {
      let newLayers = [...layers];
      newLayers[index] = { ...layer, fill: color };

      dispatch(setLayers(newLayers));
    }
  };

  const handleNumericValueChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof KonvaElementType,
    minValue: number
  ) => {
    const index = layers.findIndex((f) => f.elementId == layer.elementId);
    const value = +event.target.value ?? 0;
    if (index > -1 && value >= minValue) {
      let newLayers = [...layers];
      const prop: keyof KonvaElementType = field;
      
      let tempLayer: any = {...newLayers[index]};
      tempLayer[prop] = +value;
      
      newLayers[index] = tempLayer;
      dispatch(setLayers(newLayers));
    }
  };

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
            {layer.type == "text" && (
              <Stack direction="column" spacing={2}>
                <TextField
                  label="Text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  size="small"
                  value={layer.text}
                  multiline
                  minRows={4}
                  onChange={handleTextChange}
                />
                <FormControl size="small" variant="filled">
                  <InputLabel id="font-family-select-label">
                    font family
                  </InputLabel>
                  <Select
                    labelId="font-family-select-label"
                    id="font-family-select"
                    value={layer.fontFamily}
                    onChange={handleFontFamilyChange}
                  >
                    {fontFamilyList.map((m) => (
                      <MenuItem value={m} sx={{ fontFamily: m }}>
                        {m}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" variant="filled">
                  <InputLabel id="font-align-select-label">align</InputLabel>
                  <Select
                    labelId="font-align-select-label"
                    id="font-align-select"
                    value={layer.align}
                    onChange={handleTextAlignChange}
                  >
                    {textAlignList.map((m) => (
                      <MenuItem value={m}>{m}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <MuiColorInput
                  format="rgb"
                  label="color"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  size="small"
                  value={layer.fill || ""}
                  onChange={handleTextColorChange}
                />
              </Stack>
            )}

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
                onChange={(event) => handleNumericValueChange(event, "x", 0)}
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
                onChange={(event) => handleNumericValueChange(event, "y", 0)}
              />
            </Stack>
            {["text"].includes(layer.type || "") && (
              <Stack spacing={1}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="font size"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    size="small"
                    value={layer.fontSize}
                    onChange={(event) =>
                      handleNumericValueChange(event, "fontSize", 0)
                    }
                  />
                  <TextField
                    label="font weight"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    size="small"
                    value={layer.fontStyle}
                    onChange={(event) =>
                      handleNumericValueChange(event, "fontStyle", 0)
                    }
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="line height"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    size="small"
                    value={layer.lineHeight}
                    onChange={(event) =>
                      handleNumericValueChange(event, "lineHeight", 0)
                    }
                  />
                  <TextField
                    label="letter spacing"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    size="small"
                    value={layer.letterSpacing}
                    onChange={(event) =>
                      handleNumericValueChange(event, "letterSpacing", 0)
                    }
                  />
                </Stack>
              </Stack>
            )}

            {["media", "rectangle", "triangle"].includes(layer.type || "") && (
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
                  onChange={(event) =>
                    handleNumericValueChange(event, "width", 0)
                  }
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
                  onChange={(event) =>
                    handleNumericValueChange(event, "height", 0)
                  }
                />
              </Stack>
            )}

            {["media", "circle", "rectangle", "triangle"].includes(
              layer.type || ""
            ) && (
              <Stack direction="row" spacing={2}>
                <MuiColorInput
                  sx={{ maxWidth: 101 }}
                  format="rgb"
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
                  onChange={(event) =>
                    handleNumericValueChange(event, "strokeWidth", 0)
                  }
                />
              </Stack>
            )}
            {["circle", "rectangle", "triangle"].includes(layer.type || "") && (
              <Stack direction="row" spacing={2}>
                <MuiColorInput
                  sx={{ maxWidth: 101 }}
                  format="rgb"
                  label="Fill"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  size="small"
                  value={layer.fill || ""}
                  onChange={handleFillChange}
                />
                <TextField
                  label="Radius"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  size="small"
                  value={layer.radius}
                  onChange={(event) =>
                    handleNumericValueChange(event, "radius", 0)
                  }
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


