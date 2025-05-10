import React, { useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

export const PokemonViewer: React.FC = () => {
  const { currentDetails } = useContext(PokemonContext);

  if (!currentDetails) return <p className="text-center mt-4">Cargando Pokémon…</p>;

  return (
    <div className="pokedex-screen flex flex-col items-center p-2">
      <div className="w-full h-36 bg-white rounded-lg overflow-hidden">
        <img
          src={currentDetails.image}
          alt={currentDetails.name}
          className="mx-auto h-full object-contain"
        />
      </div>
      <h2 className="capitalize text-lg mt-1">{currentDetails.name}</h2>
      <div className="w-full max-h-20 overflow-y-auto text-xs px-2 text-justify">
        {currentDetails.description}
      </div>
    </div>
  );
};
