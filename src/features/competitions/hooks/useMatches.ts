import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { competitionService } from "../services/competitionService";

export function useMatches(competitionId: number, matchday: number){
    return useQuery({
        queryKey: ["competitions", "matches", competitionId, matchday],
        queryFn: () => competitionService.getMatches(competitionId, matchday),
        enabled: !!competitionId,
        placeholderData: keepPreviousData,
    })
}