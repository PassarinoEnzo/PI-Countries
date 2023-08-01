const { Country } = require("../db")

async function getCountries(req, res) {
    try {
        const allCountries = await Country.findAll();
        res.status(200).json(allCountries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCountries };