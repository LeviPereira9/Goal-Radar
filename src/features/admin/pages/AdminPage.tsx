import { Link } from "react-router-dom"

export function AdminPage() {
  return (
    <div>
      <h1>Painel administrativo</h1>

      <ul>
        <li><Link to="/admin/roles">Gerenciar cargos</Link></li>
        <li><Link to="/admin/competitions">Competições acompanhadas</Link></li>
        <li><Link to="/admin/sync">Sincronização</Link></li>
      </ul>
    </div>
    
  )
}
