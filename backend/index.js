//load env file
const dotenv = require('dotenv');
dotenv.config();

// Entry Point of the API Server 
const express = require('express');


/* Creates an Express application. 
The express() function is a top-level 
function exported by the express module.
*/
const app = express();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// Test Sequelize connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log(' Sequelize connected to DB');
            } catch (error) {
                console.error(' Sequelize connection error:', error);
            }
        })();


/* To handle the HTTP Methods Body Parser 
   is used, Generally used to extract the 
   entire body portion of an incoming 
   request stream and exposes it on req.body 
*/
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})

app.get('/testdata', (req, res, next) => {
    console.log("TEST DATA :");
    pool.query('Select * from test')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

// Require the Routes API  
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
    let host = server.address().address
    let port = server.address().port
    // Starting the Server at the port 3000
})