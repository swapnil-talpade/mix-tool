import Draggable from "../dragable";
import { BLOCK_TYPE, BlockData } from "../blocks/types";
import { Resizable } from "react-resizable";
import { useContext, useState } from "react";
import { LocalStorage } from "@/app/services/local-storage";
import { BlockContext } from "@/app/app";

type BlockContentProps = {
  block: BlockData;
};

const BlockContent = ({ block }: BlockContentProps) => {
  const [updatedBlock, setUpdatedBlock] = useState(block);
  const blocks = useContext(BlockContext);

  const localStorageService = new LocalStorage();

  return (
    <Resizable
      height={updatedBlock?.defaultStyle?.height as number}
      width={updatedBlock?.defaultStyle?.width as number}
      onResizeStop={(e, data) => {
        //when resize stops find the update block in blocks and update it's width and height and store blocks in local storage
        const updatedBlocks = blocks?.map((block) => {
          if (block.blockId === updatedBlock.blockId) {
            return {
              ...block,
              defaultStyle: {
                ...block.defaultStyle,
                height: data.size.height,
                width: data.size.width,
                fontSize:
                  block?.type === BLOCK_TYPE.TextBlock
                    ? data.size.height
                    : block?.defaultStyle?.fontSize,
              },
            };
          }
          return block;
        });

        localStorageService.setItem("blocks", JSON.stringify(updatedBlocks));
      }}
      onResize={(_, data) => {
        const { height, width } = data.size;

        setUpdatedBlock({
          ...updatedBlock,
          defaultStyle: {
            ...updatedBlock.defaultStyle,
            height: height,
            width: width,
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
          padding: "10px",
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
