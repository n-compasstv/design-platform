import { createRef, useEffect, useState } from "react";
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
import { html } from "js-to-html";
import { Node, NodeConfig } from "konva/lib/Node";
import { objectToCssString } from "../../../app/helpers/string";
import saveAs from "file-saver";
import { useCustomEventListener } from "react-custom-events";

const Canvas = () => {
  const [canvasWidth] = useState(window.innerWidth - 500);
  const [canvasHeight] = useState((canvasWidth * 9) / 16);

  console.log("rerendered", canvasWidth);
  const stageRef = createRef<Konva.Stage>();
  const dispatch = useAppDispatch();
  const { layers, selectedLayer } = useAppSelector((u) => u.layer);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch(setSelectedLayer(undefined));
    }
  };

  const getLayers = (layerType: string) => {
    const stage = stageRef.current?.getStage();
    return (
      stage?.find(layerType).map((text: Node<NodeConfig>, index: number) => {
        let style = {};

        switch (layerType) {
          case "Text": {
            style = {
              position: "absolute",
              left: `${text.attrs.x}px`,
              top: `${text.attrs.y}px`,
              font_size: `${text.attrs.fontSize}px`,
              font_family: text.attrs.fontFamily,
              color: text.attrs.fill,
              letter_spacing: `${text.attrs.letterSpacing}px`,
              line_height: text.attrs.lineHeight,
              text_align: text.attrs.align,
              width: `${text.attrs.width}px`,
              height: `${text.attrs.height}px`,
              z_index: layers.length - index,
            };
            break;
          }
          case "Rect": {
            style = {
              position: "absolute",
              left: `${text.attrs.x}px`,
              top: `${text.attrs.y}px`,
              background: text.attrs.fill,
              width: `${text.attrs.width}px`,
              height: `${text.attrs.height}px`,
              border_radius: `${text.attrs.radius}px`,
              border_color: `${text.attrs.stroke}`,
              border_width: `${text.attrs.strokeWidth}px`,
              border_style: "solid",
              z_index: index,
            };
            break;
          }
          default:
        }
        return html.p({ style: objectToCssString(style) }, text.attrs.text);
      }) || []
    );
  };

  const canvasToHtmlEvent = () => {
    const stage = stageRef.current?.getStage();
    if (stage) {
      const textLayers = getLayers("Text");
      const rectLayers = getLayers("Rect");

      var finalHtml = html.html([
        html.head([html.style("p { margin: 0 }")]),
        html.body([...textLayers, ...rectLayers]),
      ]);
      const htmlString = finalHtml.toHtmlDoc({ title: "test", pretty: true }, {});

      const blob = new Blob([htmlString], { type: "text/html" });

      saveAs(blob, "test.html");
    }
  };

  useCustomEventListener(
    "ce-canvastohtml",
    () => {
      canvasToHtmlEvent();
    },
    []
  );

  useEffect(() => {
    setTimeout(() => {
      stageRef.current?.draw();
    }, 1);
  }, []);


  console.log(canvasWidth)

  return (
    <Box p={5} alignSelf="start">
      <Stage
        className="konva-container"
        width={canvasWidth}
        height={canvasHeight}
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
