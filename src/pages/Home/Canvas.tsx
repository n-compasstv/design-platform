import { DragEvent, FC, createRef, useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import { KonvaImageType } from "../../app/types/KonvaImageType";
import { Box, ImageList, ImageListItem, Stack } from "@mui/material";

export type UrlImageProps = {
  image: KonvaImageType;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (props: KonvaImageType) => void;
  type?: string;
};

const UrlImage: FC<UrlImageProps> = ({
  image,
  isSelected,
  onSelect,
  onChange,
}) => {
  const [img] = useImage(image.src);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: image.x,
    y: image.y,
  });

  const imageRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        ref={imageRef}
        draggable
        image={img}
        x={position.x}
        y={position.y}
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        onDragEnd={(e) => {
          setPosition({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e) => {
          const node = imageRef.current;

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            src: image.src,
            x: node.x(),
            y: node.y(),
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

type CanvasProps = {
  elements: Array<UrlImageProps>;
};

const Canvas: FC<CanvasProps> = ({ elements }) => {
  const stageRef = createRef<Konva.Stage>();
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
          {elements.map((image) => {
            return (
              <UrlImage
                image={image.image}
                isSelected={false}
                onChange={() => {}}
                onSelect={() => {}}
              />
            );
          })}
        </Layer>
      </Stage>
    </Box>
  );
};

export default Canvas;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
  },
];
