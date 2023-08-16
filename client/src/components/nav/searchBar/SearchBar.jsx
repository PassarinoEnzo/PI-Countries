import { useState } from "react"
import styles from "./SearchBar.module.css"
import { onSearch, fetchCountries } from "../../../redux/actions/actions"
import { useDispatch } from "react-redux"

export default function SearchBar(){

    const [name, setName] = useState("")
    const dispatch = useDispatch()

    const handleChange = (event) =>{
        setName(event.target.value)
    }

    const onSubmit = () =>{
        if(name === ""){
            dispatch(fetchCountries())
        }else{
            dispatch(onSearch(name))
        }
    }


    return(
        <div className={styles.inputContainer}>
            <input type="text"
                name="text"
                className={styles.input}
                onChange={handleChange}
                onClick={onSubmit()}
                placeholder="search..." />
        </div>
    )
}