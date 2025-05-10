import React, { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";

export type PokemonEntry = { name: string; url: string };
export type PokemonDetails = { name: string; image: string; description: string };

type Context = {
  pokemonList: PokemonEntry[];
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  currentDetails: PokemonDetails | null;
};

export const PokemonContext = createContext<Context>({
  pokemonList: [],
  selectedIndex: 0,
  setSelectedIndex: () => {},
  currentDetails: null,
});

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemonList, setPokemonList] = useState<PokemonEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentDetails, setCurrentDetails] = useState<PokemonDetails | null>(null);

  // 2.1. Al montar, carga la lista completa
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then(res => setPokemonList(res.data.results));
  }, []);

  // 2.2. Cada vez que cambie selectedIndex, carga detalles + descripción
  useEffect(() => {
    if (!pokemonList.length) return;
    const entry = pokemonList[selectedIndex];
    axios.get(entry.url).then(res => {
      const img = res.data.sprites.other["official-artwork"].front_default;
      const name = res.data.name;
      // species para descripción
      axios.get(res.data.species.url).then(sp => {
        const flavor = sp.data.flavor_text_entries
          .find((f: any) => f.language.name === "en");
        setCurrentDetails({
          name,
          image: img,
          description: flavor?.flavor_text.replace(/\f/g, " ") || "",
        });
      });
    });
  }, [pokemonList, selectedIndex]);

  return (
    <PokemonContext.Provider
      value={{ pokemonList, selectedIndex, setSelectedIndex, currentDetails }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
