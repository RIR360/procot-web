// modules
require("dotenv").config();

const express = require("express");
const ejs_layout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");
const {
    connectDatabase
} = require("./libraries/database");

// settings
const app = express();
const port = process.env.PORT || 3001;
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(ejs_layout);
app.use(express.static(path.join(__dirname + '/public')));

// session object
app.use(session({

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false

}));

// global middleware
app.use((req, res, next) => {

    next();

});

// use flash messages
app.use(flash());


// Routers
const mother_router = require("./routers/mother");
app.use("/", mother_router);

// Server
app.listen(port, (err) => {

    // server started
    console.log(`PROCOT V${process.env.VERSION} STARTED!`);

    // connect to database
    connectDatabase(err => {
        
        if (err) {

            console.log("> Can't connect to the database.");
            console.log(">", err.message);

        } else {

            console.log("> Successful database connection recorded!");
            console.log(`> Visit Now! (http://localhost:${port})`);

        }

    })

});