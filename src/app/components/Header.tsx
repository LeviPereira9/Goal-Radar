import { Link } from "react-router-dom";
import { useMe } from "@/features/auth/hooks/useMe";
import { useMyDetails } from "@/features/auth/hooks/useMyDetails";
import { useLogout } from "@/features/auth/hooks/useLogout";

export function Header(){
    const {data: currentUser} = useMe();
    const {data: profile} = useMyDetails();
    const logout = useLogout();

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
            </nav>

            {profile && !profile.verified && (
                <p role="status" >
                    Sua conta ainda não foi verificada. <Link to="/verify-account">Verificar agora</Link>
                </p>
            )}
            
            {currentUser &&
                <button onClick={() => logout.mutate()} >Sair</button>
            }
            
        </header>
    )
}