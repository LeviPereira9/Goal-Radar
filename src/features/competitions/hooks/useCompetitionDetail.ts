import { useQuery } from "@tanstack/react-query";
import { competitionService } from "../services/competitionService";

export function useCompetitionDetail(code: string){
    return useQuery({
        queryKey: ["competitions", "detail", code],
        queryFn: () => competitionService.getByCode(code),
        enabled: !!code,
    })
}