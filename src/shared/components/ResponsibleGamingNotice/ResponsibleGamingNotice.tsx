import styles from "./ResponsibleGamingNotice.module.css";

export function ResponsibleGamingNotice(){
    return (
        <p className={styles.notice} role="note">
            Os dados exibidos aqui são estimativas estatísticas baseadas em resultados históricos e não constituem garantia de resultado. Se você aposta, jogue com responsabilidade.
        </p>
    )
}