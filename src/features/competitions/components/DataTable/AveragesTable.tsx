import { LoadingState } from "@/shared/components/LoadingState/LoadingState";
import { useAverages } from "../../hooks/useAverages";
import styles from "./DataTable.module.css";
import { ErrorState } from "@/shared/components/ErrorState/ErrorState";

interface AveragesTableProps {
    competitionId: number;
}

export function AveragesTable({competitionId}: AveragesTableProps){
    const {data, isLoading, isError } = useAverages(competitionId, true);

    if(isLoading) return <LoadingState label="Carreganddo médias..."/>
    
    if(isError || !data) return <ErrorState description="Não foi possível carregar as médias." />

    return (
        <table className={styles.table} >
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Média gols pró (casa)</th>
                    <th>Média gols sofridos (casa)</th>
                    <th>Média gols pró (fora)</th>
                    <th>Média gols sofridos (fora)</th>
                </tr>
            </thead>
            <tbody>
                {data.averages.map((team) => (
                    <tr key={team.teamName}>
                        <td className={styles.teamCell} >{team.teamName}</td>
                        <td className={styles.numCell} >{team.avgGoalsForHome / 100}</td>
                        <td className={styles.numCell}>{team.avgGoalsAgainstHome / 100}</td>
                        <td className={styles.numCell}>{team.avgGoalsForAway / 100}</td>
                        <td className={styles.numCell}>{team.avgGoalsAgainstAway / 100}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    )
}