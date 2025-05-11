import React, { useContext, useRef, useEffect } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

export const PokemonList: React.FC = () => {
  const { pokemonList, selectedIndex } = useContext(PokemonContext);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const item = ul.children[selectedIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!pokemonList.length) {
    return <p className="text-center mt-4">Cargando lista de Pokémon…</p>;
  }

  return (
    <div className="pokedex-screen w-full h-full p-2 overflow-hidden text-xs font-pokemon">
      <ul
        ref={listRef}
        className="h-full overflow-y-auto"
        onWheel={(e) => e.preventDefault()}
      >
        {pokemonList.map((p, idx) => {
          const isSel = idx === selectedIndex;
          return (
            <li
              key={p.name}
              style={{
                backgroundColor: isSel ? "#FFD33D" : "transparent",
                borderRadius: isSel ? "0.25rem" : undefined,
              }}
              className="capitalize py-1"
            >
              {p.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
