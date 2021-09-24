const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// require("dotenv").config();

const Controller = require('./controllers');
const middlewares = require("./middlewares");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", Controller.index);
app.get("/countries", Controller.all);
app.get("/countries/:country", Controller.search);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;