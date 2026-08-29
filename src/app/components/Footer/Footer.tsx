import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export function Footer(){
    const year = new Date().getFullYear();

    return(
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <span className={styles.logo}>Goal Radar</span>
                    <p className={styles.tagline}>
                        Dados estatísticos de futebol, sem enfeite.
                    </p>
                </div>

                <nav className={styles.links}>
                    <Link to="/competitions">Competições</Link>
                    <Link to="/favorites">Favoritos</Link>
                    <Link to="/serach">Buscar usuários</Link>
                </nav>
            </div>

            <div className={styles.bottom}>
                <p>© {year} Goal Radar. Todos os direitos reservados. </p>
                <p className={styles.disclaimer}>
                    Os dados exibidos são estimativas estatísticas e não consistem garantia de resultado. Se você aposta, jogue com responsabilidade.    
                </p>
            </div>
            
        </footer>
    )
}