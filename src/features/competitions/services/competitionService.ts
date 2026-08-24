import { httpClient } from "@/shared/lib/http/client";
import type { Competition, CompetitionSummary } from "../types/competition";

interface CompetitionListResponse {
    codes: CompetitionSummary[];
}

export const competitionService = {
    getAll: () =>
        httpClient.get<CompetitionListResponse>("/api/v1/competition/code"),

    getByCode: (code: string) =>
        httpClient.get<Competition>(`/api/v1/competition/${code}`),
}