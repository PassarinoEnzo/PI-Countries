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

const getActivities = async (req, res) => {

    try {
        const activities = await Activity.findAll();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    postActivities,
    getActivities
}