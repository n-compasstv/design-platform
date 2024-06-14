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
  Checkbox,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import { grey, orange, red } from "@mui/material/colors";
import { KonvaElementType } from "../../../../app/types/KonvaTypes";
import { ChangeEvent, FC, useState } from "react";
import { MuiColorInput } from "mui-color-input";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/useStore";
import { setLayers } from "../../../../app/slices/layerSlice";
import {
  fontFamilyList,
  textAlignList,
} from "../../../../common/constants/text";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaCopy, FaStar } from "react-icons/fa6";
import DeleteLayerDialog from "./DeleteLayerDialog";
import { v4 as uuidv4 } from "uuid";

type LayerContentProps = {
  layer: KonvaElementType;
  selectedLayer: KonvaElementType | undefined;
};

const LayerContent: FC<LayerContentProps> = ({ layer, selectedLayer }) => {
  const [isDeleteLayerOpen, setIsDeleteLayerOpen] = useState<boolean>(false);
  const [layerToDelete, setLayerToDelete] = useState<string | undefined>();
  const { layers } = useAppSelector((s) => s.layer);
  const dispatch = useAppDispatch();
  const [isCloned, setIsCloned] = useState(false);

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

  const handleSetAsTitleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const index = layers.findIndex((f) => f.elementId == layer.elementId);

    const isChecked = event.target.checked;
    if (index > -1) {
      let newLayers = [...layers];

      for (let i = 0; i < newLayers.length; i++) {
        if (i == index) {
          newLayers[i] = { ...newLayers[i], isTitle: isChecked };
        } else {
          newLayers[i] = {
            ...newLayers[i],
            isTitle: newLayers[i].isTitle == undefined ? undefined : false,
          };
        }
      }

      dispatch(setLayers(newLayers));
    }
  };

  const handleSetAsTeaserCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const index = layers.findIndex((f) => f.elementId == layer.elementId);

    const isChecked = event.target.checked;
    if (index > -1) {
      let newLayers = [...layers];

      for (let i = 0; i < newLayers.length; i++) {
        if (i == index) {
          newLayers[i] = { ...newLayers[i], isTeaser: isChecked };
        } else {
          newLayers[i] = {
            ...newLayers[i],
            isTeaser: newLayers[i].isTeaser == undefined ? undefined : false,
          };
        }
      }

      dispatch(setLayers(newLayers));
    }
  };

  const handleSetAsFeaturedImageCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const index = layers.findIndex((f) => f.elementId == layer.elementId);

    const isChecked = event.target.checked;
    if (index > -1) {
      let newLayers = [...layers];

      for (let i = 0; i < newLayers.length; i++) {
        if (i == index) {
          newLayers[i] = { ...newLayers[i], isFeatured: isChecked };
        } else {
          newLayers[i] = {
            ...newLayers[i],
            isFeatured:
              newLayers[i].isFeatured == undefined ? undefined : false,
          };
        }
      }

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

      let tempLayer: any = { ...newLayers[index] };
      tempLayer[prop] = +value;

      newLayers[index] = tempLayer;
      dispatch(setLayers(newLayers));
    }
  };

  const handleClickClone = () => {
    const currentIndex = layers.findIndex(
      (f) => f.elementId == layer.elementId
    );

    if (currentIndex > -1) {
      const clonedLayer: KonvaElementType = {
        ...layer,
        elementId: uuidv4(),
        isFeatured: layer.type == "media" ? false : undefined,
        isTitle: layer.isTitle != undefined ? false : undefined,
        isTeaser: layer.isTeaser != undefined ? false : undefined,
        isCloned: true,
      };
      const newLayers = [...layers];
      newLayers.splice(currentIndex + 1, 0, clonedLayer);
      dispatch(setLayers(newLayers));

      setTimeout(() => {
        const resetLayers = [...newLayers].map((m) => ({
          ...m,
          isCloned: false,
        }));
        dispatch(setLayers(resetLayers));
      }, 2000);
    }
  };

  return (
    <Box sx={{ cursor: "pointer", width: "300px" }}>
      <Box
        className={`collapse-trigger ${layer.isCloned ? "blink-box" : ""}`}
        sx={{
          px: 2,
          py: 1,
          pr: 4,
          background: isLayerSelected ? orange[100] : "inherit",
        }}
      >
        <Stack
          className="collapse-trigger"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <Typography
              className="collapse-trigger"
              noWrap
              sx={{ maxWidth: "150px", alignItems: "center" }}
            >
              <small className="collapse-trigger">{header}</small>
            </Typography>
            {(layer.isTitle || layer.isTeaser || layer.isFeatured) && (
              <Tooltip
                placement="top"
                title={
                  layer.isTitle
                    ? "Title"
                    : layer.isTeaser
                    ? "Teaser"
                    : layer.isFeatured
                    ? "Featured Image"
                    : ""
                }
              >
                <span>
                  <FaStar color={orange[600]} fontSize={12} />
                </span>
              </Tooltip>
            )}
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <FaCopy
              color={grey[700]}
              fontSize={14}
              onClick={handleClickClone}
            />
            <MdOutlineDeleteForever
              color={red[800]}
              onClick={() => {
                setIsDeleteLayerOpen(true);
                setLayerToDelete(layer.elementId);
              }}
            />
          </Stack>
        </Stack>
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
                    {fontFamilyList.map((m, index) => (
                      <MenuItem key={index} value={m} sx={{ fontFamily: m }}>
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
                    {textAlignList.map((m, index) => (
                      <MenuItem key={index} value={m}>
                        {m}
                      </MenuItem>
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
                label="x"
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
                label="y"
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

            {["media", "rectangle"].includes(layer.type || "") && (
              <Stack direction="row" spacing={2}>
                <TextField
                  label="width"
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
                  label="height"
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
                  sx={{ maxWidth: 126 }}
                  format="rgb"
                  label="stroke"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  size="small"
                  value={layer.stroke || ""}
                  onChange={handleStrokeChange}
                />
                <TextField
                  label="stroke width"
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
                  sx={{ maxWidth: 126 }}
                  format="rgb"
                  label="fill"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  size="small"
                  value={layer.fill || ""}
                  onChange={handleFillChange}
                />
                <TextField
                  label={layer.type == "rectangle" ? "corner radius" : "radius"}
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

            {layer.type == "triangle" && (
              <Stack direction="row" spacing={2}>
                <TextField
                  sx={{ maxWidth: 126 }}
                  label="sides"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  size="small"
                  value={layer.sides}
                  onChange={(event) =>
                    handleNumericValueChange(event, "sides", 3)
                  }
                />
                <></>
              </Stack>
            )}
            {layer.type == "text" && layer.isTitle != undefined && (
              <FormControlLabel
                sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                control={
                  <Checkbox
                    size="small"
                    checked={layer.isTitle}
                    onChange={handleSetAsTitleCheckboxChange}
                  />
                }
                label="Set as Title"
              />
            )}
            {layer.type == "text" && layer.isTeaser != undefined && (
              <FormControlLabel
                sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                control={
                  <Checkbox
                    size="small"
                    checked={layer.isTeaser}
                    onChange={handleSetAsTeaserCheckboxChange}
                  />
                }
                label="Set as Teaser"
              />
            )}

            {layer.type == "media" && layer.isFeatured != undefined && (
              <FormControlLabel
                sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                control={
                  <Checkbox
                    size="small"
                    checked={layer.isFeatured}
                    onChange={handleSetAsFeaturedImageCheckboxChange}
                  />
                }
                label="Set as Featured Image"
              />
            )}
          </Stack>
        </Collapse>
      </Box>
      <DeleteLayerDialog
        isOpen={isDeleteLayerOpen}
        handleClose={() => setIsDeleteLayerOpen(false)}
        elementIdToDelete={layerToDelete}
      />
    </Box>
  );
};

export default LayerContent;
