import { useEffect, useState } from "react";
import { BlockData, CUSTOMIZATION } from "../blocks/types";
import { getCustomiserOptions } from "./util";
import Image from "next/image";

type CustomiserProps = {
  block?: BlockData | null;
  setBlockData: React.Dispatch<React.SetStateAction<BlockData[]>>;
  blocks: BlockData[];
};

const Customiser = ({ block, setBlockData, blocks }: CustomiserProps) => {
  if (!block) {
    return <span>Please select a block to customize</span>;
  }

  const customizations = getCustomiserOptions(block);

  const onCustomisationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    customization: CUSTOMIZATION
  ) => {
    try {
      const updatedBlockData = blocks.map((blockData) => {
        if (blockData.blockId === block.blockId) {
          switch (customization) {
            case CUSTOMIZATION.Name: {
              return {
                ...blockData,
                content: <span>{event.target.value}</span>,
              };
            }
            case CUSTOMIZATION.ImageSource: {
              return {
                ...blockData,
                content: (
                  <Image
                    src={event.target.value}
                    alt="placeholder-image"
                    width={150}
                    height={150}
                  />
                ),
              };
            }
            case CUSTOMIZATION.Color: {
              return {
                ...blockData,
                defaultStyle: {
                  ...blockData.defaultStyle!,
                  color: event.target.value,
                },
              };
            }
            case CUSTOMIZATION.BackgroundColor: {
              return {
                ...blockData,
                defaultStyle: {
                  ...blockData.defaultStyle!,
                  background: event.target.value,
                },
              };
            }
          }
        }

        return blockData;
      });

      setBlockData(updatedBlockData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      <div style={block?.defaultStyle}>{block?.content}</div>
      {customizations.map((customization) => {
        return (
          <div key={customization} className="w-full">
            <input
              type="text"
              placeholder={customization}
              className="border rounded-md px-2 py-1 w-full"
              onChange={(event) => onCustomisationChange(event, customization)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Customiser;
