import { useSelector } from "react-redux";
import styles from "./Card.module.css"
import { Link } from "react-router-dom"

export default function Card(props){

    

    return (
        <div className={styles.divCard}>
            <Link to={`/detail/${props.id}`} className={styles.linkCard} >
                <img className={styles.imgCard} src={props.flag} />
                <section className={styles.sectionCard} >
                    <h1 className={styles.nameCard}>{props.name}</h1>
                    <h3 className={styles.h3Card}>{props.continent}</h3>
                </section>
            </Link>
        </div>
    )
}