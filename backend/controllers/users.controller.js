const User = require ('../models/user');

const getAllUsers = async (req, res)=> {
    try {
        const users = await User.findAll();
        res.json(users);
    }
    catch (err) {
        console.error('Error fetching users', err);
        res.status(500).json({ error: 'Internal server error'});
         }
};

module.exports = {
    getAllUsers,
};