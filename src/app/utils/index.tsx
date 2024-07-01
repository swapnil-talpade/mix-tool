import Image from "next/image";

export const deserializeBlocks = (blocks: any) => {
  return blocks.map((block: any) => {
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
        content = <span>{block.content.props.children}</span>;
        break;
      case "image_block":
        content = (
          <Image
            src={block.content.props.src.src}
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
