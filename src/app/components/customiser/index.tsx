import { useState } from "react";
import { BlockData, CUSTOMIZATION } from "../blocks/types";
import { getCustomiserOptions } from "./util";
import Image from "next/image";
import PlaceHolderImage from "../../../assets/images/placeholder-image.png";

type CustomiserProps = {
  block?: BlockData | null;
  setBlockData: React.Dispatch<React.SetStateAction<BlockData[]>>;
  blocks: BlockData[];
};

const Customiser = ({ block, setBlockData, blocks }: CustomiserProps) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    imageSource: "",
    color: "",
    backgroundColor: "",
  });

  if (!block) {
    return (
      <div className="flex items-center justify-center rounded-md bg-[#EAEAEB] p-4 w-full">
        <span className="text-gray-400">
          Please select a block to customize
        </span>
      </div>
    );
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
              setInputValue((prev) => ({
                ...prev,
                imageSource: event.target.value,
              }));
              return {
                ...blockData,
                content: (
                  <Image
                    src={PlaceHolderImage}
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

  const onImageChange = () => {
    const updatedBlockData = blocks.map((blockData) => {
      if (blockData.blockId === block.blockId) {
        return {
          ...blockData,
          content: (
            <Image
              src={inputValue.imageSource}
              alt="placeholder-image"
              width={150}
              height={150}
            />
          ),
        };
      }

      return blockData;
    });

    setBlockData(updatedBlockData);
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="flex items-center justify-center rounded-md bg-[#EAEAEB] p-4 w-full">
        <div style={block?.defaultStyle}>{block?.content}</div>
      </div>
      {customizations.map((customization) => {
        return (
          <div key={customization} className="w-full flex flex-col gap-2">
            <input
              type="text"
              placeholder={customization}
              className="border rounded-md px-2 py-1 w-full"
              onChange={(event) => onCustomisationChange(event, customization)}
            />
            {customization === CUSTOMIZATION.ImageSource && (
              <button
                onClick={onImageChange}
                className="bg-[#274BDB] px-2 py-1 text-white rounded-md "
              >
                Update
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Customiser;
