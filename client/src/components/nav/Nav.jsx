import SearchBar from "./searchBar/SearchBar"
import { Link } from "react-router-dom"
import styles from "./Nav.module.css"
import { useLocation } from "react-router-dom"

export default function Nav(){

    const location = useLocation();

    return(
        <div className={styles.divNav} >
            <Link to="/">
            <img className={styles.imgLogo} src="/src/assets/planet-earth_logo.png" alt="Logo" />
            </Link>
            <Link className={styles.box} to="/home">Home</Link>
            <Link className={styles.box} to="/createActivity">Create Activity</Link>
            {
                location.pathname === "/home" && <SearchBar />
            }
        </div>
    )
}