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
        return res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = { getName };