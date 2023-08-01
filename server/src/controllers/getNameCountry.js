const { Country } = require("../db")
const { Op } = require("sequelize");

async function getName(req, res) {
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
};

module.exports = { getName };