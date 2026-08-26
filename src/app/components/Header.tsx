import { Link, NavLink } from "react-router-dom";
import { useMe } from "@/features/auth/hooks/useMe";
import { useMyDetails } from "@/features/auth/hooks/useMyDetails";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useCompetitions } from "@/features/competitions/hooks/useCompetitions";
import styles from "./Header.module.css";
import { hasMinimumRole } from "@/shared/lib/rbac";
import { Role } from "@/shared/types";
import { Button } from "@/shared/components/Button/Button";

export function Header(){
    const {data: currentUser} = useMe();
    const {data: profile} = useMyDetails();
    const {data: competitions} = useCompetitions();
    const logout = useLogout();

    const isMod = !!currentUser && hasMinimumRole(currentUser.role, Role.MOD);


    return (
        <>
            <header className={styles.header} >
                <div className={styles.inner}>
                    <Link 
                        to="/"
                        className={styles.logo}
                    >Goal Radar</Link>
                    <nav className={styles.nav}>
                        <details className={styles.dropdown}>
                            <summary>Competições</summary>
                            <div className={styles.dropdownMenu}>
                                {competitions?.codes.map((c) => (
                                    <Link
                                        key={c.id}
                                        to={`/competitions/${c.code}`}
                                    >{c.name}</Link>
                                ))}
                                <Link
                                    to={"/competitions"}
                                    className={styles.dropdownAll}
                                >Ver todas</Link>
                            </div>
                        </details>

                        <NavLink
                            to={"/search"}
                            className={({isActive}) => (isActive ? styles.active : undefined)}
                        >Buscar</NavLink>
                        <NavLink 
                            to={"/favorites"}
                            className={({isActive}) => (isActive ? styles.active : undefined)}
                        >Favoritos</NavLink>
                        {isMod && (
                            <NavLink 
                                to={"/admin"}
                                className={({isActive}) => (isActive ? styles.active : undefined)}
                            >Admin</NavLink>
                        )}
                    </nav>

                    <div className={styles.userArea} >
                        {currentUser && (
                            <>
                                <Link
                                    to={`/users/${currentUser.username}`}
                                    className={styles.username}
                                >{currentUser.username}</Link>
                                <Button
                                    variant="ghost"
                                    onClick={() => logout.mutate()}
                                >
                                    Sair
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {profile && !profile.verified && (
                <div className={styles.verifyBanner} >
                    Sua conta ainda não foi verificada. <Link to={"/verify-account"}>Verificar agora</Link>
                </div>
            )}
            
        </>
    )
}