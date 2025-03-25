const checkStatus = (req, res, next) => {
    const { status } = req.user;
  
    if (status === 'suspended') {
      return res.status(403).json({
        message: 'Your account is suspended. Please contact support.'
      });
    }
  
    next(); // Proceed if status is 'active'
  };
  
  module.exports = checkStatus;
  