// middleware/checkSuspended.js
const User = require('../models/User');

const checkSuspended = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);  // Assuming the user ID is available in req.user after authentication
    if (user.status === 'suspended') {
      return res.status(403).json({ message: "Your account has been suspended. Please contact support." });
    }
    next();  // If not suspended, proceed to the next middleware/route handler
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = checkSuspended;
