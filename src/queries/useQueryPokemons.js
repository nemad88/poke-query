import { useQuery } from "react-query";
import { getPokemons } from "../api/api";

export const useQueryPokemons = () => {
  return useQuery("pokemons", getPokemons);
};
