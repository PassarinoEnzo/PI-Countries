const { Activity } = require("../db");

const deleteActivity = async (req, res) => {
    const { id } = req.params;

    try {
        await Activity.destroy({ where: { id } })
        const activities = await Activity.findAll()
        res.status(200).json({activities})
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

module.exports = { deleteActivity }