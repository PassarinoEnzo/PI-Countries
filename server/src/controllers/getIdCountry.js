const { Country, Activity } = require("../db");

async function getCountry(req, res) {
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

module.exports = { getCountry };