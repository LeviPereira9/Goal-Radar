import type { Match } from "../types/match";
import { ProbabilityInsightDisplay } from "./ProbabilityInsight";
import { TeamEmblem } from "./TeamEmblem";

interface MatchCardProps{
    match: Match;
}

export function MatchCard({match}: MatchCardProps){

    return (
        <div>
            <div>
                <TeamEmblem
                    src={match.home.emblem}
                    teamName={match.home.name}
                />
                <span>{match.home.name}</span>
                <span> vs </span>
                <span>{match.away.name}</span>
                <TeamEmblem
                    src={match.away.emblem}
                    teamName={match.away.name}
                />
            </div>
            <p>{new Date(match.date).toLocaleString("pt-BR")}</p>

            {match.probability && 
                <>
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
                </>
            }
        </div>
    )
}