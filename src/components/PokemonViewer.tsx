// src/components/PokemonViewer.tsx
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PokemonContext } from "../contexts/PokemonContext";

export const PokemonViewer: React.FC = () => {
  const { pokemonList, currentDetails, setSelectedIndex } =
    useContext(PokemonContext);
  const { id } = useParams<{ id: string }>();

  
  useEffect(() => {
    if (!pokemonList.length || !id) return;
    const idx = pokemonList.findIndex((entry) => {
      const parts = entry.url.split("/").filter(Boolean);
      return parts[parts.length - 1] === id;
    });
    if (idx >= 0) setSelectedIndex(idx);
  }, [id, pokemonList, setSelectedIndex]);

  if (!currentDetails) {
    return <p className="text-center mt-4">Cargando Pokémon…</p>;
  }

  return (
    <div className="
        pokedex-screen
        w-full h-full
        p-2
        overflow-hidden            /* nada de scroll */
        flex flex-col items-center
      ">
      
      <div className="w-full h-36 bg-white rounded-lg overflow-hidden">
        <img
          src={currentDetails.image}
          alt={currentDetails.name}
          className="mx-auto h-full object-contain"
        />
      </div>

      
      <h2 className="capitalize text-lg mt-1">
        {currentDetails.name}
      </h2>

      
      <div className="
        w-full
        flex-1                   /* ocupa todo el espacio que quede */
        text-xs px-2
        text-justify
        whitespace-normal        /* permite el wrap natural */
      ">
        {currentDetails.description}
      </div>
    </div>
  );
};
