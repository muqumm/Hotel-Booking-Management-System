// Session-based auth middleware
const authMiddleware = (req, res, next) => {
  console.log('Session check:', req.session); // Debug log
  if (req.session.user) {
    next(); // User is authenticated
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
