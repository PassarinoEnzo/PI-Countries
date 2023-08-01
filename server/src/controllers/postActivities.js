const { Activity, Country } = require("../db");

const postActivities = async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;

    if(!name || !difficulty || !duration || !season || !countries) {
        return res.status(401).json({ message: "Faltan datos" })
    }

    try {
        const [activity, created] = await Activity.findOrCreate({
            where: { name },
            defaults: { difficulty, duration, season }
        })
        const countriesInDB = await Country.findAll({
            where: {
              id: countries,
            },
        });
        await activity.setCountries(countriesInDB)
        res.status(200).json({ message: "Actividad creada exitosamente!"})
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
};

module.exports = { postActivities };