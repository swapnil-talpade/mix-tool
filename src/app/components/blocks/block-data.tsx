import Image from "next/image";
import { BLOCK_TYPE, BlockData } from "./types";
import PlaceHolderImage from "../../../assets/images/placeholder-image.png";

export const BLOCK_DATA: BlockData[] = [
  {
    type: BLOCK_TYPE.ButtonBlock,
    dropableId: null,
    content: <div>Button</div>,
    defaultOrder: 1,
    blockId: Math.random() * 1000,
    defaultStyle: {
      background: "#274BDB",
      padding: "1px 6px",
      height: "30px",
      width: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      borderRadius: "4px",
      cursor: "pointer",
    },
  },
  {
    type: BLOCK_TYPE.TextBlock,
    dropableId: null,
    defaultOrder: 2,
    content: <span>Text</span>,
    blockId: Math.random() * 1000,
    defaultStyle: {
      padding: "1px 6px",
      height: "30px",
      color: "black",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    type: BLOCK_TYPE.ImageBlock,
    dropableId: null,
    defaultOrder: 3,
    content: (
      <Image
        src={PlaceHolderImage}
        alt="placeholder-image"
        width={150}
        height={150}
      />
    ),
    blockId: Math.random() * 1000,
    defaultStyle: {
      padding: "1px 6px",
      color: "black",
      cursor: "pointer",
      width: "150px",
      height: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
];
