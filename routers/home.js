// modules
require("dotenv").config();
const express = require("express");
const {
    database
} = require("../libraries/database");
const app = express.Router();


// home page
app.get("/", (req, res, next) => {

    res.redirect("/home");
    //res.redirect("/feed");

})

app.get("/home", (req, res, next) => {

    res.render("pages/home", {

        title: "Home"

    })

})

app.get("/feed", (req, res, next) => {

    res.render("pages/feed", {

        title: "Feed"

    })

})

app.get("/lab/solution", (req, res, next) => {

    let algorithm = ``;
    let code = ``;
    let output = ``;

    res.render("pages/lab-solution", {

        title: "Solution",
        content: {
            title: "Write a program to implement first pattern matching algorithm.",
            algorithm: algorithm,
            code: code,
            output: output
        },
        contributor: {
            algorithm: "Rizvy",
            code: "Rizvy",
            output: "Rizvy"
        }

    })

});

module.exports = app;
