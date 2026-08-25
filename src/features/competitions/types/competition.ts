export interface CompetitionCode {
    id: number;
    code: string;
    name: string;
    active: boolean;
}

export type CompetitionSummary = CompetitionCode

export interface Competition {
    id: number;
    name: string;
    code: CompetitionCode;
    type: string;
    emblem: string;
    currentMatchDay: number;
    limitMatchDay: number;
    lastFinishedMatchDay: number;
    count: number;
    startData: string;
    endDate: string;
}