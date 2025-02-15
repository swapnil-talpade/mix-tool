"use client";

import { BlockData } from "@/app/lib";
import Draggable from "../dragable";

type BlocksProps = {
  blocks: BlockData[];
};

const Blocks = ({ blocks }: BlocksProps) => {
  return (
    <div className="relative flex gap-2">
      {blocks
        .filter((block) => block.collisionIds.length === 0)
        .sort((a, b) => a.defaultOrder - b.defaultOrder)
        .map((block) => (
          <Draggable
            key={block.blockId}
            id={block.blockId.toString()}
            styles={block.defaultStyle}
            data={block}
          >
            {block.content}
          </Draggable>
        ))}
    </div>
  );
};

export default Blocks;
