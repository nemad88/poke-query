import { useQueries } from "react-query";
import { getMoveDetails } from "../api/api";

export const useQueryMovesDetails = (movesUrls, enabled) => {
  //   return useQuery(
  //     ["moves", pokemonName],
  //     () => getMoves(movesUrl).then((res) => res.data),
  //     { staleTime: Infinity, enabled }
  //   );

  const results = useQueries(
    movesUrls.map((move) => {
      return {
        queryKey: ["move", move],
        queryFn: () => getMoveDetails(move).then((res) => res.data),
      };
    })
  );

  return results;
};
