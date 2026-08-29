import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCompetitions } from "@/features/competitions/hooks/useCompetitions";
import styles from "./CompetitionsDropdown.module.css";

export function CompetitionsDropdown(){
    const [isOpen, setIsOpen] = useState(false);
    const { data: competitions } = useCompetitions();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if(containerRef.current && !containerRef.current.contains(e.target as Node)){
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])
    
    useEffect(() => {
        if(!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);
    
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
                            onClick={()=>setIsOpen(false)}
                        >{c.name}</Link>
                    ))}
                    <Link
                        to="/competitions"
                        className={styles.menuItemAll}
                        onClick={() => setIsOpen(false)}
                    >Ver todas</Link>
                </div>
            )}
            
        </div>
    )
}