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

const User = require('./models/user');

app.post('/submit-user', (req, res) => {
  const user = new User(req.body);

  if (!user.isValid()) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO users (
      first_name, middle_name, last_name, email, phone,
      date_of_birth, region, oversea, education_level,
      professional_field, country
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *
  `;

  pool.query(query, user.toSQLValues())
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => {
      console.error('Error inserting user:', err.stack);
      res.status(500).json({ error: 'Database error' });
    });
});

// Require the Routes API  
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
    let host = server.address().address
    let port = server.address().port
    // Starting the Server at the port 3000
})