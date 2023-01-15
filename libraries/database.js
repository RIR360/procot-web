require("dotenv").config();
const mongoose = require('mongoose');

function connectDatabase(error) {

    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true }, (err) => {
        
        if (err) {

            // error found
            error(err);

        } else {

            // empty call means no error
            error();

        }

    });
    
}


// schemas
const Members = mongoose.model('members', new mongoose.Schema({
    name: String,
    batch: Number
}));




module.exports = {

    // functions
    connectDatabase,

    //schemas
    Members

};