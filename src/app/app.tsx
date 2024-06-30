"use client";

import { CSSProperties, useState } from "react";
import Blocks from "./components/blocks";
import { BLOCK_DATA } from "./components/blocks/block-data";
import Canvas from "./components/canvas";
import Customiser from "./components/customiser";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { BlockData } from "./components/blocks/types";

const App = () => {
  const [blockData, setBlockData] = useState(BLOCK_DATA);
  const sensors = useSensors(useSensor(PointerSensor));
  const [canvasStyles, setCanvasStyles] = useState<
    Record<string, CSSProperties>
  >({});
  const [selectedBlock, setSelectedBlock] = useState<BlockData | null>(null);

  const onDragStart = (event: DragStartEvent) => {};

  const onDragMove = (event: DragMoveEvent) => {
    const { collisions } = event;

    const styles = collisions?.reduce((acc, collision) => {
      if (collision?.id) {
        return {
          ...acc,
          [collision.id]: {
            border: "1px solid #E4E9F2",
          },
        };
      }

      return acc;
    }, {});

    setCanvasStyles({ ...styles });
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const updatedBlockData = blockData.map((block) => {
      if (block.blockId == active.id && over?.id) {
        return {
          ...block,
          dropableId: over?.id!,
        };
      }

      return block;
    });

    const block = active.data.current as BlockData;

    setSelectedBlock(block);

    const isNewBlockPresent = updatedBlockData.some(
      (prevBlock) =>
        prevBlock.dropableId == null && prevBlock.type === block?.type
    );

    if (!isNewBlockPresent) {
      const newBlock: BlockData = {
        ...block!,
        dropableId: null,
        blockId: crypto.randomUUID(),
      };

      setBlockData([...updatedBlockData, newBlock]);
    } else {
      setBlockData(updatedBlockData);
    }

    setCanvasStyles({});
  };

  const onDeleteBlockHandler = () => {
    if (!selectedBlock) return;

    const updatedBlockData = blockData.filter(
      (block) => block.blockId !== selectedBlock.blockId
    );

    setBlockData(updatedBlockData);
    setSelectedBlock(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
    >
      <div className="basis-1/4 border h-full p-4 relative flex flex-col gap-2">
        <span className="text-lg font-semibold">Blocks</span>
        <Blocks blocks={blockData} />
      </div>
      <div className="basis-2/4 border h-full bg-[#EAEAEB] p-4 flex flex-col gap-2">
        <span className="text-lg font-semibold">Play Area</span>
        <div className="grid grid-cols-30 h-[90%] bg-white">
          {new Array(900).fill(0).map((_, index) => (
            <Canvas
              blocks={blockData}
              key={index}
              id={`canvas-${index}`}
              styles={canvasStyles[`canvas-${index}`]}
            />
          ))}
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
  );
};

export default App;
