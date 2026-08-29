import { Link } from "react-router-dom";
import { useCompetitions } from "../../hooks/useCompetitions";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";
import { Card } from "@/shared/components/Card/Card";
import styles from "./CompetitionsListPage.module.css";
import { LoadingState } from "@/shared/components/LoadingState/LoadingState";
import { ErrorState } from "@/shared/components/ErrorState/ErrorState";

export function CompetitionsListPage(){
    const { data, isLoading, isError, refetch } = useCompetitions();

    if(isLoading){
        return <LoadingState label="Carregando competições..."/>
    }

    if(isError){
        return <ErrorState description="Não foi possível carregar as competições." onRetry={refetch} />
    }

    if(!data || data.codes.length === 0){
        return <div>Nenhuma competição disponível no momento.</div>
    }

    return (
        <div>
            <h1 className={styles.title} >Competições</h1>

            <div className={styles.list}>
                {data.codes.map((competition) => (
                    <Card key={competition.id} className={styles.item}>
                        <Link
                            className={styles.link}
                            to={`/competitions/${competition.code}`}
                        >
                            <span className={styles.name}>
                                {competition.name}
                                {!competition.active &&
                                    <span className={styles.inactiveTag} >Inativo</span>
                                }
                            </span>
                            <span className={styles.code}>{competition.code}</span>
                        </Link>
                        <FavoriteButton
                            codeId={competition.id} />
                    </Card>
                ))}
            </div>
        </div>
    )
}