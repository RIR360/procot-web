// modules
require("dotenv").config();
const express = require("express");
const {
    database
} = require("../libraries/database");
const app = express.Router();

app.get("/", (req, res, next) => {

    res.render("pages/home");

});

module.exports = app;
