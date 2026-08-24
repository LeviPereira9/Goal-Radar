import { Link } from "react-router-dom";
import { useCompetitions } from "../hooks/useCompetitions";

export function CompetitionsListPage(){
    const { data, isLoading, isError } = useCompetitions();

    if(isLoading){
        return <div>Carregando competições...</div>
    }

    if(isError){
        return <div>Não foi possível carregar as competições.</div>
    }

    if(!data || data.codes.length === 0){
        return <div>Nenhuma competição disponível no momento.</div>
    }

    return (
        <div>
            <h1>Competições</h1>
            <ul>
                {data.codes.map((competition) => (
                    <li key={competition.id}>
                        <Link to={`/competitions/${competition.code}`}>
                        {competition.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}