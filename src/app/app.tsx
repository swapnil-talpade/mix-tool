"use client";

import { createContext, useEffect, useState } from "react";
import Blocks from "./components/blocks";
import { BLOCK_DATA } from "./components/blocks/block-data";
import Canvas from "./components/canvas";
import Customiser from "./components/customiser";
import {
  DndContext,
  DragEndEvent,
  Modifier,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { LocalStorage } from "./services/local-storage";
import {
  calculateDropableIds,
  deserializeBlocks,
  restrictToBoundingRect,
} from "./lib/utils";
import { BlockData } from "./lib/types";

export const BlockContext = createContext<{
  blocks: BlockData[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockData[]>>;
}>({
  blocks: [],
  setBlocks: () => {},
});

const App = () => {
  const [blockData, setBlockData] = useState<BlockData[]>([]);
  const sensors = useSensors(useSensor(PointerSensor));
  const [selectedBlock, setSelectedBlock] = useState<BlockData | null>(null);
  const localStorageService = new LocalStorage();

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const isBlockOverlapping = blockData.some((block) => {
      return block.collisionIds.some((id) => id === over?.id);
    });

    if (isBlockOverlapping) {
      return;
    }

    const updatedBlockData = blockData.map((block) => {
      if (block.blockId == active.id && over?.id) {
        return {
          ...block,
          collisionIds: calculateDropableIds(block, over?.id),
          overId: over?.id,
        };
      }

      return block;
    });

    const block = active.data.current as BlockData;

    if (over?.id || block.collisionIds.length > 0) {
      setSelectedBlock(block);
    }

    const isNewBlockPresent = updatedBlockData.some(
      (prevBlock) =>
        prevBlock.collisionIds.length === 0 && prevBlock.type === block?.type
    );

    if (!isNewBlockPresent) {
      const newBlock: BlockData = {
        ...block!,
        collisionIds: [],
        blockId: crypto.randomUUID(),
      };

      setBlockData([...updatedBlockData, newBlock]);
    } else {
      setBlockData(updatedBlockData);
    }
  };

  const onDeleteBlockHandler = () => {
    if (!selectedBlock) return;

    const blocks = blockData.filter(
      (block) => block.blockId !== selectedBlock.blockId
    );

    setBlockData(blocks);
    setSelectedBlock(null);
  };

  const customCollisionDetectionAlgorithm = (args: any) => {
    const pointerCollisions = pointerWithin(args);

    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    return rectIntersection(args);
  };

  const modifier: Modifier = (args) => {
    if (args.active == null) {
      return args.transform;
    }

    const { draggingNodeRect, transform } = args;

    if (draggingNodeRect == null || args.over == null) {
      return transform;
    }

    return restrictToBoundingRect(transform, draggingNodeRect, args.over.rect);
  };

  useEffect(() => {
    if (blockData?.length > 0) {
      localStorageService.setItem("blocks", JSON.stringify(blockData));
    } else {
      const blocks = localStorageService.getItem("blocks");

      const parsedBlocks: BlockData[] =
        blocks && deserializeBlocks(JSON.parse(blocks));

      if (parsedBlocks?.length > 0) {
        setBlockData(parsedBlocks);
      } else {
        localStorageService.setItem("blocks", JSON.stringify(BLOCK_DATA));
        setBlockData(BLOCK_DATA);
      }
    }
  }, [blockData]);

  return (
    <BlockContext.Provider
      value={{
        blocks: blockData,
        setBlocks: setBlockData,
      }}
    >
      <DndContext
        sensors={sensors}
        onDragEnd={onDragEnd}
        modifiers={[modifier]}
        collisionDetection={customCollisionDetectionAlgorithm}
      >
        <div className="basis-1/4 border h-full p-4 relative flex flex-col gap-2">
          <span className="text-lg font-semibold">Blocks</span>
          <Blocks blocks={blockData} />
        </div>
        <div className="basis-2/4 overflow-hidden border bg-[#EAEAEB] p-4 flex flex-col gap-2 h-full">
          <span className="text-lg font-semibold">Play Area</span>
          <div className="overflow-scroll w-full h-full">
            <div className="flex flex-wrap bg-white w-[1920px] h-[1080px]">
              {new Array(1152).fill(0).map((_, index) => (
                <Canvas blocks={blockData} key={index} id={`canvas-${index}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="basis-1/3 border h-full p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Customizer</span>
            {selectedBlock && (
              <button
                className="bg-[#DB2C66] px-3 py-1  text-white rounded-[4px]"
                onClick={onDeleteBlockHandler}
              >
                Delete Block
              </button>
            )}
          </div>
          <Customiser
            block={selectedBlock}
            setBlockData={setBlockData}
            blocks={blockData}
          />
        </div>
      </DndContext>
    </BlockContext.Provider>
  );
};

export default App;
