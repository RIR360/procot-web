require("dotenv").config();
const { MongoClient } = require('mongodb');

// Connection URI
const client = new MongoClient(process.env.DATABASE_URI);
const database = client.db(process.env.DATABASE_NAME);


function connectDatabase(error) {

    client.connect()
    .then(e => {

        // empty means no error found
        error()

    })
    .catch(err => {

        error(err)
    });

}



module.exports = {

    // Database Client
    database,
    // functions
    connectDatabase

};