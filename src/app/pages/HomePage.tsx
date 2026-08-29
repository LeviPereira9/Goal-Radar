import { Link } from "react-router-dom"; 
import { Button } from "@/shared/components/Button/Button";
import { Card } from "@/shared/components/Card/Card";
import styles from "./HomePage.module.css";

export function HomePage(){
    return (
        <div>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>
                    Entenda os números por trás de cada partida
                </h1>
                <p className={styles.heroSubtitle}>
                    O Goal Radar traduz histórico de gols de cada campeonato em estimativas simples de entender, sem enfeite, sem promessa de resultado.
                </p>
                <Link to="/competitions">
                    <Button>Ver competições</Button>
                </Link>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Como funciona</h2>
                <div className={styles.grid}>
                    <Card className={styles.card}>
                        <h3 className={styles.cardTitle} >Baseado em histórico real</h3>
                        <p className={styles.cardText}>
                            As estimativas vêm do desempenho recente dos times naquele campeonato, quantos gols marcam, quantos sofrem, em casa e fora.
                        </p>
                    </Card>

                    <Card className={styles.card}>
                        <h3 className={styles.cardTitle} >Contexto por campeonato</h3>
                        <p className={styles.cardText}>
                            Um time pode ir bem no Brasileirão e mal numa copa nacional, ou vice-versa. Por isso, nunca misturamos o desempenho de um campeonato com o de outro, cada competição é analisada de forma isolada.
                        </p>
                    </Card>

                    <Card className={styles.card}>
                        <h3 className={styles.cardTitle} >Estimativa, não garantia</h3>
                        <p className={styles.cardText}>
                            Os números mostram um padrão histórico, não uma previsão certeira. Fatores como lesões, escalação e motivação do time não entram na conta.
                        </p>
                    </Card>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Por que separamos por campeonato? </h2>
                <p className={styles.text}>
                    Times costumam jogar mais de uma competição ao mesmo tempo e nem sempre com o mesmo empenho. Um time pode escalar reservar numa copa e o time principal no campeoanto nacional, por exemplo. Se juntássemos esses dados, a estimativa ficaria distorcida. Por isso, o Goal Radar sempre olha para o histórico de gols dentro do próprio campeonato analisado, e só passa a calcular a partir do momento em que já existem partidas suficientes para um número minimamente confiável.
                </p>
            </section>

            <section className={styles.ctaSection}>
                <h2 className={styles.ctaTitle}>Pronto para explorar?</h2>
                <Link to="/competitions">
                    <Button>Ver competições acompanhadas</Button>
                </Link>
            </section>
            
        </div>
    )
}
