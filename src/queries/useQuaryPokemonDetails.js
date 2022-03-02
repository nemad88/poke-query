import { useQuery } from "react-query";
import { getPokemonDetails } from "../api/api";

export const useQuaryPokemonDetails = (pokemonName) => {
  return useQuery(["pokemon", pokemonName], () =>
    getPokemonDetails(pokemonName)
  );
};
