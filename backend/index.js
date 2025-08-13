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


//Endpoint for getting all users
app.get('/api/users', (req, res, next) => {
    pool.query('SELECT * FROM users')
        .then(userData => {
            res.send(userData.rows);
            console.log('All users fetched successfully');
        })
        .catch(err => {
            console.error('Error fetching all users', err.stack);
            res.status(500).send('Internal Server Error');
        });
})


// EDIT user by ID
app.put('/api/user/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({ message: 'Please provide name or email to update' });
  }

  try {
    // Build dynamic update query
    const fields = [];
    const values = [];
    let query = 'UPDATE users SET ';

    if (name) {
      fields.push(`name = $${fields.length + 1}`);
      values.push(name);
    }
    if (email) {
      fields.push(`email = $${fields.length + 1}`);
      values.push(email);
    }

    query += fields.join(', ');
    query += ` WHERE id = $${fields.length + 1} RETURNING *`;
    values.push(userId);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user: result.rows[0]
    });

  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Require the Routes API  
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
    let host = server.address().address
    let port = server.address().port
    // Starting the Server at the port 3000
})