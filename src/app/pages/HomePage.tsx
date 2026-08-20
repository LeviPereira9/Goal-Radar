import { useMe } from "@/features/auth/hooks/useMe";
import { useLogout } from "@/features/auth/hooks/useLogout";

export function HomePage(){
    const {data: user} = useMe();
    const logout = useLogout();

    return (
        <div>
            <h1>Goal Radar</h1>
            {user && (
                <p>Olá, {user.username} ({user.role})</p>
            )}
            <button onClick={() => logout.mutate()}>Sair</button>
        </div>
    )
}
