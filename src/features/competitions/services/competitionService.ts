import { httpClient } from "@/shared/lib/http/client";
import type { Competition, CompetitionSummary } from "../types/competition";
import type { Match } from "../types/match";
import type { TeamPosition } from "../types/standings";
import type { TeamAverage } from "../types/average";

interface CompetitionListResponse {
    codes: CompetitionSummary[];
}

interface MatchesResponse {
    matches: Match[];
}

interface StandingsResponse {
    standings: TeamPosition[];
}

interface AveragesResponse{
    averages: TeamAverage[];
}

export const competitionService = {
    getAll: () =>
        httpClient.get<CompetitionListResponse>("/api/v1/competition/code"),

    getByCode: (code: string) =>
        httpClient.get<Competition>(`/api/v1/competition/${code}`),

    getMatches: (competitionId: number, matchday: number) =>
        httpClient.get<MatchesResponse>(`/api/v1/competition/${competitionId}/matches?matchday=${matchday}`),

    getStandings: (competitionId: number) =>
        httpClient.get<StandingsResponse>(`/api/v1/competition/${competitionId}/standings`),

    getAverages: (competitionId: number) =>
        httpClient.get<AveragesResponse>(`/api/v1/competition/${competitionId}/averages`),
}