const checkStatus = (req, res, next) => {
  const user = req.user;

  if (!user || !user.status) {
    return res.status(401).json({ message: "User not authenticated or status missing" });
  }

  if (user.status === "suspended") {
    return res.status(403).json({
      message: "Your account is suspended. Please contact support."
    });
  }

  next(); // Proceed if status is 'active'
};

module.exports = checkStatus;
