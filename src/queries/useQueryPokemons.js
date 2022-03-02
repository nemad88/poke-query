import { useQuery } from "react-query";
import { getPokemons } from "../api/api";

export const useQueryPokemons = (offset, limit) => {
  return useQuery(
    ["pokemons", offset],
    () => {
      return getPokemons(offset, limit).then((res) => {
        return res.data;
      });
    },
    { staleTime: Infinity }
  );
};
