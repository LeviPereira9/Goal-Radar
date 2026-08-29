import { StatePage } from "../components/StatePage/StatePage";

export function ForbiddenPage() {
  return (
    <StatePage
      code="403"
      title="Acesso negado"
      description="Você não tem permissão apra acessar esta página."
    />
  )
}

