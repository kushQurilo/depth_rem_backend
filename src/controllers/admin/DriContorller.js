
const adminModel = require('../../models/adminModel');
const DRIModel = require('../../models/DriWorkModel');
exports.createDRI = async (req, res, next) => {
    try{
        const { title, content } = req.body;
    const { admin_id } = req;

    if (!admin_id || !title || !content) {
        return res.status(400).json({ success, message: "Invalid Credentials." });
    }
    const payload = { adminId: admin_id, title, content }
    
    const isAdmin = await adminModel.findOne({_id:admin_id});
    if (!isAdmin) {
        return res.status(400).json({ success:false, message: "Invalid Admin Try Again." });
    }
    const DRI = await DRIModel.create(payload);
    if (!DRI) {
        return res.status(400).json({ success:false, message: "Failed to Create DRI Works" });
    }
    return res.status(200).json({ success:true, message: "DRI Works Created Successfully" });
    }catch(error){
        return res.status(500)
        .json({success:false,message:error.message})
    }
}
// update dri

exports.updateDri = async (req, res, next) => {
    try{
        const { admin_id } = req;
    const { title, content, driId } = req.body;

    if (!admin_id || !title || !content || !driId) {
        return res.status(400).json({ success:false, message: "Invalid Credentials." });
        }
    const isAdmin = await adminModel.findById(admin_id);
    if (isAdmin) {
        const updateDRI = await DRIModel.findByIdAndUpdate(driId, { title, content }, { new: true });
        if (!updateDRI) {
            return res.status(400).json({ success:false, message: "Failed to Update DRI Works" });
        }
        return res.status(200).json({ success:true, message: "DRI Works Updated Successfully" });
    }
    return res.status(400).json({ success:false, message: "Invalid Admin Try Again." });
    }
    catch(error){
        return res.status(500)
        .json({success:false,message:error.message})
        }

}
exports.DeleteDri = async (req, res, next) => {
    try{
        const { admin_id } = req;
    const { driId } = req.query;

    if (!admin_id || !driId) {
        return res.status(400).json({ success:false, message: "Invalid Credentials." });
        }
    const isAdmin = await adminModel.findById(admin_id);
    if (isAdmin) {
        const updateDRI = await DRIModel.findByIdAndDelete(driId);
        if (!updateDRI) {
            return res.status(400).json({ success:false, message: "Failed to Delete DRI Works" });
        }
        return res.status(200).json({ success:true, message: "DRI Works Delete Successfully" });
    }
    return res.status(400).json({ success:false, message: "Invalid Admin Try Again." });
    }
    catch(error){
        return res.status(500)
        .json({success:false,message:error.message})
        }

}
