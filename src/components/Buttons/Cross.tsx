import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useIonRouter } from "@ionic/react";
import {
  EPokedexScreen,
  EPokedexMenuOption,
  MenuPokedexContext,
} from "../../contexts/MenuPokedexContext";
import { PokemonContext } from "../../contexts/PokemonContext";
import { ItemsContext } from "../../contexts/ItemsContext";

export const Cross = () => {
  const { screen, menuOption, setMenuOption } = useContext(
    MenuPokedexContext
  );
  const { pokemonList, selectedIndex, setSelectedIndex } =
    useContext(PokemonContext);
  const {
    itemsList,
    selectedItem,
    setSelectedItem,
  } = useContext(ItemsContext);

  const router = useIonRouter();
  const location = useLocation();
  const isDetailView = /^\/pokedex\/[^/]+$/.test(
    location.pathname
  );
  const isItemDetailView = /^\/pack\/[^/]+$/.test(location.pathname);

  
  const prevMenu = () => {
    const newOpt =
      menuOption === EPokedexMenuOption.POKEDEX
        ? EPokedexMenuOption.EXIT
        : (menuOption - 1 as EPokedexMenuOption);
    setMenuOption(newOpt);
  };
  const nextMenu = () => {
    const newOpt =
      menuOption === EPokedexMenuOption.EXIT
        ? EPokedexMenuOption.POKEDEX
        : (menuOption + 1 as EPokedexMenuOption);
    setMenuOption(newOpt);
  };

  
  const handleUp = () => {
    if (screen === EPokedexScreen.MENU) {
      prevMenu();
    } else if (
      screen === EPokedexScreen.POKEDEX &&
      !isDetailView
    ) {
      setSelectedIndex(Math.max(0, selectedIndex - 1));
    } else if (screen === EPokedexScreen.PACK) {
      
      const cols = 4;
      const row = Math.floor(selectedItem / cols);
      if (row > 0) setSelectedItem(selectedItem - cols);
    }
  };
  const handleDown = () => {
    if (screen === EPokedexScreen.MENU) {
      nextMenu();
    } else if (
      screen === EPokedexScreen.POKEDEX &&
      !isDetailView
    ) {
      setSelectedIndex(
        Math.min(pokemonList.length - 1, selectedIndex + 1)
      );
    } else if (screen === EPokedexScreen.PACK) {
      
      const cols = 4;
      if (selectedItem + cols < itemsList.length) {
        setSelectedItem(selectedItem + cols);
      }
    }
  };

  
  const handleLeft = () => {
    if (screen === EPokedexScreen.MENU) prevMenu();
    else if (screen === EPokedexScreen.PACK) {
      const col = selectedItem % 4;
      if (col > 0) setSelectedItem(selectedItem - 1);
    }
  };
  const handleRight = () => {
    if (screen === EPokedexScreen.MENU) nextMenu();
    else if (screen === EPokedexScreen.PACK) {
      const col = selectedItem % 4;
      if (
        col < 3 &&
        selectedItem + 1 < itemsList.length
      ) {
        setSelectedItem(selectedItem + 1);
      }
    }
  };


  const handleMid = () => {
    if (isDetailView) {
      router.push("/pokedex");
    } else if (isItemDetailView) {
+      router.push("/pack");
    }
  };

  return (
    <div id="cross">
      <div
        id="leftcross"
        className="gameboy-button"
        onClick={handleLeft}
      >
        <div id="leftT" />
      </div>

      <div
        id="topcross"
        className="gameboy-button"
        onClick={handleUp}
      >
        <div id="upT" />
      </div>

      <div
        id="rightcross"
        className="gameboy-button"
        onClick={handleRight}
      >
        <div id="rightT" />
      </div>

      <div
        id="midcross"
        className="gameboy-button"
        onClick={handleMid}
      >
        <div id="midCircle" />
      </div>

      <div
        id="botcross"
        className="gameboy-button"
        onClick={handleDown}
      >
        <div id="downT" />
      </div>
    </div>
  );
};
