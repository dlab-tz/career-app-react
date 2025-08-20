const User = require ('../models/user');

//GET all users
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
// GET user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update user
const updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};