"use client";

import { useDraggable } from "@dnd-kit/core";
import { BlockData } from "../blocks/types";

type DraggableProps = {
  children: React.ReactNode;
  id: string;
  styles?: React.CSSProperties;
  data: BlockData;
};

const Draggable = ({ children, id, styles, data }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: data,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ ...style, ...styles }}
    >
      {children}
    </button>
  );
};

export default Draggable;
