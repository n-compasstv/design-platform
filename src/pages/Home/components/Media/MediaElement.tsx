import { FC, useEffect, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";
import { KonvaElementType } from "../../../../app/types/KonvaTypes";
import Konva from "konva";

const MediaElement: FC<KonvaElementType> = (element) => {
  const [img] = useImage(element.src ?? "");

  const elementRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (element.isSelected) {
      trRef.current.nodes([elementRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [element.isSelected]);

  useEffect(() => {
    if (img) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      // elementRef.current.cache();
    }
  }, [img]);

  return (
    <>
      <Image
        ref={elementRef}
        draggable
        // filters={element.isFeatured ? [Konva.Filters.Blur] : []}
        // blurRadius={element.isFeatured ? 5 : 0}
        image={img}
        width={element.width}
        height={element.height}
        x={element.x}
        y={element.y}
        stroke={element.stroke}
        strokeWidth={element.strokeWidth}
        isFeatured={element.isFeatured}
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

export default MediaElement;
