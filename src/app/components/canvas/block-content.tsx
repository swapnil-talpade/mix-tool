import Draggable from "../dragable";
import { Resizable } from "react-resizable";
import { useContext, useState } from "react";
import { LocalStorage } from "@/app/services/local-storage";
import { BlockContext } from "@/app/app";
import {
  BLOCK_TYPE,
  BlockData,
  calculateDropableIds,
  getMinConstraints,
} from "@/app/lib";

type BlockContentProps = {
  block: BlockData;
};

const BlockContent = ({ block }: BlockContentProps) => {
  const [updatedBlock, setUpdatedBlock] = useState(block);
  const { blocks, setBlocks } = useContext(BlockContext);

  const localStorageService = new LocalStorage();

  const GRID_WIDTH = 60;
  const GRID_HEIGHT = 30;

  return (
    <Resizable
      height={updatedBlock?.defaultStyle?.height as number}
      width={updatedBlock?.defaultStyle?.width as number}
      minConstraints={getMinConstraints(updatedBlock.type)}
      onResizeStop={(e, data) => {
        const collisionIds = calculateDropableIds(
          updatedBlock,
          updatedBlock.overId!
        );

        const updatedBlocks = blocks?.map((block) => {
          if (block.blockId === updatedBlock.blockId) {
            return {
              ...block,
              collisionIds,
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

        setBlocks(updatedBlocks);

        localStorageService.setItem("blocks", JSON.stringify(updatedBlocks));
      }}
      draggableOpts={{ grid: [GRID_WIDTH, GRID_HEIGHT] }}
      onResize={(_, data) => {
        const { height, width } = data.size;

        setUpdatedBlock((prev) => ({
          ...prev,
          defaultStyle: {
            ...prev.defaultStyle,
            height: height,
            width: width,
            fontSize:
              block?.type === BLOCK_TYPE.TextBlock
                ? height
                : prev?.defaultStyle?.fontSize,
          },
        }));
      }}
    >
      <div
        style={{
          width: updatedBlock.defaultStyle?.width,
          height: updatedBlock.defaultStyle?.height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Draggable
          key={block.blockId}
          id={block.blockId}
          styles={{
            ...block.defaultStyle,
            height: updatedBlock.defaultStyle?.height,
            width: updatedBlock.defaultStyle?.width,
            fontSize: updatedBlock.defaultStyle?.fontSize,
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
