import Konva from "konva";

export interface KonvaImageType{
  contentId?: string
  src?: string;
  x?: number;
  y?: number;
}

export interface KonvaElementType extends KonvaImageType {
  elementId: string
  isSelected?: boolean;
  onSelect?: () => void;
  onChange?: (props: KonvaElementType) => void;
  type?: string;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
}
