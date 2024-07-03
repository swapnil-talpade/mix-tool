import type { ClientRect } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";

import Image from "next/image";
import { BLOCK_TYPE } from "../components/blocks/types";

export const deserializeBlocks = (blocks: any) => {
  return blocks?.map((block: any) => {
    let content;

    switch (block.type) {
      case BLOCK_TYPE.ButtonBlock:
        content = (
          <button
            style={{
              background: block.defaultStyle.background,
              color: block.defaultStyle.color,
            }}
          >
            {block.content.props.children}
          </button>
        );
        break;
      case BLOCK_TYPE.TextBlock:
        content = (
          <span
            style={{
              fontSize: block.defaultStyle.fontSize,
              color: block.defaultStyle.color,
              height: block.defaultStyle.height,
            }}
          >
            {block.content.props.children}
          </span>
        );
        break;
      case BLOCK_TYPE.ImageBlock:
        content = (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={block.content.props.src}
            alt="placeholder-image"
            width={block.content.props.width}
            height={block.content.props.height}
            style={{
              objectFit: "cover",
              width: "100%",
            }}
          />
        );
        break;
      default:
        content = block.content;
    }

    return {
      ...block,
      content,
    };
  });
};

export function restrictToBoundingRect(
  transform: Transform,
  rect: ClientRect,
  boundingRect: ClientRect
): Transform {
  const value = {
    ...transform,
  };

  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top;
  } else if (
    rect.bottom + transform.y >=
    boundingRect.top + boundingRect.height
  ) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom;
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
  } else if (
    rect.right + transform.x >=
    boundingRect.left + boundingRect.width
  ) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }

  return value;
}
