const jwt = require("jsonwebtoken");

// Verify JWT
function auth(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

// Restrict to admins only
function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ msg: "Access denied: Admins only" });
  }
  next();
}

module.exports = { auth, adminOnly };
