import Konva from "konva";

export interface KonvaElementBaseType{
  elementId: string
  x: number;
  y: number;
}

export interface KonvaElementType extends KonvaElementBaseType {
  contentId?: string
  src?: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onChange?: (props: KonvaElementType) => void;
  type?: string;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  //circle
  radius?: number;
  fill?: string;
}
