import { useAverages } from "../hooks/useAverages";

interface AveragesTableProps {
    competitionId: number;
}

export function AveragesTable({competitionId}: AveragesTableProps){
    const {data, isLoading, isError } = useAverages(competitionId, true);

    if(isLoading) return <p>Carreganddo médias...</p>
    if(isError || !data) return <p>Não foi possível carregar as médias.</p>

    return (
        <table>
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
                        <td>{team.teamName}</td>
                        <td>{team.avgGoalsForHome / 100}</td>
                        <td>{team.avgGoalsAgainstHome / 100}</td>
                        <td>{team.avgGoalsForAway / 100}</td>
                        <td>{team.avgGoalsAgainstAway / 100}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    )
}