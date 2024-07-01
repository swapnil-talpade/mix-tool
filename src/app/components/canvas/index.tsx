"use client";

import { BlockData } from "../blocks/types";
import Droppable from "../dropable";
import BlockContent from "./block-content";

type CanvasProps = {
  blocks: BlockData[];
  id: string;
  styles?: React.CSSProperties;
};

const Canvas = ({ blocks, id, styles }: CanvasProps) => {
  return (
    <Droppable
      id={id}
      styles={{
        height: "10px",
        ...styles,
      }}
    >
      {blocks
        .filter((block) => id === block.dropableId)
        .map((block) => (
          <BlockContent key={block.blockId} block={block} />
        ))}
    </Droppable>
  );
};

export default Canvas;
