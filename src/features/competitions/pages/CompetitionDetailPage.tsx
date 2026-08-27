import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCompetitionDetail } from "../hooks/useCompetitionDetail";
import { useMatches } from "../hooks/useMatches";
import { MatchCard } from "../components/MatchCard/MatchCard";
import { StandingsTable } from "../components/DataTable/StandingsTable";
import { AveragesTable } from "../components/DataTable/AveragesTable";
import { Drawer } from "@/shared/components/Drawer/Drawer";
import { ResponsibleGamingNotice } from "@/shared/components/ResponsibleGamingNotice";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";

export function CompetitionDetailPage(){
    const {code} = useParams<{code: string}>();
    const [matchday, setMatchday] = useState(1);
    const [openPanel, setOpenPanel] = useState<"standings" |"averages" | null>(null); 

    const {data: competition, isLoading: isLoadingCompetition} = useCompetitionDetail(code!);
    const matchesQuery = useMatches(competition?.id ?? 0, matchday);

    if(isLoadingCompetition){
        return <div>Carregando competição...</div>
    }

    if(!competition){
        return <div>Competição não encontrada.</div>
    }


    const hasMatchesWithoutProbability = matchesQuery.data?.matches.some((m) => !m.probability);

    return (
        <div>
            <h1>{competition.name}</h1>
            
            <FavoriteButton codeId={competition.code.id} />

            <div>
                <button onClick={()=> setOpenPanel("standings")} >Ver classificação</button>
                <button onClick={()=> setOpenPanel("averages") } >Ver médias</button>
            </div>

            <div>
                <button
                    onClick={() => setMatchday((d) => Math.max(1, d - 1))}
                    disabled={matchday <= 1}
                >
                    Rodada Anterior
                </button>
                <span>Rodada {matchday}</span>

                <button
                    onClick={() => setMatchday((d) => Math.min(competition.limitMatchDay, d + 1))}
                    disabled={matchday >= competition.limitMatchDay}
                >
                    Próxima rodada
                </button>
            </div>

            {matchesQuery.isLoading &&
                <p>Carregando partidas...</p>
            }

            { hasMatchesWithoutProbability && (
                <p role="note" >
                    Algumas partidas ainda não têm probabilidades calculadas, isso ocorre nas primeiras rodadas, enquanto  o sistema acumula dados suficentes da competição.
                </p>
            ) }

            {matchesQuery.data && (
                <div>
                    {matchesQuery.data.matches.map((match) => (
                        <MatchCard
                            key={`${match.home.id}-${match.away.id}-${match.date}`}
                            match={match}
                        />
                    ))}
                </div>
            )}

            <ResponsibleGamingNotice/>

            <Drawer
                title="Classificação"
                isOpen={openPanel === "standings"}
                onClose={() => setOpenPanel(null)}
            >
                <StandingsTable competitionId={competition.id}/>
            </Drawer>
            
            <Drawer
                title="Médias de gols"
                isOpen={openPanel === "averages"}
                onClose={()=> setOpenPanel(null)}
            >
                <AveragesTable competitionId={competition.id} />
            </Drawer>
        </div>
    )
}