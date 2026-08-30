import { Link, NavLink } from "react-router-dom";
import { useMe } from "@/features/auth/hooks/useMe";
import { useMyDetails } from "@/features/auth/hooks/useMyDetails";
import { useLogout } from "@/features/auth/hooks/useLogout";
import styles from "./Header.module.css";
import { hasMinimumRole } from "@/shared/lib/rbac";
import { Role } from "@/shared/types";
import { Button } from "@/shared/components/Button/Button";
import { UserAvatar } from "@/shared/components/UserAvatar/UserAvatar";
import { CompetitionsDropdown } from "../CompetitionsDropdown/CompetitionsDropdown";
import { useState } from "react";

export function Header(){
    const {data: currentUser} = useMe();
    const {data: profile} = useMyDetails();
    const logout = useLogout();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isMod = !!currentUser && hasMinimumRole(currentUser.role, Role.MOD);

    const closeMenu = () => setIsMenuOpen(false);

    

    return (
        <>
            <header className={styles.header} >
                <div className={styles.inner}>
                    <Link 
                        to="/"
                        className={styles.logo}
                    >
                        Goal Radar
                    </Link>

                    {/* Desktop menu */}
                    <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
                        {/* Menu de competiçoes */}
                        <CompetitionsDropdown
                            onNavigate={closeMenu}
                        />

                        <NavLink
                            onClick={closeMenu}
                            to={"/search"}
                            className={({isActive}) => (isActive ? styles.active : undefined)}
                        >Buscar</NavLink>
                        <NavLink 
                            onClick={closeMenu}
                            to={"/favorites"}
                            className={({isActive}) => (isActive ? styles.active : undefined)}
                        >Favoritos</NavLink>
                        {isMod && (
                            <NavLink 
                                onClick={closeMenu}
                                to={"/admin"}
                                className={({isActive}) => (isActive ? styles.active : undefined)}
                            >Admin</NavLink>
                        )}
                    </nav>
                    
                    <div className={styles.userArea} >
                        {currentUser && (
                            <>
                                <Link
                                    onClick={closeMenu}
                                    to={`/users/${currentUser.username}`}
                                    className={styles.userLink}
                                >
                                    <UserAvatar
                                        src={profile?.profilePicture}
                                        username={currentUser.username}
                                        size="sm"
                                    />
                                    <span className={styles.username}>{currentUser.username}</span>
                                </Link>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        closeMenu();
                                        logout.mutate();
                                    }}
                                >
                                    Sair
                                </Button>
                            </>
                        )}
                    </div>

                    <div className={styles.mobile}>
                        {currentUser && (
                            <div className={styles.mobileUserArea}>
                                <Link
                                    to={`/users/${currentUser.username}`}
                                    className={styles.userLink}
                                    onClick={closeMenu}
                                >
                                    <UserAvatar
                                        src={profile?.profilePicture}
                                        username={currentUser.username}
                                        size="sm"
                                    />
                                    <span>{currentUser.username}</span>
                                </Link>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        closeMenu();
                                        logout.mutate();
                                    }}
                                >
                                    Sair
                                </Button>
                            </div>
                        )}
                        <button
                            className={styles.menuToggle}
                            onClick={() => setIsMenuOpen((v) => !v)}
                            aria-expanded={isMenuOpen}
                            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                        >
                            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen1 : ''}`} />
                            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen2 : ''}`} />
                            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpen3 : ''}`} />
                        </button>
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