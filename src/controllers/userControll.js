const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const otpGenerator = require('otp-generator');
const jwt = require("jsonwebtoken");

const otpStore = {}
exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    const otp = otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
      alphabets: false,
    });

   
    otpStore[phone] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // valid for 5 minutes
    };

    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      otp,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: "Phone and OTP are required" });
    }
    const record = otpStore[phone];
    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired or not found" });
    }
    const submittedOtp = String(otp).trim();
    if (record.otp !== submittedOtp) {
      console.log("Stored OTP:", record.otp, "Received OTP:", submittedOtp);
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    const isUser = await User.findOne({phone:phone})
    if(isUser){
      const token = jwt.sign(
      { userId: isUser._id, role: "user" },
      process.env.SecretKey,
      { expiresIn: "7d" }
    );
    delete otpStore[phone];
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });
    }
    const user = await User.create({ phone });
    if (!user) {
      return res.status(404).json({ success: false, message: "failed to verification." });
    }
    const token = jwt.sign(
      { userId: user._id, role: "user" },
      process.env.SecretKey,
      { expiresIn: "7d" }
    );
    delete otpStore[phone];
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (err) {
    console.error("verifyOTP error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


exports.userController = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(404)
        .json({ success: false, message: "invalid mobile number" });
    }
    const userData = await User.findOne({ phone: phone });
    console.log(userData)
    if (!userData) {
      return res.status(404)
        .json({ success: false, message: "User Not Found" })
    }
    return res.status(200)
      .json({ success: true, userData })
  } catch (err) {
    console.log(err.message)
  }
}

//  create user

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!req.body) {
      return res.status(400)
        .json({ success: false, message: "invalid request" });
    }
    if (!name || !email || !phone) {
      return res.status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const existingUser = await User.findOne({ phone: phone });
    if (existingUser) {
      return res.status(404)
        .json({ success: false, message: "User already exists" });
    }
    const user = await User.create({ name, email, phone });
    if (!user) {
      return res.status(404)
        .json({ success: false, message: "User Not Created" });

    }
    return res.status(201)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    return res.status(500)
      .json({
        success: false,
        message: error.message
      })
  }
}
exports.updateUser = async (req, res, next) => {
  try {
    const updateFields = {};
    const { name, email, phone } = req.body;
    const { id } = req.query;
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (phone !== undefined) updateFields.phone = phone;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400)
        .json({ success: false, message: "invalid user" })
    }

    const user = await User.updateOne(
      { _id: id },
      updateFields,
      { new: true }
    );
    if (!user) { return res.status(404).json({ success: false, message: "faild to update" }) }

    return res.status(200)
      .json({ success: true, message: "update success" });
  } catch (err) {
    return res.status(500)
      .json({ success: false, message: err.message });
  }
}
// user login ny phone and otp
