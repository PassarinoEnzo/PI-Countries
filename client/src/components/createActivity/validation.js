export default function validation(input){
    const error = {}
    const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÄËÏÖÜäëïöüÀÈÌÒÙàèìòù\s]+$/;


    if(!regexName.test(input.name)){
        error.name = "Debe empezar con Mayúscula y no debe contener numeros"
    }
    if(!input.name){
        error.name = "Debe ingresar un nombre"
    }
    if(input.difficulty < 1 || input.difficulty > 5){
        error.difficulty = "La dificultad debe ser entre 1 y 5"
    }
    if(input.duration < 0 || input.duration > 24){
        error.duration = "La duración debe ser entre 0 y 24 horas"
    }
    if(input.season !== "Verano" && input.season !== "Otoño" && input.season !== "Invierno" && input.season !== "Primavera"){
        error.season = "Debe elegir una temporada"
    }
    if(input.countries.length === 0){
        error.countries = "Debe elegir al menos 1 pais"
    }
    return error;
}