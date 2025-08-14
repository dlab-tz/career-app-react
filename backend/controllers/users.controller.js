const pool = require("../index");

const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "user"');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getAllUsers,
}