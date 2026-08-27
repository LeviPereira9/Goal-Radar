import { getProbabilityInsight } from "../../lib/probabilityInsight";
import styles from "./ProbabilityInsight.module.css";

interface probabilityInsightProps {
    label: string;
    probability: number;
}

export function ProbabilityInsightDisplay({label, probability}: probabilityInsightProps){
    const insight = getProbabilityInsight(probability);
    const percentage = Math.round(probability * 100);

    return (
        <div
            data-level={insight.level}
            className={styles.wrapper}
        >
            <div className={styles.header}>
                <span className={styles.label} >{label} </span>
                <span className={styles.percentage} >{percentage}%</span>
            </div>
            <div className={styles.bar}>
                <div className={styles.barFill} style={{width: `${percentage}%`}} />
            </div>
            <p className={styles.insightLabel} >{insight.label}</p>
            <p className={styles.description}>{insight.description}</p>
        </div>
    )
}