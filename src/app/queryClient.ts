import { RateLimitError } from "@/shared/lib/http/errors";
import { showToast } from "@/shared/lib/notifications/toastBus";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

function handleGlobalError(error: unknown){
    if (error instanceof RateLimitError){
        showToast("Muitas requisições em pouco tempo. Aguarde um instante e tente novamente.", "error");
    }
}

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: handleGlobalError,
    }),
    mutationCache: new MutationCache({
        onError: handleGlobalError,
    })
});