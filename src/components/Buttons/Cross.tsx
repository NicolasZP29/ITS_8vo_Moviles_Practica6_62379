import { useContext } from "react";
import { EPokedexScreen, MenuPokedexContext } from "../../contexts/MenuPokedexContext";
import { PokemonContext } from "../../contexts/PokemonContext";

export const Cross = () => {
  const { screen, menuOption, setMenuOption } = useContext(MenuPokedexContext);
  const { pokemonList, selectedIndex, setSelectedIndex } =
    useContext(PokemonContext);

  const prevMenu = () => setMenuOption(menuOption - 1 < 1 ? 3 : menuOption - 1);
  const nextMenu = () => setMenuOption(menuOption + 1 > 3 ? 1 : menuOption + 1);

  const prevPokemon = () =>
    setSelectedIndex((selectedIndex - 1 + pokemonList.length) % pokemonList.length);
  const nextPokemon = () =>
    setSelectedIndex((selectedIndex + 1) % pokemonList.length);  

  return (
    <div id="cross">
      <div id="leftcross" className="gameboy-button">
        <div id="leftT"></div>
      </div>
      <div
        id="topcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.MENU) prevMenu();
          else if (screen === EPokedexScreen.POKEDEX) prevPokemon();
        }}
      >
        <div id="upT"></div>
      </div>
      <div id="rightcross" className="gameboy-button">
        <div id="rightT"></div>
      </div>
      <div id="midcross" className="gameboy-button">
        <div id="midCircle"></div>
      </div>
      <div
        id="botcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.MENU) nextMenu();
          else if (screen === EPokedexScreen.POKEDEX) nextPokemon();
        }}
      >
        <div id="downT"></div>
      </div>
    </div>
  )
}