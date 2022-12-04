// modules
const express = require("express");
const app = express.Router();

// routers
const home_router = require("./home");
const auth_router = require("./auth");

// routes
app.use("/", home_router);
app.use("/auth", auth_router);

// handle redirects
app.get(["/login", "/signin"], (req, res) => {res.redirect("/auth/login")});
app.get(["/register", "/signup"], (req, res) => {res.redirect("/auth/register")});


// must be at the bottom
app.use((req,res,next) =>{
    let err = new Error("404 page not found");
    err.status = 404;
    next(err);
});

// custom error handeling middleware
app.use((err,req,res,next) => {
    if(err.status == 404) {
        return res.render("pages/misc/404-error-page");
    }
    else {
        console.log(err);
        if (err.sql) {
            // a database error encountered
            req.flash("error", "Database error!");
            return res.render("pages/misc/database-error", {
                error_message: err.message
            });
        } else {
            // a random server error
            req.flash("error", "Server error!");
            return res.render("pages/misc/server-error", {
                error_message: err.message
            });
        }
    }
});


module.exports = app;