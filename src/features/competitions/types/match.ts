export interface Team {
    id: number;
    name: string;
    goals: number;
    emblem: string;
}

export interface MatchProbability {
    over05: number;
    over15: number;
    over25: number;
}

export interface Match {
    id: number;
    home: Team;
    away: Team;
    probability: MatchProbability;
    date: string;
}