const countriesRouter = require("express").Router();
const { getCountries } = require("../controllers/getAllCountries");
const { getCountry } = require("../controllers/getIdCountry");
const { getName } = require("../controllers/getNameCountry");

countriesRouter.get("", getCountries);
countriesRouter.get("/name", getName);
countriesRouter.get("/:idPais", getCountry);


module.exports = countriesRouter;