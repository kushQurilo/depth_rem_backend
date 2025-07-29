const adminModel = require("../../models/adminModel");
const advocateModel = require("../../models/advocateModel");

exports.addAdvocate = async (req, res, next) => {
    try {
        const { admin_id } = req;
        if (!admin_id) return res.status(401).json({ message: "Unauthorized" });
        const { availableTime, closingTime } = req.body;
        if (!availableTime || !closingTime) return res.status(400).json({ success: false, message: "Please fill all fields" });
        const payload = { availableTime, closingTime, adminId: admin_id }
        console.log(payload)
        const isAdmin = await adminModel.findOne({ _id: admin_id });
        if (isAdmin) {
            const advocate = await advocateModel.findOne({ adminId: admin_id });
            if (advocate) {
                return res.status(400)
                    .json({
                        success: false,
                        message: "Advocate Timing already exists"
                    })
            }
            const createAdvocate = await advocateModel.create(payload);
            if (!createAdvocate) return res.status(400).json({ success: false, message: "failed to add Timing" })
            return res.status(200).json({ success: true, message: "Timing added successfully" })
        }
        return res.status(400)
            .json({
                success: false,
                message: "Invalid Admin"
            })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// update timing
exports.updateTiming = async (req, res, next) => {
    try {
        const { admin_id } = req;
        const {timeid} = req.query
        const { availableTime, closingTime } = req.body;
        if (!admin_id) return res.status(401).json({ message: "Unauthorized" })
        if (!availableTime || !closingTime) return res.status(400).json({
            success:
                false, message: "Please fill all fields"
        })
        const payload = { availableTime, closingTime }
        const isTiming = await advocateModel.findById(timeid);
        if(!isTiming){
            return res.status(400).json({ success: false, message: "Timing not found" })
        }
        const updateTiming = await advocateModel.updateOne({_id:timeid},payload);
        if(updateTiming.acknowledged ===false){
            return res.status(400)
            .json({
                success: false,
                message: "Failed to update Timing"
                });
        }
        return res.status(200).json({ success: true, message: "Timing updated successfully" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
exports.deleteTiming = async (req, res, next) => {
    try {
        const { admin_id } = req;
        const {timeid} = req.query
        const { availableTime, closingTime } = req.body;
        if (!admin_id) return res.status(401).json({ message: "Unauthorized" })
        if (!availableTime || !closingTime) return res.status(400).json({
            success:
                false, message: "Please fill all fields"
        })
        const payload = { availableTime, closingTime }
        const isTiming = await advocateModel.findById(timeid);
        if(!isTiming){
            return res.status(400).json({ success: false, message: "Timing not found" })
        }
        const updateTiming = await advocateModel.deleteOne({_id:timeid});
        if(!updateTiming){
            return res.status(400)
            .json({
                success: false,
                message: "Failed to delelte Timing"
                });
        }
        return res.status(200).json({ success: true, message: "Timing delete successfully" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}