import { getProbabilityInsight } from "../lib/probabilityInsight";

interface probabilityInsightProps {
    label: string;
    probability: number;
}

export function ProbabilityInsightDisplay({label, probability}: probabilityInsightProps){
    const insight = getProbabilityInsight(probability);
    const percentage = Math.round(probability * 100);

    return (
        <div data-level={insight.level}>
            <div>
                <span>{label} </span>
                <span>{percentage}%</span>
            </div>
            <p>{insight.label}</p>
            <p>{insight.description}</p>
        </div>
    )
}