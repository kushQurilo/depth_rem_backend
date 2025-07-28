const adminModel = require("../../models/adminModel");
const jwt = require('jsonwebtoken');
const { hashPassword, compareHashPassword } = require("../../utilitis/hashPash");

exports.createAdmin = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;
        if (!name || !email || !phone || !password || !role) {
            return res.status(400)
                .json({ success: false, message: "Invalid Credentials" });
        }

        const isAdmin = await adminModel.findOne({ phone: phone });

        if (isAdmin) {
            return res.status(400)
                .json({ success: false, message: "Admin already exists" });
        }

        const haspass = await hashPassword(password);
        const addAdmin = await adminModel.create({ name, email, phone, password: haspass, role });
        if (!addAdmin) {
            return res.status(400)
                .json({ success: false, message: "Failed to create Admin" });
        }
        return res.status(200)
            .json({ success: true, message: "Admin created successfully" });
    } catch (err) {
        return res.status(500)
            .json({
                success: false, message: err.message
            });
    }
}

exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400)
                .json({ success: false, message: "Invalid Credentials" });
        }
        const isExist = await adminModel.findOne({ email });
        if (isExist) {
            const isMatch = await compareHashPassword(password, isExist.password);
            if (isMatch) {
                const payload = {
                    name: isExist.name,
                    email: isExist.email,
                    adminId: isExist._id,
                    role: isExist.role
                }
                const secretKey = process.env.SecretKey
                const adminToken = await jwt.sign(payload, secretKey, { expiresIn: "15d" });
                return res.status(200)
                    .json({ success: true, message: "logged in successfully", token: adminToken });
            } else {
                return res.status(404)
                    .json({ success: false, message: "Invalid password" })
            }
        }
        return res.status(404)
            .json({ success: false, message: "Admin not found" });
    } catch (err) {
        return res.status(500)
            .json({
                success: false, message: err.message
            })
    }
}

exports.addBarcodeWithUpi = async (req, res, next) => {
    try {
        const { admin_id ,imagePath } = req;
        const { upi, role } = req.body;
        if (!imagePath || !upi || !admin_id || !role) {
            return res.status(400)
                .json({ success: false, message: "Invalid Request" });
        }
        const isAdmin = await adminModel.findOne({ _id: admin_id });
        if (!isAdmin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }
        const addBarcodeWithUpi = await adminModel.updateOne({ _id: admin_id }, { barcode:imagePath, upi });
        if (addBarcodeWithUpi.modifiedCount === 0) {
            return res.status(404)
                .json({
                    success: false,
                    message: "upload failed..."
                })
        }
        return res.status(201)
            .json({ success: true, message: "barcode and upi added." });
    } catch (err) {
        return res.status(500)
            .json({
                success: false,
                message: err.message
            })
    }
}

exports.updateAdminDetails = async (req, res) => {
  try {
    const {admin_id,role }= req; 
    const { name, email, phone  } = req.body;

    if (!name && !email && !phone && !role && !admin_id && !role) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits",
      });
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (role) updates.role = role;

    if (email) {
      const existing = await adminModel.findOne({ email, _id: { $ne: admin_id } });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Email is already in use",
        });
      }
    }

    if (phone) {
      const existing = await adminModel.findOne({ phone, _id: { $ne: admin_id } });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Phone number is already in use",
        });
      }
    }
    const updated = await adminModel.findByIdAndUpdate(admin_id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin details updated successfully",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};



exports.getAdminDetails = async (req, res) => {
  try {
    const {admin_id , role} = req;
    if (!admin_id || !role) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: missing admin ID or role",
      });
    }

    const admin = await adminModel.findById(admin_id).select('-password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin details fetched successfully",
      data: admin,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


exports.getBarcodeAndUpi = async ( req , res, next) =>{
    try{
        const {admin_id , role} = req;
    if (!admin_id || !role) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: missing admin ID or role",
      });
    }
    const admin = await adminModel.findById(admin_id).select('-password -name -email -phone  -_id -role -__v');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: admin,
    });
    }
    catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
}