import { useEffect, useState } from "react";
import CustomiserBlock from "./customiser-block";
import { BlockData } from "@/app/lib/types";
import { getCustomiserOptions } from "@/app/lib/utils";

type CustomiserProps = {
  block?: BlockData | null;
  setBlockData: React.Dispatch<React.SetStateAction<BlockData[]>>;
  blocks: BlockData[];
};

const INITIAL_INPUT_VALUE = {
  name: "",
  image_source: "",
  color: "",
  background_color: "",
};

const Customiser = ({ block, setBlockData, blocks }: CustomiserProps) => {
  const [inputValue, setInputValue] = useState(INITIAL_INPUT_VALUE);

  useEffect(() => {
    return () => {
      setInputValue(INITIAL_INPUT_VALUE);
    };
  }, [block?.blockId]);

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

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center justify-center rounded-md bg-[#EAEAEB] p-4 w-44 h-44 overflow-scroll ">
        <div style={block.defaultStyle}>{block?.content}</div>
      </div>
      {customizations.map((customization) => {
        return (
          <CustomiserBlock
            key={customization}
            customization={customization}
            setBlockData={setBlockData}
            block={block}
            blocks={blocks}
            setInputValue={setInputValue}
            inputValue={inputValue}
          />
        );
      })}
    </div>
  );
};

export default Customiser;
