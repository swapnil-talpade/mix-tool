import { BLOCK_TYPE, BlockData, IMAGE_URL } from "@/app/lib";

export const BLOCK_DATA: BlockData[] = [
  {
    type: BLOCK_TYPE.ButtonBlock,
    collisionIds: [],
    content: <div>Button</div>,
    defaultOrder: 1,
    blockId: crypto.randomUUID(),
    defaultStyle: {
      background: "#274BDB",
      height: 30,
      width: 120,
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
    collisionIds: [],
    defaultOrder: 2,
    content: <span>Text</span>,
    blockId: crypto.randomUUID(),
    defaultStyle: {
      padding: "1px 6px",
      height: 30,
      width: 60,
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
    collisionIds: [],
    defaultOrder: 3,
    content: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={IMAGE_URL}
        alt="placeholder-image"
        style={{
          objectFit: "cover",
          width: "100%",
        }}
      />
    ),
    blockId: crypto.randomUUID(),
    defaultStyle: {
      cursor: "pointer",
      position: "relative",
      zIndex: 1,
      width: 60,
      height: 90,
    },
  },
];
