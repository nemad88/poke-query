import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Pokemons from "./Pokemons";
import PokemonDetails from "./PokemonDetails";
import styled from "styled-components";

const MenuItem = styled(Link)`
  margin: 16px;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

const NavBar = styled.nav`
  border-bottom: solid 1px;
  padding-bottom: 1rem;
`;

const App = () => {
  const getNav = () => {
    return (
      <>
        <NavBar>
          <MenuItem to="/pokemons">Pokemons</MenuItem>
          <MenuItem to="/berries">Berries</MenuItem>
        </NavBar>
        <Outlet />
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={getNav()}>
          <Route path="pokemons" element={<Pokemons />}></Route>
          <Route path="pokemon/:pokemonId" element={<PokemonDetails />} />
          <Route path="berries" element={<div>Berries</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
