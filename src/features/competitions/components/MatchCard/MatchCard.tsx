import type { Match } from "../../types/match";
import { ProbabilityInsightDisplay } from "../ProbabilityInsight/ProbabilityInsight";
import { TeamEmblem } from "../TeamEmblem/TeamEmblem";
import { Card } from "@/shared/components/Card/Card";
import styles from "./MatchCard.module.css";

interface MatchCardProps{
    match: Match;
}

export function MatchCard({match}: MatchCardProps){

    return (
        <Card className={styles.card}>
            <div className={styles.teams}>
                <div className={styles.team}>
                    <TeamEmblem
                        src={match.home.emblem}
                        teamName={match.home.name}
                    />
                    <span>{match.home.name}</span>
                </div>
                <span className={styles.vs}> x </span>
                <div className={`${styles.team} ${styles.teamAway}`}>
                    <span>{match.away.name}</span>
                    <TeamEmblem
                        src={match.away.emblem}
                        teamName={match.away.name}
                    />
                </div>
            </div>

            <p className={styles.date}>{new Date(match.date).toLocaleString("pt-BR")}</p>

            {match.probability ? 
                (<div className={styles.probabilities}>
                    <ProbabilityInsightDisplay
                        label="Mais de 0.5 gols"
                        probability={match.probability.over05}
                    />
                    <ProbabilityInsightDisplay
                        label="Mais de 1.5 gols"
                        probability={match.probability.over15}
                    />
                    <ProbabilityInsightDisplay
                        label="Mais de 2.5 gols"
                        probability={match.probability.over25}
                    />
                </div>)
                :(
                    <p className={styles.noData}>Probabilidades ainda não disponíveis para esta partida</p>
                )
            }
        </Card>
    )
}