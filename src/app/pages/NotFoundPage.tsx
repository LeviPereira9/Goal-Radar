import { StatePage } from "../components/StatePage/StatePage";

export function NotFoundPage() {
  return (
    <StatePage
      code="404"
      title="Página não encontrada"
      description="A página que você procura não existe ou foi movida."
    />
  )
}
