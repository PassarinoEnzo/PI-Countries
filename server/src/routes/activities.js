const activitiesRouter = require("express").Router();
const { postActivities, getActivities } = require("../controllers/handleActivities")

activitiesRouter.post("", postActivities);
activitiesRouter.get("", getActivities);

module.exports = activitiesRouter;