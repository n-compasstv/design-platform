import { FC, useEffect, useRef } from "react";
import { Text, Transformer } from "react-konva";
import { KonvaElementType } from "../../../../app/types/KonvaTypes";

const TextElement: FC<KonvaElementType> = (element) => {

  const elementRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (element.isSelected) {
      trRef.current.nodes([elementRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [element.isSelected]);

  return (
    <>
      <Text
        ref={elementRef}
        draggable
        width={element.width}
        height={element.height}
        x={element.x}
        y={element.y}
        stroke={element.stroke}
        strokeWidth={element.strokeWidth}
        text={element.text}
        fontFamily={element.fontFamily}
        fontSize={element.fontSize}
        lineHeight={element.lineHeight}
        letterSpacing={element.letterSpacing}
        align={element.align}
        fill={element.fill}
        fontStyle={element.fontStyle?.toString()}
        onDragEnd={(e) => {
          element.onChange &&
            element.onChange({
              ...element,
              x: e.target.x(),
              y: e.target.y(),
            });
        }}
        onClick={element.onSelect}
        onTap={element.onSelect}
        onTransformEnd={(e) => {
          const node = elementRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          element.onChange &&
            element.onChange({
              ...element,
              width: Math.max(20, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
              fontSize: Math.max(node.fontSize() * scaleY),
            });
        }}
      />
      {element.isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 20 || Math.abs(newBox.height) < 20) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TextElement;
