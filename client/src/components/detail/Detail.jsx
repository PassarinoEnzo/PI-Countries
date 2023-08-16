import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { deleteActivity } from "../../redux/actions/actions"
import styles from "./Detail.module.css"
import europa from "../../assets/europa.png"
import sudamerica from "../../assets/sudamerica.png"
import asia from "../../assets/asia.png"
import norteamerica from "../../assets/norte-america.png"
import africa from "../../assets/africa.png"
import antartica from "../../assets/antartica.png"
import oceania from "../../assets/oceania.png"

export default function Detail() {

    const continentMap = {
        Europe: europa,
        Africa: africa,
        Asia: asia,
        "South America": sudamerica,
        "North America": norteamerica,
        Antarctica: antartica,
        Oceania: oceania
    }

    const { id } = useParams()
    const dispatch = useDispatch()
    const [pais, setPais] = useState({})
    const Activity = useSelector((state) => state.activity)

    useEffect(() =>{
        axios(`http://localhost:3001/countries/${id}`)
        .then(({ data }) =>{
            if(data.name){
                setPais(data)
            }else{
                window.alert("No existe Pais con ese ID!")
            }
        });
        return setPais({})
    }, [id, Activity])

    const handleClick = (id) => {
        dispatch(deleteActivity(id))
    }

    return(
        <div className={styles.containerDetail} >
            <div className={styles.divDetail} >
                <section className={styles.secImg} >
                    <img className={styles.imgDetail} src={pais?.flag} alt={pais?.name} />
                    <h1 className={styles.nameDetail} >{pais?.name}</h1>
                </section>
                <img className={styles.imgContinent} src={continentMap[pais?.continent]} />
                <section className={styles.secDetail} >
                    <span className={styles.spanDetail} >
                        <span className={styles.spanTitle} >Abbreviation:</span> {pais?.id}
                    </span>
                    <span className={styles.spanDetail} >
                        <span className={styles.spanTitle} >Capital:</span> {pais?.capital}
                    </span>
                    <span className={styles.spanDetail} >
                        <span className={styles.spanTitle} >Continent:</span> {pais?.continent}
                    </span>
                    <span className={styles.spanDetail} >
                        <span className={styles.spanTitle} >SubRegion:</span> {pais?.subRegion}
                    </span>
                    <span className={styles.spanDetail} >
                        <span className={styles.spanTitle} >Area:</span> {pais?.area} km²
                    </span>
                    <span className={styles.spanDetail} >
                        <span className={styles.spanTitle} >Population:</span> {pais?.population}
                    </span>
                </section>
            </div>
            {pais.Activities?.length > 0 ? <h1 className={styles.titleActivity} >ACTIVITIES:</h1> : null}
            <div className={styles.divActivities} >
                {pais.Activities?.map((a) =>(
                    <section key={a.id} className={styles.secActivity} >
                        <div className={styles.divButtons} >
                        <button className={styles.buttonUpdate} >
                        <Link className={styles.linkUpdate} to="/createActivity" state={{ activityId: a.id }} >Edit</Link>
                        </button>
                        <button className={styles.buttonDelete} onClick={()=> {handleClick(a.id)}} >Delete</button>
                        </div>
                        <span className={styles.spanDetail} >
                        <span className={styles.spanTitle} >Name:</span> {a.name}
                        </span>
                        <span className={styles.spanDetail} >
                        <span className={styles.spanTitle} >Difficulty:</span> {a.difficulty}
                        </span>
                        <span className={styles.spanDetail} >
                        <span className={styles.spanTitle} >Duration:</span> {a.duration}
                        </span>
                        <span className={styles.spanDetail} >
                        <span className={styles.spanTitle} >Season:</span> {a.season}
                        </span>
                    </section>
                ))}
            </div>
        </div>
    )
}