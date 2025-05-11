import React, { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";

export type ItemDetails = {
  id: string;
  name: string;
  image: string;
};

type ItemsContextType = {
  itemsList: ItemDetails[];
  selectedItem: number;
  setSelectedItem: (i: number) => void;
};

export const ItemsContext = createContext<ItemsContextType>({
  itemsList: [],
  selectedItem: 0,
  setSelectedItem: () => {},
});

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [itemsList, setItemsList] = useState<ItemDetails[]>([]);
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/item?limit=100")
      .then((res) => {
        const entries: { name: string; url: string }[] = res.data.results;
        return Promise.all(
          entries.map((e) =>
            axios.get(e.url).then((d) => ({
              id: d.data.id.toString(),
              name: d.data.name,
              image: d.data.sprites.default,
            }))
          )
        );
      })
      .then(setItemsList)
      .catch(console.error);
  }, []);

  return (
    <ItemsContext.Provider
      value={{ itemsList, selectedItem, setSelectedItem }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
