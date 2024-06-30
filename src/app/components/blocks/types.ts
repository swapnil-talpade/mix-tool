import { UniqueIdentifier } from "@dnd-kit/core";

export enum BLOCK_TYPE {
  ButtonBlock = "button_block",
  TextBlock = "text_block",
  ImageBlock = "image_block",
}

export type BlockData = {
  type: BLOCK_TYPE;
  dropableId: UniqueIdentifier | null;
  content: React.ReactNode;
  blockId: string;
  defaultOrder: number;
  defaultStyle?: React.CSSProperties;
};

export enum CUSTOMIZATION {
  Name = "name",
  ImageSource = "image_source",
  Color = "color",
  BackgroundColor = "background_color",
}
