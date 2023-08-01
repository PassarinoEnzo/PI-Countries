const countriesRouter = require("express").Router();
const { getCountries, getCountry, getName } = require("../controllers/handleCountries")

countriesRouter.get("", getCountries);
countriesRouter.get("/name", getName);
countriesRouter.get("/:idPais", getCountry);


module.exports = countriesRouter;