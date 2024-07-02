import PlaceHolderImage from "../../../assets/images/placeholder-image.png";
import Image from "next/image";
import { BlockData, CUSTOMIZATION } from "../blocks/types";

type CustomiserBlockProps = {
  blocks: BlockData[];
  block: BlockData;
  setBlockData: React.Dispatch<React.SetStateAction<BlockData[]>>;
  customization: CUSTOMIZATION;
  setInputValue: React.Dispatch<React.SetStateAction<any>>;
  inputValue: any;
};

const CustomiserBlock = ({
  customization,
  block,
  blocks,
  setBlockData,
  inputValue,
  setInputValue,
}: CustomiserBlockProps) => {
  const onImageChange = () => {
    const updatedBlockData = blocks.map((blockData) => {
      if (blockData.blockId === block.blockId) {
        return {
          ...blockData,
          content: (
            <Image
              src={inputValue?.image_source}
              alt="placeholder-image"
              width={blockData.defaultStyle?.width as number}
              height={blockData.defaultStyle?.height as number}
            />
          ),
        };
      }

      return blockData;
    });

    setBlockData(updatedBlockData);
  };

  const onCustomisationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const updatedBlockData = blocks.map((blockData) => {
        if (blockData.blockId === block.blockId) {
          switch (customization) {
            case CUSTOMIZATION.Name: {
              setInputValue({
                ...inputValue,
                name: event.target.value,
              });
              return {
                ...blockData,
                content: <span>{event.target.value}</span>,
              };
            }
            case CUSTOMIZATION.ImageSource: {
              setInputValue({
                ...inputValue,
                image_source: event.target.value,
              });
              return {
                ...blockData,
                content: (
                  <Image
                    src={PlaceHolderImage}
                    alt="placeholder-image"
                    width={blockData.defaultStyle?.width as number}
                    height={blockData.defaultStyle?.height as number}
                  />
                ),
              };
            }
            case CUSTOMIZATION.Color: {
              setInputValue({
                ...inputValue,
                color: event.target.value,
              });
              return {
                ...blockData,
                defaultStyle: {
                  ...blockData.defaultStyle!,
                  color: event.target.value,
                },
              };
            }
            case CUSTOMIZATION.BackgroundColor: {
              setInputValue({
                ...inputValue,
                background_color: event.target.value,
              });
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
    <div key={customization} className="w-full flex flex-col gap-2">
      <input
        type="text"
        placeholder={customization}
        value={inputValue[customization]}
        className="border rounded-md px-2 py-1 w-full"
        onChange={onCustomisationChange}
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
};

export default CustomiserBlock;
