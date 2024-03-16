import { useQuery } from "@tanstack/react-query";

function fetchCatFact(signal: AbortSignal) {
  return fetch("https://catfact.ninja/fact", {signal}).then((res) => res.json());
}

export default function useFetchCatFact() {
  return useQuery({
    queryKey: ["catFact"],
    queryFn: ({signal}) => fetchCatFact(signal),
    enabled: false,
  });
}
