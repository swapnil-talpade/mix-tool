import Draggable from "../dragable";
import { BlockData } from "../blocks/types";

type BlockContentProps = {
  block: BlockData;
};

const BlockContent = ({ block }: BlockContentProps) => {
  return (
    <Draggable
      key={block.blockId}
      id={block.blockId.toString()}
      styles={block.defaultStyle}
      data={block}
    >
      {block.content}
    </Draggable>
  );
};

export default BlockContent;
