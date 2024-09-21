// roleMiddleware.js
const roleMiddleware = (allowedRoles) => (req, res, next) => {
  const user = req.user; // Assuming `req.user` is set by `authMiddleware`

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!allowedRoles.includes(user.role)) {
    return res.status(403).json({ message: 'Access denied: insufficient permissions' });
  }

  next();
};

module.exports = roleMiddleware;
