import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQueryPokemons } from "./queries/useQueryPokemons";
import { BallTriangle } from "react-loader-spinner";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  height: 100vh;
`;

const PokemonList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Pokemons = () => {
  const limit = 20;
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pokemonNames, setPokemonNames] = useState([]);

  const { data, isLoading: pokemonsIsLoading } = useQueryPokemons(
    offset,
    limit
  );

  useEffect(() => {
    if (data && !pokemonsIsLoading) {
      setPage(data.count / limit + 1);
      const pokemonNames = data.results.map((pokemon) => pokemon.name);
      setPokemonNames(pokemonNames);
    }
  }, [data, pokemonsIsLoading]);

  if (pokemonsIsLoading) {
    return <BallTriangle heigth="50" width="50" color="white" />;
  }

  return (
    <Wrapper>
      <PokemonList>
        {pokemonNames.map((pokemonName) => {
          return <PokemonCard key={pokemonName} pokemonName={pokemonName} />;
        })}
      </PokemonList>
      <Pagination page={page} setOffset={setOffset} limit={limit} />
    </Wrapper>
  );
};

export default Pokemons;
