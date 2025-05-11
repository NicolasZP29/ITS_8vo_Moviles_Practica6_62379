import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ItemsContext } from "../contexts/ItemsContext";

export const ItemViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { itemsList, setSelectedItem } = useContext(ItemsContext);
  const [details, setDetails] = useState<{
    name: string;
    image: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    if (!id || !itemsList.length) return;
    
    const idx = itemsList.findIndex((it) => it.id === id);
    if (idx >= 0) setSelectedItem(idx);

    
    axios.get(`https://pokeapi.co/api/v2/item/${id}`).then((res) => {
      const name = res.data.name;
      const image = res.data.sprites.default;
      const effect = res.data.effect_entries.find(
        (e: any) => e.language.name === "en"
      )?.short_effect;
      setDetails({
        name,
        image,
        description: effect || "",
      });
    });
  }, [id, itemsList, setSelectedItem]);

  if (!details) {
    return <p className="text-center mt-4">Cargando objeto…</p>;
  }

  return (
    <div className="
        pokedex-screen
        w-full h-full
        p-2 overflow-hidden
        flex flex-col items-center
      ">
      <div className="w-full h-36 bg-white rounded-lg overflow-hidden">
        <img
          src={details.image}
          alt={details.name}
          className="mx-auto h-full object-contain"
        />
      </div>
      <h2 className="capitalize text-lg mt-1">{details.name}</h2>
      <div className="
        w-full flex-1
        text-xs px-2 text-justify whitespace-normal
      ">
        {details.description}
      </div>
    </div>
  );
};
