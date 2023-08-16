

const validatorForm = (req, res, next) => {
    const { name, difficulty, duration, season, countries=[] } = req.body;
    if(!name){
        res.status(400).json({message: "Debe tener al menos 1 nombre"})
    }
    if(!difficulty && difficulty === Number(difficulty)){
        res.status(400).send({message: "Debe tener al menos 1 digito y ser un número"})
    }
    if(difficulty < 1 || difficulty > 5){
        res.status(400).json({message: "Debe ser mayor a 1 y menor a 5"})
    }
    if(!duration || duration < 0 || duration > 24){
        res.status(400).json({message: "Debe tener al menos 1 digito y debe ser entre 0 y 24"})
    }
    if(!season){
        res.status(400).json({message: "Debe tener una temporada y debe empezar con mayúscula"})
    }
    if(!countries.length){
        res.status(400).json({message: "Debe seleccionar al menos 1 pais"})
    }
    next()
}

module.exports = { validatorForm }