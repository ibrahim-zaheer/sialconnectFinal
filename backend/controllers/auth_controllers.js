// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Register User
exports.registerUser = async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Log request body
      const { name, email, password, role } = req.body;
  
      if (!role || !["exporter", "supplier"].includes(role)) {
        return res.status(400).json({ message: "Invalid or missing role" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error during registration:", error); // Log server-side error
      res.status(500).json({ message: error.message });
    }
  };
  

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, userId: user._id,name: user.name,email:user.email,role:user.role,profilePicture:user.profilePicture });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Google Sign In
exports.googleSignIn = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;

            return res.status(200).cookie("access_token", token, {
                httpOnly: true,
            }).json({ ...rest, isNewUser: false, token });
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
                role:"exporter"
            });
            await newUser.save();

            const token = jwt.sign({
                id: newUser._id,
                role: newUser.role
            }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });


            const { password, ...rest } = newUser._doc;
            res.status(200).cookie("access_token", token, { httpOnly: true }).json({ ...rest, isNewUser: true, token });
        }
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};





exports.selectRole = async (req, res, next) => {
    const { email, role } = req.body;

    try {
        // Validate role
        if (!role || !["exporter", "supplier"].includes(role)) {
            return res.status(400).json({ message: "Invalid role selected" });
        }

        // Find the user by email and update the role
        const user = await User.findOneAndUpdate(
            { email },
            { role },
            { new: true } // Ensure we get the updated user document
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a new token with the updated role
        const updatedToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Respond with the updated user data and new token
        const { password, ...rest } = user._doc;
        res.status(200).json({ ...rest, token: updatedToken });
    } catch (error) {
        next(error);
    }
};





// exports.selectRole = async (req, res, next) => {
//     const { email, role } = req.body;

//     try {
//         // Find the user by email and update the role
//         const user = await User.findOneAndUpdate(
//             { email },
//             { role },
//             // Return the updated user
//         );

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const { password, ...rest } = user._doc;
//         res.status(200).json(rest);
//     } catch (error) {
//         next(error);
//     }
// };