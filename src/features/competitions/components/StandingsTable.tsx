import { useStandings } from "../hooks/useStandings";
import { TeamEmblem } from "./TeamEmblem/TeamEmblem";

interface StandingsTableProps {
    competitionId: number;
}

export function StandingsTable({competitionId}: StandingsTableProps){
    const {data, isLoading, isError} = useStandings(competitionId, true);

    if(isLoading) return <p>Caregar classificação...</p>
    if(isError || !data) return <p>Não foi possível carregar a classificação.</p>

    return(
        <table>
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
                        <td>
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
                        <td>{team.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}