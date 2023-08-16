const activitiesRouter = require("express").Router();
const { validatorForm } = require("../tools/validate")
const { postActivities } = require("../controllers/postActivities");
const { getActivities } = require("../controllers/getActivities");
const { deleteActivity } = require("../controllers/deleteActivity");
const { updateActivity } = require("../controllers/updateActivity");


activitiesRouter.post("",validatorForm, postActivities);
activitiesRouter.get("", getActivities);
activitiesRouter.delete("/:id", deleteActivity)
activitiesRouter.put("/:id", updateActivity)

module.exports = activitiesRouter;