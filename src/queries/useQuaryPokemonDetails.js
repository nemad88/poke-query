import { useQuery } from "react-query";
import { getPokemonDetails } from "../api/api";

export const useQuaryPokemonDetails = (pokemonName, select) => {
  return useQuery(
    ["pokemon", pokemonName],
    () => {
      return getPokemonDetails(pokemonName).then(async (res) => {
        console.log("fetch");
        //Synt loading time
        // await new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     resolve("foo");
        //   }, 100);
        // });
        return res.data;
      });
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      select,
    }
  );
};
