import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { codeSchema, type CodeFormData } from "../../types/codeSchema";
import { useCompetitionCodes, useCreateCode, useDeactivateCode, useUpdateCode } from "../../hooks/useCompetitionCode";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";
import styles from "./ManageCompetitionCodesPage.module.css";
import { Card } from "@/shared/components/Card/Card";
import { TextField } from "@/shared/components/TextField/TextField";
import { Button } from "@/shared/components/Button/Button";
import { Drawer } from "@/shared/components/Drawer/Drawer";
import type { CompetitionCode } from "../../types/code";
import { useState } from "react";
import { LoadingState } from "@/shared/components/LoadingState/LoadingState";

export function ManageCompetitionCodesPage(){
    const {data, isLoading} = useCompetitionCodes();
    const createCode = useCreateCode();
    const deactivateCode = useDeactivateCode();
    const reactivateCode = useUpdateCode();
    const [pendingDeactivation, setPendingDeactivation] = useState<CompetitionCode | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<CodeFormData>({
        resolver: zodResolver(codeSchema)
    });

    const onSubmit = (formData: CodeFormData) => {
        createCode.mutate(formData, {onSuccess: () => reset()});
    };

    const handleReactivate = (id: number) => {
        reactivateCode.mutate(id);
    }

    const confirmDeactivation = () => {
        if(!pendingDeactivation) return;

        deactivateCode.mutate(pendingDeactivation.id, {
            onSuccess: () => setPendingDeactivation(null),
        })
    }
    
    return (
        <div className={styles.wrapper} >
            <h1 className={styles.title}>Competições acompanhadas</h1>

            <Card className={styles.formCard}>
                <h2 className={styles.formTitle}>Adicionar competição</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <TextField
                        label="Código"
                        type="text"
                        {...register("code")}
                        error={errors.code?.message}
                    />

                    <TextField
                        label="Nome"
                        type="text"
                        {...register("name")}
                        error={errors.name?.message}
                    />
                    
                    {createCode.isError && (
                        <ApiErrorDisplay
                            error={createCode.error}
                            fallbackMessage="Não foi possível adicionara competição"
                        />
                    )}
                    <div className={styles.formButton}>
                        <Button
                            type="submit"
                            disabled={createCode.isPending}
                        >
                            {createCode.isPending ? "Adicionando..." : "Adicionar"}
                        </Button>
                    </div>
                </form>
            </Card>

            {isLoading &&
                <LoadingState/>
            }

            {data && (
                <div className={styles.list}>
                    {data.codes.map((competition) => (
                        <Card
                            key={competition.id}
                            className={styles.item}
                        >
                            <div>
                                <span className={styles.name}>
                                    {competition.name}
                                    {!competition.active &&
                                        <span className={styles.inactiveTag}>Inativo</span>
                                    }
                                </span>
                                <span className={styles.code} >{competition.code} </span>
                            </div>
                            
                            {competition.active ? (
                                <Button
                                    variant="danger"
                                    onClick={() => setPendingDeactivation(competition)}
                                    disabled={deactivateCode.isPending}
                                >Desativar</Button>
                            ): (
                                <Button
                                    variant="secondary"
                                    onClick={() => handleReactivate(competition.id)}
                                    disabled={deactivateCode.isPending}
                                >Reativar</Button>
                            )}
                        </Card>
                    ))}
                </div>
            )}

            <Drawer
                isOpen={!!pendingDeactivation}
                onClose={() => setPendingDeactivation(null)}
                title="Confirmar desativação"
            >
                <p>
                Tem certeza que deseja desativar o acompanhamento de <strong>{pendingDeactivation?.name}</strong>?
                </p>
                <div className={styles.confirmActions}>
                <Button variant="danger" onClick={confirmDeactivation} disabled={deactivateCode.isPending}>
                    {deactivateCode.isPending ? 'Desativando...' : 'Sim, desativar'}
                </Button>
                <Button variant="secondary" onClick={() => setPendingDeactivation(null)}>
                    Cancelar
                </Button>
                </div>
            </Drawer>
        </div>
    )
}