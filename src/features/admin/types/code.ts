export interface CompetitionCode {
    id: number;
    code: string;
    name: string;
}

export interface CodeListResponse {
    codes: CompetitionCode[];
}