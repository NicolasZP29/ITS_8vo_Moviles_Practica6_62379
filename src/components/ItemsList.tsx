import React, { useContext, useRef, useEffect } from "react";
import { ItemsContext } from "../contexts/ItemsContext";

export const ItemsList: React.FC = () => {
  const { itemsList, selectedItem } = useContext(ItemsContext);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cell = grid.children[selectedItem] as HTMLElement | undefined;
    cell?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [selectedItem]);

  if (!itemsList.length) {
    return <p className="text-center mt-4">Cargando objetos…</p>;
  }

  return (
    <div className="items-screen w-full h-full p-2 overflow-hidden">
      <div
        ref={gridRef}
        className="grid grid-cols-4 gap-2 h-full overflow-y-auto"
        onWheel={(e) => e.preventDefault()}
      >
        {itemsList.map((it, idx) => {
          const isSel = idx === selectedItem;
          return (
            <div
              key={it.name}
              style={{
                backgroundColor: isSel ? "#FFD33D" : "transparent",
                borderRadius: isSel ? "0.25rem" : undefined,
              }}
              className="text-center p-1"
            >
              <img
                src={it.image}
                alt={it.name}
                className="mx-auto h-12 object-contain"
              />
              <span className="capitalize text-xs block">
                {it.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
