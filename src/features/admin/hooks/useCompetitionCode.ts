import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/adminService";
import type { CodeFormData } from "../types/codeSchema";

const CODES_QUERY_KEY = ["admin", "codes"] as const;

export function useCompetitionCodes(){
    return useQuery({
        queryKey: CODES_QUERY_KEY,
        queryFn: adminService.getAllCodes
    })
}

export function useCreateCode(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CodeFormData) => adminService.createCode(data.code, data.name),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: CODES_QUERY_KEY
            },)
        }
    })
}

export function useDeleteCode(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (competitionId: number) => adminService.deleteCode(competitionId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: CODES_QUERY_KEY});
        }
    })
}