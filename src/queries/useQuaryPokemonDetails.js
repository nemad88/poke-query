import { useQuery } from "react-query";
import { getPokemonDetails } from "../api/api";

export const useQuaryPokemonDetails = (pokemonName) => {
  return useQuery(["pokemon", pokemonName], () =>
    getPokemonDetails(pokemonName).then(async (res) => {
      // Synt loading time
      // await new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve("foo");
      //   }, 3000);
      // });
      return res.data;
    })
  );
};
