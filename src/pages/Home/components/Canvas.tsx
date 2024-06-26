import { createRef } from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/useStore";
import { setLayers, setSelectedLayer } from "../../../app/slices/layerSlice";
import MediaElement from "./Media/MediaElement";
import CircleElement from "./Shapes/CircleElement";
import RectElement from "./Shapes/RectElement";
import TriangleElement from "./Shapes/TriangleElement";
import TextElement from "./Text/TextElement";

const Canvas = () => {
  const stageRef = createRef<Konva.Stage>();
  const dispatch = useAppDispatch();
  const { layers, selectedLayer } = useAppSelector((u) => u.layer);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch(setSelectedLayer(undefined));
    }
  };

  return (
    <Box p={5}>
      <Stage
        className="konva-container"
        width={1280}
        height={720}
        style={{ background: "#fff" }}
        ref={stageRef}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {layers.map((el, index) => {
            //reverse the rendering so that the first element is in front of the canvas
            const revIndex = layers.slice(index, layers.length - 1).length;
            const element = layers[revIndex];
            let finalElement = <></>;
            switch (element.type?.toLowerCase()) {
              case "media":
                finalElement = (
                  <MediaElement
                    elementId={element.elementId}
                    width={element.width}
                    height={element.height}
                    key={element.elementId}
                    src={element.src}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    isFeatured={element.isFeatured}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[revIndex],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[revIndex] = currentLayer;
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
                    key={element.elementId}
                    src={element.src}
                    fill={element.fill}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[revIndex],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[revIndex] = currentLayer;
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
                    key={element.elementId}
                    src={element.src}
                    fill={element.fill}
                    radius={element.radius}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[revIndex],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[revIndex] = currentLayer;
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
                    key={element.elementId}
                    src={element.src}
                    fill={element.fill}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[revIndex],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[revIndex] = currentLayer;
                      dispatch(setLayers(newLayers));
                    }}
                    onSelect={() => dispatch(setSelectedLayer(element))}
                  />
                );
                break;

              case "text":
                finalElement = (
                  <TextElement
                    elementId={element.elementId}
                    text={element.text}
                    fontFamily={element.fontFamily}
                    fontSize={element.fontSize}
                    lineHeight={element.lineHeight}
                    letterSpacing={element.letterSpacing}
                    fontStyle={element.fontStyle}
                    align={element.align}
                    width={element.width}
                    height={element.height}
                    key={element.elementId}
                    src={element.src}
                    fill={element.fill}
                    x={element.x}
                    y={element.y}
                    isSelected={element.elementId == selectedLayer?.elementId}
                    onChange={(newElement) => {
                      const newLayers = layers.slice();
                      const currentLayer = {
                        ...newLayers[revIndex],
                        width: newElement.width,
                        height: newElement.height,
                        x: newElement.x,
                        y: newElement.y,
                      };
                      newLayers[revIndex] = currentLayer;
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
