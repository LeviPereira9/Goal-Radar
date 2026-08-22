import { useMe } from "./useMe";
import { useUserDetails } from "@/features/users/hooks/useUserProfile";

export function useMyDetails(){
    const {data: currentUser} = useMe();
    return useUserDetails(currentUser?.username ?? "");
}