import { Link } from "react-router-dom"
import { Card } from "@/shared/components/Card/Card"
import styles from "./AdminPage.module.css";

const SECTIONS = [
  {to: "/admin/roles", title: "Gerenciar Cargos", description: "Altere o cargo de usuários do sistema."},
  {to: "/admin/competitions", title: "Competições acompanhadas", description: "Ative, desativa ou adicione competições."},
  {to: "/admin/sync", title: "Sincronização", description: "Dispare a sincronização manual de dados."},
]

export function AdminPage() {
  return (
    <div>
      <h1 className={styles.title}>Painel administrativo</h1>

      <div className={styles.grid}>
        {SECTIONS.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className={styles.link}
            >
              <Card className={styles.card}>
                <h2 className={styles.cardTitle}>{section.title}</h2>
                <p className={styles.cardDescription} >{section.description}</p>
              </Card>
            </Link>

        ))}
      </div>
    </div>
    
  )
}
