export interface CompetitionCode {
    id: number;
    code: string;
    name: string;
    active: boolean;
}

export interface CodeListResponse {
    codes: CompetitionCode[];
}