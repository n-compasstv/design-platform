import Konva from "konva";

export interface KonvaElementBaseType{
  elementId: string
  x: number;
  y: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onChange?: (props: KonvaElementType) => void;
  type?: string;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
}

export interface KonvaElementType extends KonvaElementBaseType {
  //media
  contentId?: string
  src?: string;
  isFeatured?: boolean;
  //circle
  radius?: number;
  fill?: string;
  //triangle
  sides?: number;
  //text
  fontSize?: number;
  fontFamily?: string;
  text?: string;
  align?: string;
  fontStyle?: number;
  lineHeight?: number;
  letterSpacing?: number;
  isTitle?: boolean;
  isTeaser?: boolean;
}
