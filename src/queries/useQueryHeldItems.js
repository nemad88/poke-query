import { useQuery } from "react-query";
import { getItem } from "../api/api";

export const useQueryHeldItems = (itemName) => {
  return useQuery(
    ["items", itemName],
    () => getItem(itemName).then((res) => res.data),
    { staleTime: Infinity }
  );
};
