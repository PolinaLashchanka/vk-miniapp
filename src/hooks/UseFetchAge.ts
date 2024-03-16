import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function fetchAge(name: string, signal: AbortSignal) {
    return axios.get(`https://api.agify.io/?name=${name}`, {signal}).then((res) => res.data);
  }

export default function useFetchAge(userName: string) {
    return useQuery({
        queryKey: ["age", userName],
        queryFn: ({signal}) => fetchAge(userName, signal),
        enabled: false,
      });
}


  
