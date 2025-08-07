require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();

// PostgreSQL connection pool using environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Test DB Connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log("✅ Connected to Database!");
    });
});

// Sample route: Read from 'test' table
app.get('/testdata', (req, res) => {
    console.log("TEST DATA:");
    pool.query('SELECT * FROM test')
        .then(result => res.send(result.rows))
        .catch(err => {
            console.error('Query error:', err.stack);
            res.status(500).send('Error querying test table');
        });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
