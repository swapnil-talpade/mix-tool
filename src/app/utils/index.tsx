import type { ClientRect } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";

import Image from "next/image";

export const deserializeBlocks = (blocks: any) => {
  return blocks?.map((block: any) => {
    let content;

    switch (block.type) {
      case "button_block":
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
      case "text_block":
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
      case "image_block":
        content = (
          <Image
            src={block.content.props.src}
            alt={block.content.props.alt}
            width={block.content.props.width}
            height={block.content.props.height}
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
