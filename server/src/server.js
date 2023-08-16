const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

// Express
const server = express();

// Middlewars
server.use(morgan("dev"));
server.use(express.json());

// Cors
server.use(cors());

// Router
server.use(router);


module.exports = server;
