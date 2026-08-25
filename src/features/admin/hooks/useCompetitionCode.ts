import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/adminService";
import type { CodeFormData } from "../types/codeSchema";
import { COMPETITION_CODES_QUERY_KEY } from "@/shared/lib/queryKeys";


export function useCompetitionCodes(){
    return useQuery({
        queryKey: COMPETITION_CODES_QUERY_KEY,
        queryFn: adminService.getAllCodes
    })
}

export function useCreateCode(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CodeFormData) => adminService.createCode(data.code, data.name),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: COMPETITION_CODES_QUERY_KEY
            },)
        }
    })
}

export function useDeactivateCode(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (competitionId: number) => adminService.deactivateCode(competitionId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: COMPETITION_CODES_QUERY_KEY});
        }
    })
}

export function useUpdateCode(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (competitionId: number) =>
        adminService.reactivateCode(competitionId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: COMPETITION_CODES_QUERY_KEY
            })
        }
    })
}