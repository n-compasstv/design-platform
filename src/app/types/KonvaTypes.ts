import Konva from "konva";

export interface KonvaImageType{
  src?: string;
  x?: number;
  y?: number;
}

export interface KonvaElementType extends KonvaImageType {
  isSelected?: boolean;
  onSelect?: () => void;
  onChange?: (props: KonvaElementType) => void;
  type?: string;
  width?: number;
  height?: number;
}
