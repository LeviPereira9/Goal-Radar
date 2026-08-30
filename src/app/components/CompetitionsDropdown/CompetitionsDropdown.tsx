import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCompetitions } from "@/features/competitions/hooks/useCompetitions";
import styles from "./CompetitionsDropdown.module.css";

interface CompetitionsDropdownProps {
    onNavigate?: () => void;
}

export function CompetitionsDropdown({onNavigate}:CompetitionsDropdownProps){
    const [isOpen, setIsOpen] = useState(false);
    const { data: competitions } = useCompetitions();
    const containerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpen(false);
        onNavigate?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    
    useEffect(() => {
        if(!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if(containerRef.current && !containerRef.current.contains(e.target as Node)){
                setIsOpen(false);
                onNavigate?.();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen, onNavigate])
    
    useEffect(() => {
        if(!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false)
                onNavigate?.();
            };
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onNavigate]);
    
    return (
        <div className={styles.container} ref={containerRef}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
            >
                Competições
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}>▾</span>
            </button>

            {isOpen && (
                <div className={styles.menu}>
                    {competitions?.codes.map((c) => (
                        <Link
                            key={c.id}
                            to={`/competitions/${c.code}`}
                            className={styles.menuItem}
                            onClick={()=>{
                                setIsOpen(false);
                                onNavigate?.();
                            }}
                        >{c.name}</Link>
                    ))}
                    <Link
                        to="/competitions"
                        className={styles.menuItemAll}
                        onClick={()=>{
                            setIsOpen(false);
                            onNavigate?.();
                        }}
                    >Ver todas</Link>
                </div>
            )}
            
        </div>
    )
}