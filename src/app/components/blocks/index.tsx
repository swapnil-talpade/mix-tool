"use client";

import Draggable from "../dragable";
import { BlockData } from "./types";

type BlocksProps = {
  blocks: BlockData[];
};

const Blocks = ({ blocks }: BlocksProps) => {
  return (
    <div className="relative flex gap-2">
      {blocks
        .filter((block) => block.dropableId === null)
        .sort((a, b) => a.defaultOrder - b.defaultOrder)
        .map((block) => (
          <Draggable
            key={block.blockId}
            id={block.blockId.toString()}
            styles={block.defaultStyle}
          >
            {block.content}
          </Draggable>
        ))}
    </div>
  );
};

export default Blocks;
