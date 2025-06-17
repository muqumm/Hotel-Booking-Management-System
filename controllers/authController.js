const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Login with session
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    
    // Plain text comparison (INSECURE)
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.user = { id: user.id, email: user.email };
    res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
// Destroy session on logout
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.json({ message: 'Logout successful' });
  });
};

// Check if user is authenticated
const checkAuth = (req, res) => {
  res.json({ 
    authenticated: !!req.session.user, 
    user: req.session.user || null 
  });
};

module.exports = { login, logout, checkAuth };