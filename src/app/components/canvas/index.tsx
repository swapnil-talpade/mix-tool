"use client";

import { BlockData } from "../blocks/types";
import Draggable from "../dragable";
import Droppable from "../dropable";

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
          <Draggable
            key={block.blockId}
            id={block.blockId.toString()}
            styles={block.defaultStyle}
            data={block}
          >
            {block.content}
          </Draggable>
        ))}
    </Droppable>
  );
};

export default Canvas;
