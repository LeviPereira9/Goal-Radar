import { useQuery } from "@tanstack/react-query";
import { competitionService } from "../services/competitionService";

export function useAverages(competitionId: number, enabled: boolean){
    return useQuery({
        queryKey: ["competitions", "averages", competitionId],
        queryFn: () => competitionService.getAverages(competitionId),
        enabled: enabled && !!competitionId,
    })
}