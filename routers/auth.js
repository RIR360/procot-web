// modules
require("dotenv").config()
const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    database
} = require("../libraries/database");
const {
    sanitize
} = require("../libraries/globals");

app.get("/login", (req, res, next) => {

    res.render("pages/auth/login");

});

app.post("/login", (req, res, next) => {
    
    const email = sanitize(req.body.email);
    const password = req.body.password;

    database.query(`SELECT * FROM users WHERE email = ?`, email, 
    async (err, results) => {

        if (err) {

            next(err);

        }
        if (results.length < 1) {

            // send error to the user
            req.flash("error", "There's no user with this username or email");
            // go back to the previous page
            return res.redirect("back");

        }
        else {

            if (await bcrypt.compare(password, results[0].hash)) {

                req.flash("info", "You're successfully logged in!");

                // successful user object
                let user = {
                    email: email,
                    role_id: results[0].role_id
                }

                // `````````````````````````````
                // signing login web token here
                // _____________________________

                let access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '7d' 
                    }
                );

                req.session.token = access_token;
                // redirect to the dashboard
                return res.redirect("/dashboard");

            } else {
                // send error to the user
                req.flash("error", "Password didn't match");
                // go back to the previous page
                return res.redirect("back");
            }
        }
    });
});

app.get("/register", (req, res, next) => {

    res.render("pages/auth/register");

});

app.post("/register", async (req, res, next) => {

    try {

    let fname = sanitize(req.body.fname);
    let email = sanitize(req.body.email);
    let date = new Date().toString();
    let password = req.body.password;
    let confirm = req.body.confirm;
    
    if (req.body.email != email) {

        // send error to the user
        req.flash("error", "You can't use those characters in your username!");
        // go back to the previous page
        return res.redirect("back");

    }

    if (!fname || !email || !password || !confirm) {

        // send error to the user
        req.flash("error", "Something is not defined as expected!");
        // go back to the previous page
        return res.redirect("back");

    }
    else if (fname.length > 100) {

        // send error to the user
        req.flash("error", "Fullname length exceeded!");
        // go back to the previous page
        return res.redirect("back");

    }
    else if (!email.includes('@')) {

        // send error to the user
        req.flash("error", "Email is not valid!");
        // go back to the previous page
        return res.redirect("back");

    }
    else if (email.length > 100) {

        // send error to the user
        req.flash("error", "Email length exceeded!");
        // go back to the previous page
        return res.redirect("back");

    }
    else if (password.length > 255) {

        // send error to the user
        req.flash("error", "Password length exceeded!");
        // go back to the previous page
        return res.redirect("back");

    }
    else if (password != confirm) {

        // send error to the user
        req.flash("error", "Password didn't match!");
        // go back to the previous page
        return res.redirect("back");

    }
    else {

        // hash encrypt the password
        const encrypted_pass = await bcrypt.hash(password, 9);

        // push data into database
        getDbConnection(configuration.db_url)
        .then(database => {
            
            database.collection("users").insertOne({
                fname: fname,
                email: email,
                role_id: userRoleId,
                hash: encrypted_pass,
                created: date,
                created_by: "EITIx"
            })
            .then(results => {
    
                // set admin has been already created
                setAdmin(true);
                // redirect to 
                req.flash("info", "EITIx Admin Account is created!");
                res.redirect("/auth/login"); 
    
            })
            .catch(err => {
    
                // error while inserting 
                next(err)
    
            });
        })
        
    }} catch (err) {

        // internal server error
        next(err)
    }

});

app.get("/logout", (req, res, next) => {

    req.flash("info", "You're successfully logged out from PROCOT!");
    res.redirect("/auth/login");
    req.session = null;

})

module.exports = app;