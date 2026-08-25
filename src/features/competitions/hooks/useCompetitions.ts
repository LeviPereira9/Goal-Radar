import { useQuery } from "@tanstack/react-query";
import { competitionService } from "../services/competitionService";
import { COMPETITION_CODES_QUERY_KEY } from "@/shared/lib/queryKeys";

export function useCompetitions(){
    return useQuery({
        queryKey: COMPETITION_CODES_QUERY_KEY,
        queryFn: competitionService.getAll,
        staleTime: 5 * 60 * 1000, // 5 min
    })
}