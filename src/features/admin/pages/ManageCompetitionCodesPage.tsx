import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { codeSchema, type CodeFormData } from "../types/codeSchema";
import { useCompetitionCodes, useCreateCode, useDeactivateCode, useUpdateCode } from "../hooks/useCompetitionCode";
import { ApiErrorDisplay } from "@/shared/components/ApiErrorDisplay";

export function ManageCompetitionCodesPage(){
    const {data, isLoading} = useCompetitionCodes();
    const createCode = useCreateCode();
    const deactivateCode = useDeactivateCode();
    const updateCode = useUpdateCode();

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

    const handleDeactivate = (id: number, name: string) => {
        if(!window.confirm(`Remover o acompanhamento de "${name}"?`)) return;
        deactivateCode.mutate(id);
    }

    const handleReactivate = (id: number) => {
        updateCode.mutate(id);
    }
    
    return (
        <div>
            <h1>Competições acompanhadas</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="code">Código</label>
                    <input
                        type="text"
                        id="code"
                        {...register("code")}
                    />
                    {errors.code && <span>{errors.code.message}</span>}
                </div>

                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name")}
                    />
                    {errors.name && 
                        <span>{errors.name.message}</span>
                    }
                </div>

                {createCode.isError && (
                    <ApiErrorDisplay
                        error={createCode.error}
                        fallbackMessage="Não foi possível adicionara competição"
                    />
                )}

                <button
                    type="submit"
                    disabled={createCode.isPending}
                >
                    {createCode.isPending ? "Adicionando..." : "Adicionar"}
                </button>
            </form>

            {isLoading &&
                <p>Carregando...</p>
            }

            {data && (
                <ul>
                    {data.codes.map((competition) => (
                        <li key={competition.id}>
                            {competition.name} ({competition.code})
                            {!competition.active &&
                                <span> - Inativo</span>
                            }

                            {competition.active ? (
                                <button
                                    onClick={() => handleDeactivate(competition.id, competition.name)}
                                    disabled={deactivateCode.isPending}
                                >Desativar</button>
                            ): (
                                <button
                                    onClick={() => handleReactivate(competition.id)}
                                    disabled={deactivateCode.isPending}
                                >Reativar</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}