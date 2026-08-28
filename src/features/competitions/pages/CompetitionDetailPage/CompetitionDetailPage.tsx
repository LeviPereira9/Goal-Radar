import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCompetitionDetail } from "../../hooks/useCompetitionDetail";
import { useMatches } from "../../hooks/useMatches";
import { MatchCard } from "../../components/MatchCard/MatchCard";
import { StandingsTable } from "../../components/DataTable/StandingsTable";
import { AveragesTable } from "../../components/DataTable/AveragesTable";
import { Drawer } from "@/shared/components/Drawer/Drawer";
import { ResponsibleGamingNotice } from "@/shared/components/ResponsibleGamingNotice/ResponsibleGamingNotice";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";
import { Button } from "@/shared/components/Button/Button";
import styles from "./CompetitionDetailPage.module.css";

export function CompetitionDetailPage(){
    const {code} = useParams<{code: string}>();
    const [matchdays, setMatchdays] = useState<Record<string, number>>({});
    const [openPanel, setOpenPanel] = useState<"standings" |"averages" | null>(null); 

    const {
        data: competition,
        isLoading: isLoadingCompetition
    } = useCompetitionDetail(code!);

    const matchday = matchdays[code!] ?? competition?.currentMatchDay ?? 1;
    
    const matchesQuery = useMatches(
        competition?.id ?? 0,
        matchday
    );

    if(isLoadingCompetition){
        return <div>Carregando competição...</div>
    }

    if(!competition){
        return <div>Competição não encontrada.</div>
    }

    const hasMatchesWithoutProbability = matchesQuery.data?.matches.some((m) => !m.probability);

    const handlePrevMatchday = () => {
        setMatchdays((prev) => ({
            ...prev,
            [code!]: Math.max(1, matchday - 1),
        }))
    }

    const handleNextMatchday = () => {
        setMatchdays((prev) => ({
            ...prev,
            [code!]: Math.min(competition.limitMatchDay, matchday + 1)
        }))
    }

    return (
        <div>
            <header className={styles.header} >
                <div>
                    <h1 className={styles.title}>{competition.name}</h1>
                    <span className={styles.code} >{competition.code.code}</span>
                </div>
                <FavoriteButton codeId={competition.code.id} />
            </header>
            
            <div className={styles.panelButtons} >
                <Button
                    variant="secondary"
                    onClick={()=> setOpenPanel("standings")}
                >Ver classificação</Button>
                <Button
                    variant="secondary"
                    onClick={()=> setOpenPanel("averages") }
                >Ver médias</Button>
            </div>

            <div className={styles.matchdayNav} >
                <Button
                    variant="ghost"
                    onClick={handlePrevMatchday}
                    disabled={matchday <= 1}
                >
                    Rodada Anterior
                </Button>
                <span className={styles.matchdayLabel} >Rodada {matchday}</span>

                <Button
                    variant="ghost"
                    onClick={handleNextMatchday}
                    disabled={matchday >= competition.limitMatchDay}
                >
                    Próxima rodada
                </Button>
            </div>

            {hasMatchesWithoutProbability && (
                <p role="note" className={styles.noProbabilityNotice}>
                    {matchday < 3
                    ? "Algumas partidas ainda não têm probabilidades calculadas, isso ocorre nas primeiras rodadas, enquanto  o sistema acumula dados suficentes da competição."
                    : "Algumas partidas ainda não têm probabilidades calculadas. Isso pode ocorrer quando dependem de partidas adiadas ou de resultados que ainda não foram atualizados."
                    }
                </p>
            ) }

            {matchesQuery.isLoading &&
                <p>Carregando partidas...</p>
            }

            {matchesQuery.data && (
                <div className={styles.matchesCard} >
                    <div>
                        {matchesQuery.data.matches.map((match) => (
                            <MatchCard
                                key={`${match.home.id}-${match.away.id}-${match.date}`}
                                match={match}
                            />
                        ))}
                    </div>
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