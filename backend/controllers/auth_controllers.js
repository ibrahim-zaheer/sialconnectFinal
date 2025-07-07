// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const crypto = require('crypto');

const nodemailer = require('nodemailer');


// Register User
exports.registerUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log request body
    const { name, email, password, role } = req.body;

    if (!role || !["exporter", "supplier"].includes(role)) {
      return res.status(400).json({ message: "Invalid or missing role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

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
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "250h",
    });
    res.json({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified:user.emailVerified,
      profilePicture: user.profilePicture,
      

      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      businessName: user.businessName,
      businessAddress: user.businessAddress,
      city: user.city,
      cnic: user.cnic,
      postalCode: user.postalCode,
      bio: user.bio,
      subscription: user.subscription,
      adminVerified:user.adminVerified,
    });
    console.log("User subscription on login:", user.subscription);
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
      console.log("User found by Google email:", user);


      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({ id: user._id, ...rest, isNewUser: false, token });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
        role: "exporter",
      });
      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
          role: newUser.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ ...rest, isNewUser: true, token });
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
    // const { password, ...rest } = user._doc;
    // res.status(200).json({ ...rest, token: updatedToken });

    const { password, ...rest } = user._doc; // Ensure `_id` is included
    res.status(200).json({ id: user._id, ...rest, token: updatedToken });
  } catch (error) {
    next(error);
  }
};

exports.checkAuth = (req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


// exports.sendResetOTP = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ message: 'User not found' });

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

//   user.otp = otp;
//   user.otpExpires = otpExpires;
//   await user.save();

//   // Send OTP via email
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail', // or Mailtrap, SendGrid SMTP, etc.
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Support" <${process.env.EMAIL_USER}>`,
//     to: user.email,
//     subject: 'Password Reset OTP',
//     text: `Your OTP is ${otp}. It expires in 10 minutes.`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'OTP sent to email' });
//   } catch (err) {
//     res.status(500).json({ message: 'Email sending failed', error: err });
//   }
// };


exports.sendResetOTP = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        message: 'No account found with this email address' 
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('Error in sendResetOTP:', err);
    res.status(500).json({ 
      message: 'An error occurred while processing your request' 
    });
  }
};


exports.verifyOTPAndReset = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error in verifyOTPAndReset:', err);
    res.status(500).json({ 
      message: 'An error occurred while resetting your password' 
    });
  }
};

// exports.verifyOTPAndReset = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
//     return res.status(400).json({ message: 'Invalid or expired OTP' });
//   }

//   user.password = newPassword; // Hash this in real use
//   user.otp = null;
//   user.otpExpires = null;
//   await user.save();

//   res.status(200).json({ message: 'Password reset successful' });
// };




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
