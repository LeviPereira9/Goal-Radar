import { useQuery } from "@tanstack/react-query";
import { competitionService } from "../services/competitionService";

export function useStandings(competitionId: number, enabled: boolean){
    return useQuery({
        queryKey: ["competitions", "standings", competitionId],
        queryFn: () => competitionService.getStandings(competitionId),
        enabled: enabled && !!competitionId,
    })
}