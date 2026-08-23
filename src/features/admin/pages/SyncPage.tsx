import { useState } from "react";
import { useCompetitionCodes } from "../hooks/useCompetitionCode";
import { useStartAllSyncs, useStartSync } from "../hooks/useSync";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";

export function SyncPage(){
    const {data} = useCompetitionCodes();
    const startAllSyncs = useStartAllSyncs();
    const startSync = useStartSync();
    const [syncingCode, setSyncingCode] = useState<string | null>(null);

    const handleSyncOne = (code: string) => {
        setSyncingCode(code);
        startSync.mutate(code, {
            onSettled: () => setSyncingCode(null)
        });
    };

    return (
        <div>
            <h1>Sincronização</h1>

            <button
                onClick={() => startAllSyncs.mutate()}
                disabled={startAllSyncs.isPending}
            >
                {startAllSyncs.isPending ? "Sincronizando..." : "Sincronizar todas as competições"}
            </button>
            {startAllSyncs.isSuccess &&
                <p role="status">Sincronização geral disparada com sucesso.</p>
            }
            {startAllSyncs.isError && (
                <ApiErrorDisplay
                    error={startAllSyncs.error}
                    fallbackMessage="Não foi possível disparar a sincronização."
                />
            )}

            <h2>Sincronizar individualmente</h2>
            {data && (
                <ul>
                    {data.codes.map((competition) => (
                        <li key={competition.id}>
                            {competition.name}
                            <button
                                onClick={() => handleSyncOne(competition.code)}
                                disabled={startSync.isPending && syncingCode === competition.code}
                            >
                                {startSync.isPending && syncingCode === competition.code ? "Sincronizando..." : "Sincronizar"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}