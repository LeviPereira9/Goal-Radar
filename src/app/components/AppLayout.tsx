import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import styles from "./AppLayout.module.css";
import { FavoritesBar } from "./FavoritesBar/FavoritesBar";
import { Footer } from "./Footer/Footer";

export function AppLayout(){
    return(
        <div className={styles.shell}>
            <Header/>
            <FavoritesBar/>
            <main className={styles.main} >
                <div className={styles.container}>
                    <Outlet/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}