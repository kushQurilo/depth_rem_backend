const adminModel = require("../models/adminModel");
const KYCmodel = require("../models/KYCModel");
const User = require("../models/userModel");
exports.CompleteKYC = async (req, res, next) => {
    try {
        const { aadhar, pan, name, user_id } = req.body;
        if (!aadhar || !pan || !name || !user_id) {
            return res.status(400).json({ message: "Please fill all the fields", success: false })
        }
        const payload = { aadhar, pan, name, user_id }
        const isUser = await User.findById(user_id);
        if (!isUser) {
            return res.status(400).json({ message: "Invalid User", success });
        }
        const isKyc = await KYCmodel.findOne({ user_id });
        if (isKyc) {

            if (isKyc.status === 'pending') {
                return res.status(404)
                    .json({
                        success: false,
                        message: "Your KYC has already been done but admin has not approved it yet."
                    })
            }
            if (isKyc.status === 'approve') {
                return res.status(200)
                    .json({
                        success: true,
                        message: "Your KYC has already been done and approved."
                    })
            }
        }
        const uploadKyc = await KYCmodel.create(payload);
        if (!uploadKyc) {
            return res.status(400).json({ message: "Failed to upload KYC", success: false });
        }
        return res.status(200)
            .json({
                success: true,
                message: "Your Documents have beed submitted, Admin will approve your Documents in 24 hrs. "
            });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}


//approved kyc by admin

exports.ApproveByAdmin = async (req, res) => {
    try {
        const { admin_id } = req;
        const { user_id} = req.query;
        if (!admin_id) {
            return res.status(400).json({
                success: false,
                message: "Invalid Admin Credentials"
            });
        }

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "User ID is missing"
            });
        }

        const isAdmin = await adminModel.findById(admin_id);
        if (!isAdmin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        const isUser = await User.findById(user_id);
        if (!isUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isKYC = await KYCmodel.findOne({ user_id });
        if (!isKYC) {
            return res.status(404).json({
                success: false,
                message: "KYC not found"
            });
        }
        isKYC.status = "approve";
        await isKYC.save();

        return res.status(200).json({
            success: true,
            message: "KYC approved successfully"
        });

    } catch (error) {
        console.error("Error in ApproveByAdmin:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


exports.getAllKycDetails=async (req, res) => {
   try{
    const {admin_id} = req;
    if(!admin_id){
        return res.status(404).json({
            success: false,
            message: "Invalid admin details"})
    }
   }catch(error){
    return res.status(500)
    .json({
        success:false,
        message:error.message
    })
   }
}