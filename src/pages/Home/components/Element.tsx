import { FC, useEffect, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";
import { KonvaElementType } from "../../../app/types/KonvaTypes";

const Element: FC<KonvaElementType> = ({
  src,
  x,
  y,
  isSelected,
  onSelect,
  onChange,
  width,
  height,
  stroke,
  strokeWidth,
}) => {
  const [img] = useImage(src ?? "");
  const [position, setPosition] = useState<{
    x: number | undefined;
    y: number | undefined;
  }>({
    x: x,
    y: y,
  });

  const elementRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([elementRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        ref={elementRef}
        draggable
        image={img}
        width={width}
        height={height}
        x={position.x}
        y={position.y}
        stroke={stroke}
        strokeWidth={strokeWidth}
        onDragEnd={(e) => {
          setPosition({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e) => {
          const node = elementRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange &&
            onChange({
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Element;
