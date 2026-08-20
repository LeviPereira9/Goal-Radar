import { queryClient } from "./queryClient";
import { registerUnauthorizedHandler } from "@/shared/lib/http/client";
import { AUTH_ME_QUERY_KEY } from "@/features/auth/hooks/useMe";

registerUnauthorizedHandler(()=>{
    queryClient.setQueryData(AUTH_ME_QUERY_KEY, null);
})