const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Authentication token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(401).json({ message: "User not found" });
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authenticateMiddleware;
