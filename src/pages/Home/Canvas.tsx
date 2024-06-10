import { FC, createRef } from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { KonvaElementType } from "../../app/types/KonvaTypes";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks/useStore";
import { setLayers, setSelectedLayer } from "../../app/slices/layerSlice";
import MediaElement from "./components/Media/MediaElement";
import CircleElement from "./components/Shapes/CircleElement";
import RectElement from "./components/Shapes/RectElement";
import TriangleElement from "./components/Shapes/TriangleElement";

type CanvasProps = {
  elements: Array<KonvaElementType>;
};

const Canvas: FC<CanvasProps> = ({ elements }) => {
  const stageRef = createRef<Konva.Stage>();
  const dispatch = useAppDispatch();
  const { layers, selectedLayer } = useAppSelector((u) => u.layer);

  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch(setSelectedLayer(undefined));
    }
  };

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
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {elements.map((element, index) => {
            let finalElement = <></>;
            switch (element.type?.toLowerCase()) {
              case "media":
                finalElement = (
                  <MediaElement
                    elementId={element.elementId}
                    width={element.width}
                    height={element.height}
                    key={element.src}
                    src={element.src}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[index],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[index] = currentLayer;
                      dispatch(setLayers(newLayers));
                    }}
                    onSelect={() => dispatch(setSelectedLayer(element))}
                  />
                );
                break;

              case "circle":
                finalElement = (
                  <CircleElement
                    elementId={element.elementId}
                    radius={element.radius}
                    width={element.width}
                    height={element.height}
                    key={element.src}
                    src={element.src}
                    fill={element.fill}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[index],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[index] = currentLayer;
                      dispatch(setLayers(newLayers));
                    }}
                    onSelect={() => dispatch(setSelectedLayer(element))}
                  />
                );
                break;
              case "rectangle":
                finalElement = (
                  <RectElement
                    elementId={element.elementId}
                    width={element.width}
                    height={element.height}
                    key={element.src}
                    src={element.src}
                    fill={element.fill}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[index],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[index] = currentLayer;
                      dispatch(setLayers(newLayers));
                    }}
                    onSelect={() => dispatch(setSelectedLayer(element))}
                  />
                );
                break;

                case "triangle":
                  finalElement = (
                    <TriangleElement
                      elementId={element.elementId}
                      sides={element.sides}
                      radius={element.radius}
                      width={element.width}
                      height={element.height}
                      key={element.src}
                      src={element.src}
                      fill={element.fill}
                      x={element.x}
                      y={element.y}
                      isSelected={element.elementId == selectedLayer?.elementId}
                      onChange={(newElement) => {
                        const newLayers = layers.slice();
                        const currentLayer = {
                          ...newLayers[index],
                          width: newElement.width,
                          height: newElement.height,
                          x: newElement.x,
                          y: newElement.y,
                        };
                        newLayers[index] = currentLayer;
                        dispatch(setLayers(newLayers));
                      }}
                      onSelect={() => dispatch(setSelectedLayer(element))}
                    />
                  );
                  break;

              default:
                finalElement = <></>;
            }
            return finalElement;
          })}
        </Layer>
      </Stage>
    </Box>
  );
};

export default Canvas;
