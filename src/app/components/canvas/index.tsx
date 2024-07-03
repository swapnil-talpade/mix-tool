"use client";

import { BlockData } from "../blocks/types";
import Droppable from "../dropable";
import BlockContent from "./block-content";

type CanvasProps = {
  blocks: BlockData[];
  id: string;
};

const Canvas = ({ blocks, id }: CanvasProps) => {
  return (
    <Droppable
      id={id}
      styles={{
        height: "30px",
        width: "60px",
        border: "1px solid #E4E9F2",
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
