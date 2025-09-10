const jwt = require("jsonwebtoken");

// Middleware to protect routes
function auth(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ msg: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Invalid token format" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // If role check is required
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ msg: "Access denied" });
      }

      req.user = decoded; // Attach user to request
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }
  };
}

module.exports = auth;
