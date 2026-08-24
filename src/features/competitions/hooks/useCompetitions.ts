import { useQuery } from "@tanstack/react-query";
import { competitionService } from "../services/competitionService";

export function useCompetitions(){
    return useQuery({
        queryKey: ["competitions", "list"],
        queryFn: competitionService.getAll,
        staleTime: 5 * 60 * 1000, // 5 min
    })
}