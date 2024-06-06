import { DragEvent, FC, createRef, useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import { KonvaElementType, KonvaImageType } from "../../app/types/KonvaTypes";
import { Box, ImageList, ImageListItem, Stack } from "@mui/material";
import Element from "./components/Element";
import { useAppDispatch, useAppSelector } from "../../app/hooks/useStore";
import { setLayers } from "../../app/slices/layerSlice";

type CanvasProps = {
  elements: Array<KonvaElementType>;
};

const Canvas: FC<CanvasProps> = ({ elements }) => {
  const [selectedElement, setSelectedElement] = useState<
    KonvaElementType | undefined
  >();
  const stageRef = createRef<Konva.Stage>();
  const dispatch = useAppDispatch();
  const { layers } = useAppSelector((u) => u.layer);

  console.log({elements})

  return (
    <Box p={5}>
      <Stage
        className="konva-container"
        // width={window.innerWidth - 500}
        // height={(window.innerWidth - 500) * (9 / 16)}
        width={1280}
        height={720}
        style={{ background: "#fff" }}
        ref={stageRef}
      >
        <Layer>
          {elements.map((element, index) => {
            return (
              <Element
                width={element.width}
                height={element.height}
                key={element.src}
                src={element.src}
                x={element.x}
                y={element.y}
                isSelected={element.src == selectedElement?.src}
                onChange={(newElement) => {
                  const newLayers = layers.slice();
                  const currentLayer = {
                    ...newLayers[index],
                    width: newElement.width,
                    height: newElement.height,
                  }
                  newLayers[index] = currentLayer;
                  dispatch(setLayers(newLayers));
                }}
                onSelect={() => setSelectedElement(element)}
              />
            );
          })}
        </Layer>
      </Stage>
    </Box>
  );
};

export default Canvas;
