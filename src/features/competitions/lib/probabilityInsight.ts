export type IncidenceLevel = "low" | "moderate" | "high" | "very-high";

export interface ProbabilityInsight {
    level: IncidenceLevel;
    label: string;
    description: string;
}

const THRESHOLDS: {
    max: number;
    level: IncidenceLevel;
    label: string;
    description: string;
}[] = [
    {
        max: 0.33,
        level: "low",
        label: "Baixa incidência",
        description: "Ocorreu em menos de 1 a cada 3 partidas com perfil semelhante.",
    },
    {
        max: 0.59,
        level: "moderate",
        label: "Incidência moderada",
        description: "Ocorreu em cerca de 1 a cada 2 partidas com perfil semelhante.",
    },
    {
        max: 0.79,
        level: "high",
        label: "Alta incidência",
        description: "Ocorreu na maioria das partidas com perfil semelhante.",
    },
    {
        max: 1,
        level: "very-high",
        label: "Incidência muito alta",
        description: "Ocorreu na grande maioria das partidas com perfil semelhante."
    },
];

export function getProbabilityInsight(probability: number): ProbabilityInsight {
    const match = THRESHOLDS.find((t) => probability <= t.max) ?? THRESHOLDS[THRESHOLDS.length - 1];

    return {
        level: match.level,
        label: match.label,
        description: match.description
    }
}