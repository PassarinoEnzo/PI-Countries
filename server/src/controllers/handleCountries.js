const { Country, Activity } = require("../db")
const { Op } = require("sequelize");

const getCountries = async(req, res) => {
    try {
        const allCountries = await Country.findAll();
        res.status(200).json(allCountries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCountry = async(req, res) => {
    const { idPais } = req.params;

    try {
        const country = await Country.findOne({
            where: {
                id: idPais,
            },
            include: Activity,
        });
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const getName = async (req, res) =>{
    let { name } = req.query;

    try {
        const countries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        });
        if (countries.length === 0) {
            return res.status(404).json({ message: 'No se encontraron países con el nombre proporcionado.' });
        }
        return res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: `Error al buscar paises.` })
    }
}


module.exports = {
    getCountries,
    getCountry,
    getName
}