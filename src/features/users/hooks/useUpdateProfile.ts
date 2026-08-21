import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/shared/lib/http/client";
import type { ProfileFormData } from "../types/profileSchema";
import type { UserProfile } from "../types/user";

function updateProfile(username: string, data: ProfileFormData){
    return httpClient.put<UserProfile>(`/api/v1/user/${username}`,data);
}

export function useUpdateProfile(username: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ProfileFormData) => updateProfile(username, data),
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData(["users", "details", username], updatedProfile)
        }
    })
}