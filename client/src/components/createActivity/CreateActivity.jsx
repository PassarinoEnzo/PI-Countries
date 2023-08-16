import { useState, useEffect } from "react"
import styles from "./CreateActivity.module.css"
import validation from "./validation"
import { addActivity, fetchCountries, updateActivity } from "../../redux/actions/actions"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

export default function CreateActivity (){

    const dispatch = useDispatch()
    const location = useLocation();
    const [formData, setFormData] = useState({ name: "", difficulty: 0, duration: 0, season: "", countries: []})
    const [errors, setErrors] = useState({})
    const Countries = useSelector((state) => state.pageCountries)
    const Find = Countries.filter((c) => formData.countries.includes(c.id))

    useEffect(() => {
        dispatch(fetchCountries())
    }, [dispatch])

    const handleChange = (event) => {
        const { name, value} = event.target;
        if(name === "country"){
            setFormData({
                ...formData, countries: formData.countries.push(value)
            })
        }
        setFormData({
            ...formData, [name]: value
        })
        setErrors(validation({
            ...formData, [name]: value
        }))
    };

    const handleSubmit = (event) => {
        if(Object.keys(errors).length === 0){
            if(location.state !== null){
                dispatch(updateActivity(location.state.activityId, formData))
            }else{
                dispatch(addActivity(formData))
            }
        }else{
            event.preventDefault();
        }
    }

    const handleDelete = (id) =>{
        setFormData({
            ...formData, countries: formData.countries.filter((c) => c !== id)
        })
    }

    return (
        <div className={styles.container} >
            <div className={styles.containerActivity}>
                {location.state !== null ? <h2>EDIT ACTIVITY</h2> : <h2>CREATE ACTIVITY</h2>}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input className={styles.input} type='text' name='name' value={formData.name} placeholder="NAME" onChange={handleChange} />
                    <p>{ errors.name ? errors.name : null }</p>

                    <label className={styles.labelForm} >DIFFICULTY</label>
                    <div className={styles.divLabel}>
                        <label>1</label>
                        <input className={styles.input} type='range' min="1" max="5" name='difficulty' value={formData.difficulty} onChange={handleChange} />
                        <label>5</label>
                    </div>
                    <p>{ errors.difficulty ? errors.difficulty : null }</p>

                    <label className={styles.labelForm} >DURATION IN HOURS</label>
                    <input className={styles.input} type='number' name='duration' value={formData.duration} onChange={handleChange} />
                    <p>{ errors.duration ? errors.duration : null }</p>

                    <label className={styles.labelForm} >CHOOSE A SEASON</label>
                    <select name="season" onChange={handleChange}>
                        <option value="Default">ELEGIR...</option>
                        <option value="Verano">VERANO</option>
                        <option value="Otoño">OTOÑO</option>
                        <option value="Invierno">INVIERNO</option>
                        <option value="Primavera">PRIMAVERA</option>
                    </select>
                    <p>{ errors.season ? errors.season : null }</p>

                    <label className={styles.labelForm} >CHOOSE COUNTRY/S</label>

                    <select onChange={handleChange} name="country">
                        <option>Choose...</option>
                        {Countries.map((c) => (
                            <option key={c.id} value={c.id} >{c.name}</option>
                        ))}
                    </select>
                    <hr />
                    {formData.countries.length ? <div className={styles.divLabelForm}>
                        {Find.map((c) =>
                            ( <button 
                                className={styles.ButtonCountries} 
                                key={c.id} 
                                onClick={() =>{handleDelete(c.id)}} >{c.name}</button> )
                        )}
                    </div> : null}
                    <p>{ errors.countries ? errors.countries : null }</p>

                    <hr/>
                    <button className={styles.buttonForm} type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}