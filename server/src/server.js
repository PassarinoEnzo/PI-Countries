const express = require("express");
const router = require("./routes");
const countriesRouter = require("./routes/countries");
const activitiesRouter = require("./routes/activities");
const morgan = require("morgan");
const cors = require("cors");

// Express
const server = express();

// Middlewars
server.use(morgan("dev"));
server.use(express.json());

// Cors
server.use(cors());

// Routers
server.use(router);
server.use("/countries", countriesRouter);
server.use("/activities", activitiesRouter);

module.exports = server;
