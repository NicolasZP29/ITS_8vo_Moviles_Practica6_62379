import React, { useState, useEffect } from "react";
import axios from "axios";

type Item = { name: string; image: string };

export const ItemsList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/item?limit=200")
      .then(res =>
        Promise.all(
          res.data.results.map((it: any) =>
            axios.get(it.url).then(r => ({
              name: r.data.name,
              image: r.data.sprites.default,
            }))
          )
        )
      )
      .then(setItems);
  }, []);

  if (!items.length) return <p>Cargando objetos…</p>;
  return (
    <div className="items-screen grid grid-cols-4 gap-2 p-2">
      {items.map((it) => (
        <div key={it.name} className="text-center">
          <img src={it.image} alt={it.name} className="mx-auto h-12" />
          <span className="capitalize text-xs">{it.name}</span>
        </div>
      ))}
    </div>
  );
};
