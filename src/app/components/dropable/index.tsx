"use client";

import { useDroppable } from "@dnd-kit/core";

type DroppableProps = {
  children: React.ReactNode;
  id: string;
  styles: React.CSSProperties;
};

const Droppable = ({ children, id, styles }: DroppableProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} style={{ ...styles }}>
      {children}
    </div>
  );
};

export default Droppable;
