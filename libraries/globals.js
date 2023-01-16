require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
    database,
} = require("../libraries/database");

let ACCESS_LIST = [

    "admin",
    "moderator",
    "member",
    "public"

];

function access (permission, permissions) {

    if (permissions.includes(ACCESS_LIST[0]) || permissions.includes(permission)) {

        return true

    } else return false
}

module.exports = {

    ACCESS_LIST,
    access,

    format : {

        title (str) {
            let clean = str.replace(/[-_,:;"'.]/g, " ");
            let capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);
            return capitalized;
        }

    },

    requireLogin (req, res, next) {

        if (req.session.token) {

            // get the jwt token
            let token = req.session.token;

            // verify the token
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

                if (err) {

                    req.flash("error", "Your authorization failed!");
                    res.redirect("/auth/login");

                } else {

                    // this user is ready to go
                    // set the locals
                    res.locals.email = user.email;
                    res.locals.type = user.type;
                    // set the sessions
                    req.session.email = user.email;
                    req.session.type = user.type;
                    // move on
                    next();
                    
                }
            })
        }
        else {

            // not logged in
            res.redirect("/auth/login");
            
        }
    },

    admin (req, res, next) {

        if(access(ACCESS_LIST[0], req.session.permissions)) {

            next()

        } else {

            req.flash("error", "You're not an admin")
            res.redirect("back")

        }
        
    },

    sanitize (str) {

        str = str.replace(/[^a-z0-9áéíóúñü :/@\.,_!(){}+='"@$#%*-]/gim,"");
        return str.trim();
        
    }
}