const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const otpGenerator = require('otp-generator');
const jwt = require("jsonwebtoken");

const otpStore={}
exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    let user = await User.findOne({ phone });

    // If user doesn't exist, create one
    if (!user) {
      user = await User.create({ phone });
    }

    // Generate a 4-digit OTP
    const generatedOtp = otpGenerator.generate(4, { digits: true, upperCaseAlphabets: false, specialChars: false, alphabets: false });

    // Save OTP temporarily (ideally use Redis with TTL)
    otpStore[phone] = {
      otp: generatedOtp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 mins expiry
    };

    // Simulate OTP sending (SMS integration goes here)
    console.log(`OTP for ${phone} is ${generatedOtp}`);

    return res.status(200).json({ success: true, message: "OTP sent successfully",otp:generatedOtp });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    console.log('boy',req.body)
    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: "Phone and OTP are required" });
    }
    const record = otpStore[phone];

    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired or not found" });
    }

    if (record.otp !== otp) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found after OTP validation" });
    }

    // You can also generate a JWT token here for authenticated sessions
    const token = jwt.sign({ userId: user._id,role:"user" }, process.env.SecretKey, {expiresIn:"7d"});
    delete otpStore[phone]; // Clean up

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (err) {
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
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(404)
            .json({ success: false, message: "Invalid Credentials" });
    }
    const user = await User.updateOne({ name, email, phone });
    if (user) {
        return res.status(404)
            .json({ success: false, message: "User Not Created" });

    }
    return res.status(201)
        .json({ success: true, message: "User Created Successfully" });
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
