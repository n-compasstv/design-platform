import { Button, Grid, Icon } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { KonvaElementType } from "../../../../app/types/KonvaTypes";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/useStore";
import { setLayers, setSelectedLayer } from "../../../../app/slices/layerSlice";
import { FC } from "react";
import { textsElements } from "../../../../common/constants/text";

type Props = {
  onCloseDialog: () => void;
};

const TextList: FC<Props> = ({ onCloseDialog }) => {
  const dispatch = useAppDispatch();
  const { layers } = useAppSelector((u) => u.layer);

  const handleClick = async (text: string, fontSize: number) => {
    const newLayer: KonvaElementType = {
      elementId: uuidv4(),
      contentId: "",
      src: "",
      x: 80,
      y: 80,
      type: "text",
      text: text,
      fontFamily: "Poppins",
      fontSize: fontSize,
      align: "center",
      lineHeight: 1,
      letterSpacing: 0,
      fontStyle: 500,
      fill: "rgb(0,0,0)",
      isTitle: text.toLowerCase() == "heading" ? false : undefined,
      isTeaser: text.toLowerCase() == "paragraph" ? false : undefined,
    };
    //insert new text in the beginning of the array.
    const allLayers = [newLayer, ...layers];
    dispatch(setLayers(allLayers));
    dispatch(setSelectedLayer(newLayer));
    onCloseDialog();
  };

  return (
    <Grid container justifyContent="center" alignItems="stretch" spacing={4}>
      {textsElements.map((text, index) => (
        <Grid item key={index}>
          <Button
            key={index}
            variant="contained"
            color="inherit"
            startIcon={<Icon component={text.icon} />}
            sx={{ minWidth: 250, justifyContent: "start", px: 3, py: 2 }}
            onClick={() => handleClick(text.name, text.size)}
          >
            {text.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default TextList;
