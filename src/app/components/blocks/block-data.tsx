import Image from "next/image";
import { BLOCK_TYPE, BlockData } from "./types";
import PlaceHolderImage from "../../../assets/images/placeholder-image.png";

export const BLOCK_DATA: BlockData[] = [
  {
    type: BLOCK_TYPE.ButtonBlock,
    dropableId: null,
    content: <div>Button</div>,
    defaultOrder: 1,
    blockId: crypto.randomUUID(),
    defaultStyle: {
      background: "#274BDB",
      padding: "1px 6px",
      height: 30,
      width: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      borderRadius: "4px",
      cursor: "pointer",
      position: "relative",
      zIndex: 1,
    },
  },
  {
    type: BLOCK_TYPE.TextBlock,
    dropableId: null,
    defaultOrder: 2,
    content: <span>Text</span>,
    blockId: crypto.randomUUID(),
    defaultStyle: {
      padding: "1px 6px",
      height: 30,
      color: "black",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      zIndex: 1,
    },
  },
  {
    type: BLOCK_TYPE.ImageBlock,
    dropableId: null,
    defaultOrder: 3,
    content: (
      <Image
        src={PlaceHolderImage}
        priority={false}
        alt="placeholder-image"
        width={150}
        height={150}
      />
    ),
    blockId: crypto.randomUUID(),
    defaultStyle: {
      cursor: "pointer",
      width: 150,
      height: 150,
      position: "relative",
      zIndex: 1,
    },
  },
];
