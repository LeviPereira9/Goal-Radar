import { Link } from "react-router-dom";
import { useMe } from "@/features/auth/hooks/useMe";
import { useMyDetails } from "@/features/auth/hooks/useMyDetails";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useCompetitions } from "@/features/competitions/hooks/useCompetitions";

export function Header(){
    const {data: currentUser} = useMe();
    const {data: profile} = useMyDetails();
    const logout = useLogout();
    const {data: competitions} = useCompetitions();

    return (
        <header>
            <nav>
                <Link to="/">Goal Radar</Link>

                {currentUser && 
                    <Link
                        to={`/users/${currentUser.username}`}
                    >
                    Meu perfil
                    </Link>
                }
                <Link to="/search" >Buscar usuários</Link>
                <Link to="/competitions">Competições</Link>
            </nav>

            {profile && !profile.verified && (
                <p role="status" >
                    Sua conta ainda não foi verificada. <Link to="/verify-account">Verificar agora</Link>
                </p>
            )}
            
            {currentUser &&
                <button onClick={() => logout.mutate()} >Sair</button>
            }
            
            {competitions && (
                <details>
                    <summary>Competições</summary>
                    <ul>
                        {competitions.codes.map((c) => (
                            <li key={c.id}>
                                <Link to={`/competitions/${c.code}`}>{c.code}</Link>
                            </li>
                        ))}
                    </ul>
                </details>
            )}
            
        </header>
    )
}