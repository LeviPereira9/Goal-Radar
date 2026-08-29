import { useState } from "react";
import { useCompetitionCodes } from "../../hooks/useCompetitionCode";
import { useStartAllSyncs, useStartSync } from "../../hooks/useSync";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import styles from "./SyncPage.module.css";
import { Card } from "@/shared/components/Card/Card";
import { Button } from "@/shared/components/Button/Button";
import { StatusMessage } from "@/shared/components/StatusMessage/StatusMessage";

export function SyncPage(){
    const {data} = useCompetitionCodes();
    const startAllSyncs = useStartAllSyncs();
    const startSync = useStartSync();
    const [syncingCode, setSyncingCode] = useState<number | null>(null);

    const handleSyncOne = (codeId: number) => {
        setSyncingCode(codeId);
        startSync.mutate(codeId, {
            onSettled: () => setSyncingCode(null)
        });
    };

    return (
        <div className={styles.wrapper} >
            <h1 className={styles.title}>Sincronização</h1>

            <Card className={styles.card}>
                <h2 className={styles.cardTitle}>Sincronizar tudo</h2>
                <p className={styles.cardDescription}>Dispara a sincronização de todas as competições acompanhadas.</p>

                <div className={styles.cardButton}>
                    <Button
                        onClick={() => startAllSyncs.mutate()}
                        isLoading={startAllSyncs.isPending}
                    >
                        {startAllSyncs.isPending ? "Sincronizando..." : "Sincronizar todas as competições"}
                    </Button>
                </div>
                {startAllSyncs.isSuccess &&
                    <StatusMessage type="success" >Sincronização geral disparada com sucesso.</StatusMessage>
                }
                {startAllSyncs.isError && (
                    <ApiErrorDisplay
                        error={startAllSyncs.error}
                        fallbackMessage="Não foi possível disparar a sincronização."
                    />
                )}
            </Card>

            <h2 className={styles.sectionTitle} >Sincronizar individualmente</h2>

            {data && (
                <div className={styles.list}>
                    {data.codes.map((competition) => (
                        <Card
                            className={styles.item}
                            key={competition.id}
                        >
                            <span className={styles.name}>{competition.name}
                                {!competition.active &&
                                    <span className={styles.inactiveTag}>Inativo</span>
                                }
                            </span>
                            <Button
                                variant="secondary"
                                onClick={() => handleSyncOne(competition.id)}
                                isLoading={startSync.isPending && syncingCode === competition.id}
                            >
                                {startSync.isPending && syncingCode === competition.id ? "Sincronizando..." : "Sincronizar"}
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}