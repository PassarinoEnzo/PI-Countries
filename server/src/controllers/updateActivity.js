const { Activity, Country } = require("../db");

const updateActivity = async (req, res) => {
    const { id } = req.params;
    const { name, difficulty, duration, season, countries =[]} = req.body;

    try {
        const activity = await Activity.findByPk(id)
        activity.setCountries([])
        const activityUpdated = await activity.update({
            name: name,
            difficulty: difficulty,
            duration: duration,
            season:season
        })
        const countriesInDb = await Country.findAll({ where: { id: countries } })
        activity.setCountries(countriesInDb)
        res.status(200).json({activityUpdated})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = { updateActivity }