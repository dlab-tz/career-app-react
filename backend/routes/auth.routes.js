const { Router } = require('express');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');  
const User = require('../models/user');

const router = Router();

// ====== LOGIN ROUTE ======
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password); 
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign(                 
    { id: user.id, email: user.email },    // JWT payload
    process.env.JWT_SECRET,                // secret from .env
    { expiresIn: '1h' }                    // token expiration
  );

  res.json({ token });
});

router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
});

module.exports = router;
