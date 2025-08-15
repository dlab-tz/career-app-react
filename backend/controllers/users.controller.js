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

//this is a put functionality
const updateUser =  async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { name, email } = req.body;

    if (!name && !email) {
        return res.status(400).json({ message: 'Please provide name or email to update' });
    }

    try {
        // Build dynamic update query
        const fields = [];
        const values = [];

        if (name) {
            fields.push(`name = $${fields.length + 1}`);
            values.push(name);
        }
        if (email) {
            fields.push(`email = $${fields.length + 1}`);
            values.push(email);
        }

        const query = `
            UPDATE users
            SET ${fields.join(', ')}
            WHERE id = $${fields.length + 1}
            RETURNING *
        `;
        values.push(userId);

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user: result.rows[0] });

    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    updateUser,
}