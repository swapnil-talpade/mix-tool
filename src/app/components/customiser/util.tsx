import { BLOCK_TYPE, BlockData, CUSTOMIZATION } from "../blocks/types";

export const getCustomiserOptions = (customiser: BlockData) => {
  switch (customiser.type) {
    case BLOCK_TYPE.ButtonBlock: {
      return [
        CUSTOMIZATION.Name,
        CUSTOMIZATION.Color,
        CUSTOMIZATION.BackgroundColor,
      ];
    }
    case BLOCK_TYPE.TextBlock: {
      return [CUSTOMIZATION.Name, CUSTOMIZATION.Color];
    }
    case BLOCK_TYPE.ImageBlock: {
      return [CUSTOMIZATION.ImageSource];
    }
  }
};
