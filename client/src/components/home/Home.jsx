import Card from "./card/Card"
import styles from "./Home.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries, orderCountries, reset, pageHome, getActivity, filterContinent, filterActivity } from "../../redux/actions/actions"
import { useEffect, useState } from "react"

export default function Home(){

    const dispatch = useDispatch()
    const [booleano, setBooleano] = useState(false)
    const [page, setPage] = useState(1)
    const pageCountries = useSelector((state) => state.pageCountries);
    const filtered = useSelector((state) => state.filtered);
    const activity = useSelector((state) => state.activity);
    const currentPage = useSelector((state) => state.currentPage)
    
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = filtered.length > 0 ? filtered.slice(startIndex, endIndex) 
    : pageCountries.slice(startIndex, endIndex);
    const numberPages = Math.ceil(filtered.length / itemsPerPage);

    useEffect(() => {
        dispatch(fetchCountries())
        dispatch(getActivity())
    }, [dispatch])
    

    const handleOrder = (event) => {
        dispatch(orderCountries(event.target.value))
        setBooleano(!booleano)
    }

    const handleFilterC = (event) => {
        dispatch(filterContinent(event.target.value))
    }

    const handleFilterA = (event) => {
        dispatch(filterActivity(event.target.value))
    }
    
    const onSubmit = () => {
        dispatch(reset())
    }

    const handleClick = (event) => {
        if(event.target.name === "next"){
            if(filtered.length > 0){
                if(currentPage === numberPages){
                    return;
                }
            }
            if(pageCountries.length === 0){
                return;
            }
            const nextPage = currentPage + 1;
            dispatch(pageHome(nextPage))
            setPage(nextPage)
        }
        if(event.target.name === "prev"){
            const prevPage = currentPage - 1;
            dispatch(pageHome(prevPage))
            setPage(prevPage)
        }
    }

    const handleChange = (event) =>{
        if (event.key === 'Enter'){
            const pag = event.target.value;
            if(!isNaN(pag)){
                if(filtered.length > 0){
                    if(pag > numberPages){
                        setPage(numberPages);
                        dispatch(pageHome(numberPages))
                    }
                    if(numberPages >= pag >= 1){
                        setPage(pag);
                        dispatch(pageHome(pag))
                    }
                }else if(pag > 25){
                    setPage(25);
                    dispatch(pageHome(25))
                }
                if(pag < 1){
                    setPage(1);
                    dispatch(pageHome(1))
                }
                if(filtered.length === 0 && 25 >= pag >= 1){
                    setPage(pag);
                    dispatch(pageHome(pag))
                }
            }else{
                setPage(1);
                dispatch(pageHome(1))
            }
        }
    }

    

    return(
        <div className={styles.divHome}>
            <div className={styles.divFilter} >
                <br/>
                <label className={styles.labelFilter} >SORT BY:</label>
                <br/>
                <select onChange={handleOrder}>
                    <option value="NULL">ALPHABET</option>
                    <option value="A">Countries (A-Z)</option>
                    <option value="Z">Countries (Z-A)</option>
                </select>
                <br/>
                <select onChange={handleOrder}>
                    <option value="NULL">POPULATION</option>
                    <option value="MA">Major to Minor</option>
                    <option value="ME">Minor to Major</option>
                </select>
                <br/>
                <label className={styles.labelFilter} >FILTER BY:</label>
                <br/>
                <select onChange={handleFilterC}>
                    <option value="NULL">CONTINENT</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Asia">Asia</option>
                    <option value="South America">South America</option>
                    <option value="North America">North America</option>
                    <option value="Antarctica">Antarctica</option>
                </select>
                <br/>
                <select onChange={handleFilterA}>
                    <option value="NULL">TOURIST ACTIVITY</option>
                    {activity.length ? activity?.map((a) =>(
                        <option key={a.id} value={a.name} >{a.name}</option>
                    )) : null}
                </select>
                <br/>
                <button className={styles.buttonReset} onClick={() => {onSubmit()}} >RESET</button>
            </div>
            <div className={styles.divCards} >
                {displayedItems.map((c) =>(
                    <Card 
                    key={c.id}
                    id={c.id}
                    flag={c.flag}
                    name={c.name}
                    continent={c.continent} />
                ))}
            </div>
            <div className={styles.divPage} >
                <button className={styles.buttonPage} name="prev" onClick={handleClick} disabled={currentPage === 1} >Previous page</button>
                <label><input className={styles.inputPage} type="number" name="Page" value={page} onChange={(e) => setPage(e.target.value)} onKeyDown={handleChange} /> of {filtered.length ? numberPages : pageCountries.length ? 25 : 1}</label>
                <button className={styles.buttonPage} name="next" onClick={handleClick} disabled={currentPage === 25} >Next page</button> 
            </div>
        </div>
    )
}