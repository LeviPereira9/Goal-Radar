export interface CompetitionSummary {
    id: number;
    code: string;
    name: string;
}

export interface Competition {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
    currentMatchDay: number;
    limitMatchDay: number;
    lastFinishedMatchDay: number;
    count: number;
    startData: string;
    endDate: string;
}