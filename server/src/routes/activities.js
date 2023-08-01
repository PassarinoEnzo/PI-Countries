const activitiesRouter = require("express").Router();
const { postActivities } = require("../controllers/postActivities");
const { getActivities } = require("../controllers/getActivities");

activitiesRouter.post("", postActivities);
activitiesRouter.get("", getActivities);

module.exports = activitiesRouter;