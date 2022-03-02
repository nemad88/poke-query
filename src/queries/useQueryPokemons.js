import { useQuery } from "react-query";
import { getPokemons } from "../api/api";

export const useQueryPokemons = (offset, limit) => {
  return useQuery("pokemons", () =>
    getPokemons(offset, limit).then((res) => res.data)
  );
};
