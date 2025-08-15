// index.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const { Pool } = require('pg');

// PostgreSQL pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Existing users router
const usersRouter = require('./routes/users.routes');
app.use('/api/users', usersRouter);

// -------------------------
// Add this endpoint directly in index.js
// GET /api/user/:userId
app.get('/api/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// -------------------------

// Start server
const server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Server is running at http://${host}:${port}`);
});
