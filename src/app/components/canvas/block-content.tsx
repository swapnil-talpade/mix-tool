import Draggable from "../dragable";
import { BLOCK_TYPE, BlockData } from "../blocks/types";
import { Resizable } from "react-resizable";
import { useState } from "react";

type BlockContentProps = {
  block: BlockData;
};

const BlockContent = ({ block }: BlockContentProps) => {
  const [updatedBlock, setUpdatedBlock] = useState(block);

  return (
    <Resizable
      height={updatedBlock?.defaultStyle?.height as number}
      width={updatedBlock?.defaultStyle?.width as number}
      onResizeStop={(e, data) => {}}
      onResize={(e, data) => {
        setUpdatedBlock({
          ...updatedBlock,
          defaultStyle: {
            ...updatedBlock.defaultStyle,
            height: data.size.height,
            width: data.size.width,
            fontSize:
              block?.type === BLOCK_TYPE.TextBlock
                ? data.size.height
                : updatedBlock?.defaultStyle?.fontSize,
          },
        });
      }}
    >
      <div
        style={{
          width: updatedBlock.defaultStyle?.width + "px",
          height: updatedBlock.defaultStyle?.height + "px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "15px",
          paddingBottom: "15px",
        }}
      >
        <Draggable
          key={block.blockId}
          id={block.blockId.toString()}
          styles={{
            ...block.defaultStyle,
            height: updatedBlock.defaultStyle?.height + "px",
            width: updatedBlock.defaultStyle?.width + "px",
            fontSize: updatedBlock.defaultStyle?.fontSize + "px",
          }}
          data={block}
        >
          {block.content}
        </Draggable>
      </div>
    </Resizable>
  );
};

export default BlockContent;
