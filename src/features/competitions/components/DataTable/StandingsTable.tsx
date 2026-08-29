import { LoadingState } from "@/shared/components/LoadingState/LoadingState";
import { useStandings } from "../../hooks/useStandings";
import { TeamEmblem } from "../TeamEmblem/TeamEmblem";
import styles from "./DataTable.module.css";
import { ErrorState } from "@/shared/components/ErrorState/ErrorState";

interface StandingsTableProps {
    competitionId: number;
}

export function StandingsTable({competitionId}: StandingsTableProps){
    const {data, isLoading, isError} = useStandings(competitionId, true);

    if(isLoading) return <LoadingState label="Caregar classificação..."/>
    if(isError || !data) return <ErrorState description="Não foi possível carregar a classificação." />

    return(
        <table className={styles.table} >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Time</th>
                    <th>PJ</th>
                    <th>V</th>
                    <th>E</th>
                    <th>D</th>
                    <th>SG</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
                {data.standings.map((team) => (
                    <tr key={team.teamId}>
                        <td>{team.position}</td>
                        <td className={styles.teamCell} >
                            <TeamEmblem
                                src={team.emblem}
                                teamName={team.teamShortName}
                            />
                            {team.teamShortName}
                        </td>
                        <td>{team.playedGames}</td>
                        <td>{team.won}</td>
                        <td>{team.draw}</td>
                        <td>{team.lost}</td>
                        <td>{team.goalDifference}</td>
                        <td className={styles.pointsCell}>{team.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}