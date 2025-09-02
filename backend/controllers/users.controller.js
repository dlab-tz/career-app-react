const User = require ('../models/user');
const transporter = require('../utils/mailer');

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

    // Build verification link
    const verificationLink = `https://localhost:5000/api/users/verify-email/${newUser.id}`;

    // Send verification email
    await transporter.sendMail({
      to: newUser.email,
      subject: 'Email Verification',
      html: `<p><a href="${verificationLink}">Please verify your Email</a></p>`,
    });

    res.status(201).json({
      message: 'User created. Verification email sent.',
      user: newUser,
    });
  } catch (err) {
    console.error('User creation error:', err);
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
const verifyEmail = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.update({ emailVerified: true });
    res.json({ message: 'Email successfully verified' });
  } catch (err) {
    console.error('Email verification error:', err);
    res.status(500).json({ error: 'Verification failed' });
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    verifyEmail
};